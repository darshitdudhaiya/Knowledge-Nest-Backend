import Quizzes from "../../../../models/Quizzes.js";
import Jwt from "../../../../utils/Jwt.js";

export default async function DeleteQuizzeAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizzeId = req.params.id;

    const quizze = await Quizzes.findByPk(quizzeId);
    if (!quizze) {
      return res.status(404).json({
        message: "Assigned Subject not found",
      });
    }

    const deletedQuizze = await quizze.destroy();
    if (deletedQuizze) {
      return res.status(201).json({
        data: "Quizze deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
