import QuizeQuestions from "../../../../models/QuizeQuestions.js";
import Quizzes from "../../../../models/Quizzes.js";
import Jwt from "../../../../utils/Jwt.js";

export default async function GetQuizeQuestionsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizzeQuestion = await QuizeQuestions.findAll({
      include: [
        {
          model: Quizzes,
        },         
      ],
    });

    return res.status(200).json({
      data: quizzeQuestion,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
