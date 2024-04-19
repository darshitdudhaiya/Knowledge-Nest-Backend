import { Model } from "sequelize";
import Circulars from "../../../models/Circulars.js";
import Jwt from "../../../utils/Jwt.js";
import Users from "../../../models/Users.js";
import Subjects from "../../../models/Subjects.js";


export default async function GetCircularsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const circulars = await Circulars.findAll({include:[
      {
        model:Users,
      },
      {
        model:Subjects,
      }
    ]});

    return res.status(200).json({
      data: circulars,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
