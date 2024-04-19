import Quizzes from "../../../../models/Quizzes.js";
import Classes from "../../../../models/Classes.js";
import Subjects from "../../../../models/Subjects.js";
import Users from "../../../../models/Users.js";
import Jwt from "../../../../utils/Jwt.js";

export default async function GetByIdQuizzeAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizzeId = req.params.id;
    const quizze = await Quizzes.findByPk(quizzeId, {
      include: [
        {
          model: Subjects,
        },
        {
          model: Classes,
        },
        {
          model: Users,
        }
      ],
    });
    
    if (!quizze) {
      return res.status(404).json({
        message: "Quizze not found",
      });
    }

    return res.status(200).json({
      data: quizze,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
