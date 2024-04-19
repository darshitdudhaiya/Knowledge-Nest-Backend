import AssignedSubjects from "../../../models/AssignedSubjects.js";
import Subjects from "../../../models/Subjects.js";
import Jwt from "../../../utils/Jwt.js";

export default async function GetByFacultyIdAssignedSubjectsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const facultyId = req.params.id;

    console.log(facultyId);
    const assignedSubject = await AssignedSubjects.findAll({
      where: {
        FacultyId: facultyId,
      },
      include: [
        {
          model: Subjects,
        },
      ],
    });
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
