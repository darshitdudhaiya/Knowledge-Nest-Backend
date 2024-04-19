import Jwt from "../../../utils/Jwt.js";
import UserRoles from "../../../models/UserRoles.js";
import Users from "../../../models/Users.js";
import StudentData from "../../../models/StudentData.js";
import AssignedSubjects from "../../../models/AssignedSubjects.js";

export default async function deleteUser(req, res) {
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

    if (userRole.Name == "Student" || userRole.Name == "student") {
      const studentData = await StudentData.findOne({
        where: { StudentId: user.dataValues.id },
      });
      await studentData.destroy();
    } else if (userRole.Name == "Faculty" || userRole.Name == "faculty") {
      await AssignedSubjects.destroy({
        where: {
          FacultyId: user.id,
        },
      });
    }

    const profile = await user.getUserProfile();

    await profile.destroy();
    await user.destroy();

    return res.status(201).json({
      data: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
