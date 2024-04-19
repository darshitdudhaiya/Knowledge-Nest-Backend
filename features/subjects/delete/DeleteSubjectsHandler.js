import Subjects from "../../../models/Subjects.js";
import Jwt from "../../../utils/Jwt.js";
export default async function DeleteSubjectsAsnc(req, res) 
{
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const subjectId = req.params.id;

    const subject = await Subjects.findByPk(subjectId);
    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    const deletedSubject = await subject.destroy();
    if (deletedSubject) {
      return res.status(201).json({
        data: "Subject deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
