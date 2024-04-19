import QuizeMarks from "../../../../models/QuizeMarks.js";
import Jwt from "../../../../utils/Jwt.js";
import QuizeMarksSchema from "./AddQuizeMarksRequestValidator.js";

export default async function AddQuizeMarksAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizeMark = await QuizeMarksSchema.validateAsync(req.body);

    const createdQuizeMark = await QuizeMarks.create(quizeMark);

    return res.status(201).json({
      message: "Quize Marks created successfully",
      data: createdQuizeMark,
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
