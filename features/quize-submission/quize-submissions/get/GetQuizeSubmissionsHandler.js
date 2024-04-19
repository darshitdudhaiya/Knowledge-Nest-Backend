import QuizeSubmissions from "../../../../models/QuizeSubmissions.js";
import Users from "../../../../models/Users.js";
import Quizzes from "../../../../models/Quizzes.js";
import Jwt from "../../../../utils/Jwt.js";

export default async function GetQuizeSubmissionsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizeSubmission = await QuizeSubmissions.findAll({
      include: [
        {
          model: Users,
        },
        {
          model: Quizzes,
        },     
      ],
    });

    return res.status(200).json({
      data: quizeSubmission
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
