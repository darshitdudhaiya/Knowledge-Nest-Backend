import DiscussionRecords from "../../../models/DiscussionRecords.js";
import Discussions from "../../../models/Discussions.js";
import Users from "../../../models/Users.js";
import Jwt from "../../../utils/Jwt.js";

export default async function GetByIdDiscussionRecords(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const DiscussionId = req.params.id;

    const discussion = await DiscussionRecords.findByPk(DiscussionId,{include:[
      {
        model:Users,
      },
      {
        model:Discussions,
      }
    ]});

    if (!discussion) {
      return res.status(404).json({
        message: "Discussion record not found",
      });
    }

    return res.status(200).json({
      data: discussion,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
