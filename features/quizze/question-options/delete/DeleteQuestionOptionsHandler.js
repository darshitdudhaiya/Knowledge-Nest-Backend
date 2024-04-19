import QuestionOptions from "../../../../models/QuestionOptions.js";
import Jwt from "../../../../utils/Jwt.js";

export default async function DeleteQuizzeAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const questionOptionId = req.params.id;

    const questionOption = await QuestionOptions.findByPk(questionOptionId);
    if (!questionOption) {
      return res.status(404).json({
        message: "Question Option not found",
      });
    }

    const deletedQuestionOption = await quizze.destroy();
    if (deletedQuestionOption) {
      return res.status(201).json({
        data: "Question Option deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
