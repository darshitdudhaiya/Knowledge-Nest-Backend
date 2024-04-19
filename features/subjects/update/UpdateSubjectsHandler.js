import Subjects from "../../../models/Subjects.js";
import Jwt from "../../../utils/Jwt.js";
import UpdateSubjectsSchema from "./UpdateSubjectsRequestValidator.js";
export default async function UpdateSubjectsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const subjectId = req.params.id;

    const updatedSubjectRequest = req.body;

    const subject = await UpdateSubjectsSchema.validateAsync(updatedSubjectRequest);

    const existingSubject = await Subjects.findByPk(subjectId);

    if (!existingSubject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    const updatedSubject = await Subjects.update(subject, {
      where: {
        id: subjectId,
      },
    });

    if (updatedSubject) {
      return res.status(200).json({
        data: updatedSubjectRequest,
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
