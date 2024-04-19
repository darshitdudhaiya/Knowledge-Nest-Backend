import AssignedSubjects from "../../../models/AssignedSubjects.js";
import Jwt from "../../../utils/Jwt.js";

export default async function DeleteAssignedSubjectsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const assignedSubjectId = req.params.id;

    const assignedSubject = await AssignedSubjects.findByPk(assignedSubjectId);
    if (!assignedSubject) {
      return res.status(404).json({
        message: "Assigned Subject not found",
      });
    }

    const deletedAssignedSubject = await assignedSubject.destroy();
    if (deletedAssignedSubject) {
      return res.status(201).json({
        data: "Assigned Subject deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
