import Jwt from "../../../utils/Jwt.js";
import AssignmentMarks from "../../../models/AssignmentMarks.js";
export default async function DeleteAssignmentMarksAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const assignmentMarkId = req.params.id;

    const assignmentMark = await AssignmentMarks.findByPk(assignmentMarkId);

    if (!assignmentMark) {
      return res.status(404).json({
        message: "Assignment Mark not found",
      });
    }

    const deletedAssignmentMark = await assignmentMark.destroy();

    if (deletedAssignmentMark) {
      return res.status(200).json({
        message: "Assignment Mark deleted successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: err.message,
    });
  }
}
