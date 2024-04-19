import QuizeQuestions from "../../../../models/QuizeQuestions.js";
import Jwt from "../../../../utils/Jwt.js";

export default async function DeleteQuizzeAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizzeQuestionId = req.params.id;

    const quizzeQuestion = await QuizeQuestions.findByPk(quizzeQuestionId);
    if (!quizzeQuestion) {
      return res.status(404).json({
        message: "Quizze Question not found",
      });
    }

    const deletedQuizzeQuestion = await quizze.destroy();
    if (deletedQuizzeQuestion) {
      return res.status(201).json({
        data: "Quizze Question deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
