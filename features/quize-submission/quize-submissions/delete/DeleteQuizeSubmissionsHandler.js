import QuizeSubmissions from "../../../../models/QuizeSubmissions.js";
import Jwt from "../../../../utils/Jwt.js";

export default async function DeleteQuizeSubmissionsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizeSubmissionId = req.params.id;

    const quizeSubmission = await QuizeSubmissions.findByPk(quizeSubmissionId);
    if (!quizeSubmission) {
      return res.status(404).json({
        message: "Question Option not found",
      });
    }

    const deletedQuizeSubmission = await quizze.destroy();
    if (deletedQuizeSubmission) {
      return res.status(201).json({
        data: "Quize Submission deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
