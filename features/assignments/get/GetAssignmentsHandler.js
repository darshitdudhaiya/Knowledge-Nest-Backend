import Assignments from "../../../models/Assignments.js";
import Classes from "../../../models/Classes.js";
import Subjects from "../../../models/Subjects.js";
import Users from "../../../models/Users.js";
import Jwt from "../../../utils/Jwt.js";

export default async function GetAssignmentsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const assignment = await Assignments.findAll({
      include: [
        {
          model: Subjects,
        },
        {
          model: Classes,
        },
        {
          model: Users,
        }
      ],
    });

    return res.status(200).json({
      data: assignment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
