import Jwt from "../../../utils/Jwt.js";
import Users from "../../../models/Users.js";
import Semesters from "../../../models/Semesters.js";
import Classes from "../../../models/Classes.js";
import Password from "../../../utils/Password.js";
import UserRoles from "../../../models/UserRoles.js";
import StudentData from "../../../models/StudentData.js";
import Subjects from "../../../models/Subjects.js";
import UserProfile from "../../../models/UserProfile.js";
import AssignedSubjects from "../../../models/AssignedSubjects.js";
import {
  studentDataValidator,
  facultyDataValidator,
  adminDataValidator,
} from "./UpdateUserValidators.js";

export default async function updateUser(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const userId = req.params.id;

    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userRole = await UserRoles.findByPk(user.UserRoleId);

    let dataForUpdate = {};

    if (userRole.Name == "Student" || userRole.Name == "student")
      dataForUpdate = await studentDataValidator.validateAsync(req.body);
    else if (userRole.Name == "Faculty" || userRole.Name == "faculty")
      dataForUpdate = await facultyDataValidator.validateAsync(req.body);
    else dataForUpdate = await adminDataValidator.validateAsync(req.body);

    if ("AssignedSubjects" in dataForUpdate) {
      const subjectPromises = dataForUpdate.AssignedSubjects.map(
        async (subject) => {
          const foundSubject = await Subjects.findOne({
            where: { Name: subject },
          });
          if (!foundSubject) {
            return { message: `${subject} not found` };
          }
        }
      );

      const results = await Promise.all(subjectPromises);
      const notFoundSubjects = results.filter((result) => result);
      if (notFoundSubjects.length > 0) {
        return res.status(404).json({
          message: "Enter Valid Subjects",
          details: notFoundSubjects.map((result) => result.message),
        });
      }
    }

    if ("EnrollmentNumber" in dataForUpdate) {
      const enrollmentNumber = await StudentData.findOne({
        where: { EnrollmentNumber: dataForUpdate.EnrollmentNumber },
      });
      if (enrollmentNumber && enrollmentNumber.dataValues.StudentId != userId) {
        return res.status(404).json({
          message: "EnrollmentNumber already exists",
        });
      }
    }

    if (userRole.Name == "Student" || userRole.Name == "student") {
      const userClass = await Classes.findByPk(dataForUpdate.ClassId);
      if (!userClass) {
        return res.status(404).json({
          message: "Class not found",
        });
      }

      const userSemester = await Semesters.findByPk(dataForUpdate.SemesterId);
      if (!userSemester) {
        return res.status(404).json({
          message: "Semester not found",
        });
      }

      if (userClass.YearId != userSemester.YearId) {
        return res.status(404).json({
          message: "Semester and Class Does not belong to same Year",
        });
      }
    }

    if ("Email" in dataForUpdate) {
      const email = await Users.findOne({
        where: { Email: dataForUpdate.Email },
      });
      if (email && email.dataValues.id != userId) {
        return res.status(404).json({
          message: "Email already taken",
        });
      }
    }

    await Users.update(dataForUpdate, { where: { id: userId } });

    await UserProfile.update(dataForUpdate, { where: { UserId: userId } });

    if (userRole.Name == "Student" || userRole.Name == "student") {
      await StudentData.update(dataForUpdate, { where: { StudentId: userId } });
    } else if (userRole.Name == "Faculty" || userRole.Name == "faculty") {
      if ("AssignedSubjects" in dataForUpdate) {
        let assignedSubjectsFromDb = await AssignedSubjects.findAll({
          where: { FacultyId: userId },
        });

        const subjectPromises = assignedSubjectsFromDb.map(async (subject) => {
          const subjectData = await Subjects.findByPk(
            subject.dataValues.SubjectId
          );
          return subjectData.dataValues.Name;
        });

        assignedSubjectsFromDb = await Promise.all(subjectPromises);

        const subjectsForRemove = assignedSubjectsFromDb.filter(
          (item) => !dataForUpdate.AssignedSubjects.includes(item)
        );
        const subjectsForInsert = dataForUpdate.AssignedSubjects.filter(
          (item) => !assignedSubjectsFromDb.includes(item)
        );

        await Promise.all(
          subjectsForRemove.map(async (subject) => {
            const subjectFromDb = await Subjects.findOne({
              where: { Name: subject },
            });

            await AssignedSubjects.destroy({
              where: {
                FacultyId: userId,
                SubjectId: subjectFromDb.dataValues.id,
              },
            });
          })
        );

        await Promise.all(
          subjectsForInsert.map(async (subject) => {
            const subjectFromDb = await Subjects.findOne({
              where: { Name: subject },
            });

            await AssignedSubjects.create({
              FacultyId: userId,
              SubjectId: subjectFromDb.dataValues.id,
            });
          })
        );
      }
    }

    return res.status(200).json({
      message: "User updated successfully",
      data: dataForUpdate,
    });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
    }

    return res.status(400).json({
      message: error.message,
    });
  }
}
