import AssignedSubjects from "../../../models/AssignedSubjects.js";
import Jwt from "../../../utils/Jwt.js";

export default async function GetByIdSemesterAsync(req, res) {
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

    return res.status(200).json({
      data: assignedSubject,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
