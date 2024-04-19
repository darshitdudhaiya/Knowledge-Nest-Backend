import Assignments from "../../../models/Assignments.js";
import Jwt from "../../../utils/Jwt.js";

export default async function DeleteAssignmentsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const assignmentId = req.params.id;

    const assignment = await Assignments.findByPk(assignmentId);
    if (!assignment) {
      return res.status(404).json({
        message: "Assigned Subject not found",
      });
    }

    const deletedAssignment = await assignment.destroy();
    if (deletedAssignment) {
      return res.status(201).json({
        data: "Assignment deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
