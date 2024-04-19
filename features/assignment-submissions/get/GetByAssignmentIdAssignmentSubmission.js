import Jwt from "../../../utils/Jwt.js";
import AssignmentSubmissions from "../../../models/AssignmentSubmissions.js";
import Assignments from "../../../models/Assignments.js";
import Users from "../../../models/Users.js";

export default async function GetByAssignmentIdAssignmentSubmissionAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const assignmentId = req.params.id;



    const assignmentSubmissions = await AssignmentSubmissions.findAll({
      include: [
        {
          model: Assignments,
        },
        {
          model: Users,
        },
      ],
      where: {
        AssignmentId: assignmentId,
      },
    });

    return res.status(200).json({
      data: assignmentSubmissions,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: err,
    });
  }
}
