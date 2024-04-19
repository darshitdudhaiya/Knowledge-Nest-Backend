import Assignments from "../../../models/Assignments.js";
import Jwt from "../../../utils/Jwt.js";
import UpdateAssignmentsSchema from "./UpdateAssignmentsRequestValidator.js";

export default async function UpdateAssignmentsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const assignmentId = req.params.id;

    const updatedAssignmentRequest = req.body;

    const assignment = await UpdateAssignmentsSchema.validateAsync(updatedAssignmentRequest);

    const existingAssignment = await Assignments.findByPk(assignmentId);

    if (!existingAssignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    const updatedAssignment = await Assignments.update(assignment, {
      where: {
        id: assignmentId,
      },
    });

    if (updatedAssignment) {
      return res.status(200).json({
        data: updatedAssignmentRequest,
      });
    }
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        message: "Validation Error",
        data: error.details[0].message,
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
}
