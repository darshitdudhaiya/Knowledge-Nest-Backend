import AssignmentSubmissions from "../../../models/AssignmentSubmissions.js";
import AssignmentMarks from "../../../models/AssignmentMarks.js";
import Jwt from "../../../utils/Jwt.js";
export default async function GetByIdAssignmentMarksHandler(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const assignmentMarkId = req.params.id;

    const assignmentMark = await AssignmentMarks.findByPk(assignmentMarkId, {
      include: [
        {
          model: AssignmentSubmissions,
        },
      ],
    });

    if (!assignmentMark) {
      return res.status(404).json({
        message: "Assignment Mark not found",
      });
    }

    return res.status(200).json({
      message: "Assignment Mark fetched successfully",
      data: assignmentMark,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: err.message,
    });
  }
}
