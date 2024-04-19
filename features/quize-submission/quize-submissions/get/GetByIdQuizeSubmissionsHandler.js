import QuizeSubmissions from "../../../../models/QuizeSubmissions.js";
import Users from "../../../../models/Users.js";
import Quizzes from "../../../../models/Quizzes.js";
import Jwt from "../../../../utils/Jwt.js";

export default async function GetByIdQuizeSubmissionsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizeSubmissionsId = req.params.id;
    const quizeSubmission = await QuizeSubmissions.findByPk(quizeSubmissionsId, {
      include: [
        {
          model: Users,
        },
        {
          model: Quizzes,
        },
      ],
    });

    if (!quizeSubmission) {
      return res.status(404).json({
        message: "Quize Submission not found",
      });
    }

    return res.status(200).json({
      data: quizeSubmission,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
