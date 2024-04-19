import QuestionOptions from "../../../../models/QuestionOptions.js";
import QuizeQuestions from "../../../../models/QuizeQuestions.js";
import Jwt from "../../../../utils/Jwt.js";

export default async function GetQuestionOptionsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const questionOption = await QuestionOptions.findAll({
      include: [
        {
          model: QuizeQuestions,
        },         
      ],
    });

    return res.status(200).json({
      data: questionOption,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
