import Quizzes from "../../../../models/Quizzes.js";
import Jwt from "../../../../utils/Jwt.js";
import UpdateQuizzesSchema from "./UpdateQuizzesRequestValidator.js";

export default async function UpdateQuizzesAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizzeId = req.params.id;

    const updatedQuizzeRequest = req.body;

    const quizze = await UpdateQuizzesSchema.validateAsync(updatedQuizzeRequest);

    const existingQuizze = await Quizzes.findByPk(quizzeId);

    if (!existingQuizze) {
      return res.status(404).json({
        message: "Quizze not found",
      });
    }

    const updatedQuizze = await Quizzes.update(quizze, {
      where: {
        id: quizzeId,
      },
    });

    if (updatedQuizze) {
      return res.status(200).json({
        data: updatedQuizzeRequest,
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
