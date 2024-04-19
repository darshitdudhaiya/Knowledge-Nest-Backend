import AssignedSubjects from "../../../models/AssignedSubjects.js";
import Jwt from "../../../utils/Jwt.js";

export default async function GetAssignedSubjectsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const assignedSubject = await AssignedSubjects.findAll();

    return res.status(200).json({
      data: assignedSubject,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
