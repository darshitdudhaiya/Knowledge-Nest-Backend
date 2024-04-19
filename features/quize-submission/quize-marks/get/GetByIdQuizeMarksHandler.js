import QuizeMarks from "../../../../models/QuizeMarks.js";
import QuizeSubmissions from "../../../../models/QuizeSubmissions.js";
import Jwt from "../../../../utils/Jwt.js";

export default async function GetByIdQuizeMarksAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizeMarkId = req.params.id;
    const quizeMark = await QuizeMarks.findByPk(quizeMarkId, {
      include: [
        {
          model: QuizeSubmissions,
        },
      ],
    });
    
    if (!quizeMark) {
      return res.status(404).json({
        message: "Quize Mark not found",
      });
    }

    return res.status(200).json({
      data: quizeMark,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
