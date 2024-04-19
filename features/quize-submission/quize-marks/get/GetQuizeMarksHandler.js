import QuizeMarks from "../../../../models/QuizeMarks.js";
import QuizeSubmissions from "../../../../models/QuizeSubmissions.js";
import Jwt from "../../../../utils/Jwt.js";

export default async function GetQuizeMarksAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizeMark = await QuizeMarks.findAll({
      include: [
        {
          model: QuizeSubmissions,
        },
      ],
    });

    return res.status(200).json({
      data: quizeMark,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
