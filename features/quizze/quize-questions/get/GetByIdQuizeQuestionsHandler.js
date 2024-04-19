import QuizeQuestions from "../../../../models/QuizeQuestions.js";
import Quizzes from "../../../../models/Quizzes.js";
 import Jwt from "../../../../utils/Jwt.js";

export default async function GetByIdQuizeQuestionAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizzeQuestionId = req.params.id;
    const quizzeQuestion = await QuizeQuestions.findByPk(quizzeQuestionId, {
      include: [
        {
          model: Quizzes,
        },
      ],
    });
    
    if (!quizzeQuestion) {
      return res.status(404).json({
        message: "Quizze Question not found",
      });
    }

    return res.status(200).json({
      data: quizzeQuestion,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
