import UserRoles from "../../../models/UserRoles.js";
import Users from "../../../models/Users.js";
import StudentData from "../../../models/StudentData.js";
import Streams from "../../../models/Streams.js";
import Years from "../../../models/Years.js";
import AssignedSubjects from "../../../models/AssignedSubjects.js";
import Semesters from "../../../models/Semesters.js";
import Subjects from "../../../models/Subjects.js";
import Classes from "../../../models/Classes.js";
import Jwt from "../../../utils/Jwt.js";

export default async function getUsers(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const allUsers = await Users.findAll();
    if (!allUsers) {
      return res.status(404).json({
        message: "Users not found",
      });
    }

    const userPromises = allUsers.map(async (user) => {
      const profile = await user.getUserProfile();

      const userRole = await UserRoles.findByPk(user.UserRoleId);

      const userData = {
        id: user.dataValues.id,
        UserRole: userRole.Name,
        Name: profile.dataValues.Name,
        Email: user.dataValues.Email,
        Gender: profile.dataValues.Gender,
        Contact: profile.dataValues.Contact,
        Address: profile.dataValues.Address,
        ImageName: profile.dataValues.ImageName,
        Password: user.dataValues.Password,
        IsActivate: user.dataValues.IsActivate,
      };

      if (userRole.Name == "Student" || userRole.Name == "student") {
        const studentData = await StudentData.findOne({
          where: { StudentId: user.dataValues.id },
        });

        userData["EnrollmentNumber"] = studentData.EnrollmentNumber;

        let data = await Classes.findByPk(studentData.dataValues.ClassId, {
          include: [
            {
              model: Years,
              attributes: ["id", "name"],
              include: [
                {
                  model: Streams,
                  attributes: ["id", "name"],
                },
              ],
            },
          ],
        });

        userData["Class"] = {
          Id: data.dataValues.id,
          Division: data.dataValues.Division,
        };

        userData["Year"] = {
          Id: data.dataValues.Year.dataValues.id,
          Name: data.dataValues.Year.dataValues.name,
        };

        userData["Stream"] = data.dataValues.Year.Stream.dataValues;

        data = await Semesters.findByPk(studentData.SemesterId);
        userData["Semester"] = {
          Id: data.dataValues.id,
          Semester: data.dataValues.Semester,
        };
      } else if (userRole.Name == "Faculty" || userRole.Name == "faculty") {
        const assignedSubjects = await AssignedSubjects.findAll({
          where: { FacultyId: user.dataValues.id },
        });

        const subjectPromises = assignedSubjects.map(async (subject) => {
          const subjectData = await Subjects.findByPk(
            subject.dataValues.SubjectId
          );
          return subjectData.dataValues.Name;
        });

        userData["AssignedSubjects"] = await Promise.all(subjectPromises);
      }

      return userData;
    });

    const users = await Promise.all(userPromises);

    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}
