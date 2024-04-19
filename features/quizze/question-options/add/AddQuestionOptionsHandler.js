import QuestionOptions from "../../../../models/QuestionOptions.js";
import Jwt from "../../../../utils/Jwt.js";
import QuestionOptionsSchema from "./AddQuestionOptionsRequestValidator.js";

export default async function AddQuestionOptionsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const questionOption = await QuestionOptionsSchema.validateAsync(req.body);

    const createdQuestionOption = await QuestionOptions.create(questionOption);

    return res.status(201).json({
      message: "Question Option created successfully",
      data: createdQuestionOption,
    });
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
