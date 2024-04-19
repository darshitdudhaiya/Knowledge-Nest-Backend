import QuestionOptions from "../../../../models/QuestionOptions.js";
import QuizeQuestions from "../../../../models/QuizeQuestions.js";
import Jwt from "../../../../utils/Jwt.js";

export default async function GetByIdQuestionOptionAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const questionOptionId = req.params.id;
    const questionOption = await QuestionOptions.findByPk(questionOptionId, {
      include: [
        {
          model: QuizeQuestions,
        },
      ],
    });

    if (!questionOption) {
      return res.status(404).json({
        message: "Question Option not found",
      });
    }

    return res.status(200).json({
      data: questionOption,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
