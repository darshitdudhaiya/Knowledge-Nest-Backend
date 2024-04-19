import Jwt from "../../../utils/Jwt.js";
import AssignmentMarks from "../../../models/AssignmentMarks.js";
import UpdateAssignmentMarksRequestSchema from "./UpdateAssignmentMarksRequestValidator.js";
export default async function UpdateAssignmentMarksAsync(req, res) {
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

    const updatedAssignmentMarkRequest =
      await UpdateAssignmentMarksRequestSchema.validateAsync(req.body);

    const updatedAssignmentMark = await assignmentMark.update(
      updatedAssignmentMarkRequest
    );

    if (updatedAssignmentMark) {
      return res.status(200).json({
        message: "Assignment Mark updated successfully",
      });
    }
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({
        message: "Bad Request",
        data: err.details[0].message,
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
      data: err.message,
    });
  }
}
