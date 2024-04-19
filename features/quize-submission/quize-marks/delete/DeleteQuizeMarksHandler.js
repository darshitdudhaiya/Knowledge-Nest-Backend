import QuizeMarks from "../../../../models/QuizeMarks.js";
import Jwt from "../../../../utils/Jwt.js";

export default async function DeletequizeMarkAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizeMarkId = req.params.id;

    const quizeMark = await QuizeMarks.findByPk(quizeMarkId);
    if (!quizeMark) {
      return res.status(404).json({
        message: "Quize Mark not found",
      });
    }

    const deletedQuizeMark = await quizeMark.destroy();
    if (deletedQuizeMark) {
      return res.status(201).json({
        data: "Quize Mark deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
