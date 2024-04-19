import { Model } from "sequelize";
import DiscussionRecords from "../../../models/DiscussionRecords.js";
import Jwt from "../../../utils/Jwt.js";
import Users from "../../../models/Users.js";
import Discussions from "../../../models/Discussions.js";


export default async function GetDiscussionRecordsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const discussionRecords = await DiscussionRecords.findAll({include:[
      {
        model:Users,
      },
      {
        model:Discussions,
      }
    ]});

    return res.status(200).json({
      data: discussionRecords,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
