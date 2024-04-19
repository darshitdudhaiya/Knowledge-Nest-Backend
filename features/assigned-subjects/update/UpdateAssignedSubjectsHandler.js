import AssignedSubjects from "../../../models/AssignedSubjects.js";
import Jwt from "../../../utils/Jwt.js";
import UpdateAssignedSubjectsSchema from "./UpdateAssignedSubjectsRequestValidator.js";

export default async function UpdateAssignedSubjectsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const assignedSubjectId = req.params.id;

    const updatedAssignedSubjectRequest = req.body;

    const assignedSubject = await UpdateAssignedSubjectsSchema.validateAsync(updatedAssignedSubjectRequest);

    const existingAssignedSubject = await AssignedSubjects.findByPk(assignedSubjectId);

    if (!existingAssignedSubject) {
      return res.status(404).json({
        message: "Assigned Subject not found",
      });
    }

    const updatedAssignedSubject = await AssignedSubjects.update(assignedSubject, {
      where: {
        id: assignedSubjectId,
      },
    });

    if (updatedAssignedSubject) {
      return res.status(200).json({
        data: updatedAssignedSubjectRequest,
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
