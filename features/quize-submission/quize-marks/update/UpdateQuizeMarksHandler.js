import QuizeMarks from "../../../../models/QuizeMarks.js";
import Jwt from "../../../../utils/Jwt.js";
import UpdateQuizeMarksSchema from "./UpdateQuizeMarksRequestValidator.js";

export default async function UpdateQuizeMarksAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizeMarkId = req.params.id;

    const updatedQuizeMarkRequest = req.body;

    const quizeMark = await UpdateQuizeMarksSchema.validateAsync(updatedQuizeMarkRequest);

    const existingQuizeMark = await QuizeMarks.findByPk(quizeMarkId);

    if (!existingQuizeMark) {
      return res.status(404).json({
        message: "Quize Mark not found",
      });
    }

    const updatedQuizeMark = await QuizeMarks.update(quizeMark, {
      where: {
        id: quizeMarkId,
      },
    });

    if (updatedQuizeMark) {
      return res.status(200).json({
        data: updatedQuizeMarkRequest,
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
