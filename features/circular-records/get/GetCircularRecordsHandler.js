import { Model } from "sequelize";
import CircularRecords from "../../../models/CircularRecords.js";
import Jwt from "../../../utils/Jwt.js";
import Users from "../../../models/Users.js";
import Circulars from "../../../models/Circulars.js";


export default async function GetCircularRecordsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const circularRecords = await CircularRecords.findAll({include:[
      {
        model:Users,
      },
      {
        model:Circulars,
      }
    ]});

    return res.status(200).json({
      data: circularRecords,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
