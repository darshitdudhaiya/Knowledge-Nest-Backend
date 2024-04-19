import QuizeQuestions from "../../../../models/QuizeQuestions.js";
import Jwt from "../../../../utils/Jwt.js";
import QuizeQuestionsSchema from "./AddQuizeQuestionsRequestValidator.js";

export default async function AddQuizeQuestionsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizeQuestion = await QuizeQuestionsSchema.validateAsync(req.body);

    const createdQuizeQuestion = await QuizeQuestions.create(quizeQuestion);

    return res.status(201).json({
      message: "Quize Question created successfully",
      data: createdQuizeQuestion,
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
