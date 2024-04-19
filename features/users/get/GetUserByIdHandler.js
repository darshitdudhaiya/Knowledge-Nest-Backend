import UserRoles from "../../../models/UserRoles.js";
import Users from "../../../models/Users.js";
import StudentData from "../../../models/StudentData.js";
import AssignedSubjects from "../../../models/AssignedSubjects.js";
import UserProfile from "../../../models/UserProfile.js";
import Streams from "../../../models/Streams.js";
import Years from "../../../models/Years.js";
import Semesters from "../../../models/Semesters.js";
import Classes from "../../../models/Classes.js";
import Subjects from "../../../models/Subjects.js";
import Jwt from "../../../utils/Jwt.js";

export default async function getUserById(req, res) {
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

    let profile = await UserProfile.findOne({ where: { UserId: userId } });

    const userRole = await UserRoles.findByPk(user.UserRoleId);

    const response = {
      id: user.id,
      UserRole: userRole.Name,
      Name: profile.Name,
      Email: user.Email,
      Gender: profile.Gender,
      Contact: profile.Contact,
      Address: profile.Address,
      ImageName: profile.ImageName,
      Password: user.Password,
      IsActivate: user.IsActivate,
    };

    if (userRole.Name == "Student") {
      const studentData = await StudentData.findOne({
        where: { StudentId: userId },
      });

      response["EnrollmentNumber"] = studentData.EnrollmentNumber;

      let data = await Classes.findByPk(studentData.ClassId, {
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

      response["Class"] = {
        Id: data.dataValues.id,
        Division: data.dataValues.Division,
      };

      response["Year"] = {
        Id: data.dataValues.Year.dataValues.id,
        Name: data.dataValues.Year.dataValues.name,
      };

      response["Stream"] = data.dataValues.Year.Stream.dataValues;

      data = await Semesters.findByPk(studentData.SemesterId);
      response["Semester"] = {
        Id: data.dataValues.id,
        Semester: data.dataValues.Semester,
      };
    } else if (userRole.Name == "Faculty") {
      const assignedSubjects = await AssignedSubjects.findAll({
        where: { FacultyId: userId },
      });

      const subjectPromises = assignedSubjects.map(async (subject) => {
        const subjectData = await Subjects.findByPk(
          subject.dataValues.SubjectId
        );
        return subjectData.dataValues.Name;
      });

      response["AssignedSubjects"] = await Promise.all(subjectPromises);
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}
