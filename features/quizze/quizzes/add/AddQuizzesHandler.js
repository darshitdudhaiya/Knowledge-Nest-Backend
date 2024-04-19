import Quizzes from "../../../../models/Quizzes.js";
import Jwt from "../../../../utils/Jwt.js";
import QuizzesSchema from "./AddQuizzesRequestValidator.js";

export default async function AddQuizzesAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizze = await QuizzesSchema.validateAsync(req.body);

    const createdQuizze = await Quizzes.create(quizze);

    return res.status(201).json({
      message: "Quizze created successfully",
      data: createdQuizze,
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
