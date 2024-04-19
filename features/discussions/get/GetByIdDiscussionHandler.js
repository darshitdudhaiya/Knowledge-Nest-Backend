import Discussions from "../../../models/Discussions.js";
import Subjects from "../../../models/Subjects.js";
import Users from "../../../models/Users.js";
import Classes from "../../../models/Classes.js";
import Jwt from "../../../utils/Jwt.js";

export default async function GetByIdDiscussionAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const discussionId = req.params.id;

    const Discussion = await Discussions.findByPk(discussionId,{include:[
      {
        model:Users,
      },
      {
        model:Subjects,
      },
      {
        model:Classes
      }
    ]});

    if (!Discussion) {
      return res.status(404).json({
        message: "Discussion not found",
      });
    }

    return res.status(200).json({
      data: Discussion,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
