import QuestionOptions from "../../../../models/QuestionOptions.js";
import Jwt from "../../../../utils/Jwt.js";
import UpdateQuestionOptionsSchema from "./UpdateQuestionOptionsRequestValidator.js";

export default async function UpdateQuestionOptionsAsync(req, res) 
{
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const questionOptionId = req.params.id;

    const updatedQuestionOptionRequest = req.body;

    const questionOption = await UpdateQuestionOptionsSchema.validateAsync(updatedQuestionOptionRequest);

    const existingQuestionOption = await QuestionOptions.findByPk(questionOptionId);

    if (!existingQuestionOption) {
      return res.status(404).json({
        message: "Question Option not found",
      });
    }

    const updatedQuestionOption = await QuestionOptions.update(questionOption, {
      where: {
        id: questionOptionId,
      },
    });

    if (updatedQuestionOption) {
      return res.status(200).json({
        data: updatedQuestionOptionRequest,
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
