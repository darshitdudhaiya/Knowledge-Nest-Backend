import { Model } from "sequelize";
import Discussions from "../../../models/Discussions.js";
import Jwt from "../../../utils/Jwt.js";
import Users from "../../../models/Users.js";
import Subjects from "../../../models/Subjects.js";
import Classes from "../../../models/Classes.js";

export default async function GetDiscussionsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const discussions = await Discussions.findAll({include:[
      {
        model:Users,
      },
      {
        model:Subjects,
      },
      {
        model:Classes,
      }
    ]});

    return res.status(200).json({
      data: discussions,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
