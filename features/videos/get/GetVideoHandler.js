import Subjects from "../../../models/Subjects.js";
import UserProfile from "../../../models/UserProfile.js";
import Users from "../../../models/Users.js";
import Videos from "../../../models/Videos.js";
import Jwt from "../../../utils/Jwt.js";

export default async function GetVideoAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const video = await Videos.findAll({
      include: [
        {
          model: Users,
          include: [{ model: UserProfile }],
        },
        {
          model: Subjects,
        },
      ],
    });

    return res.status(200).json({
      message: "Success, Video fetched!",
      data: video,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: err,
    });
  }
}
