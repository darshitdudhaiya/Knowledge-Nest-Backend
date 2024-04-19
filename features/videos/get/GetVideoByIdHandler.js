import Subjects from "../../../models/Subjects.js";
import UserProfile from "../../../models/UserProfile.js";
import Users from "../../../models/Users.js";
import Videos from "../../../models/Videos.js";
import Jwt from "../../../utils/Jwt.js";

export default async function GetVideoByIdAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const videoId = req.params.id;

    const video = await Videos.findByPk(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    return res.status(200).json({
      data: video,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: err,
    });
  }
}
