import Quizzes from "../../../../models/Quizzes.js";
import Jwt from "../../../../utils/Jwt.js";
import UpdateQuizeQuestionsSchema from "./UpdateQuizeQuestionsRequestValidator.js";

export default async function UpdateQuizeQuestionsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizzeQuestionId = req.params.id;

    const updatedQuizeQuestionRequest = req.body;

    const quizzeQuestion = await UpdateQuizeQuestionsSchema.validateAsync(updatedQuizeQuestionRequest);

    const existingQuizzeQuestion = await Quizzes.findByPk(quizzeQuestionId);

    if (!existingQuizzeQuestion) {
      return res.status(404).json({
        message: "Quizze Question not found",
      });
    }

    const updatedQuizzeQuestion = await Quizzes.update(quizzeQuestion, {
      where: {
        id: quizzeQuestionId,
      },
    });

    if (updatedQuizzeQuestion) {
      return res.status(200).json({
        data: updatedQuizeQuestionRequest,
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
