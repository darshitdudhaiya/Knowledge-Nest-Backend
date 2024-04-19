import Videos from "../../../models/Videos.js";
import Jwt from "../../../utils/Jwt.js";
import UpdateVideoRequestSchema from "./UpdateVideoRequestValidator.js";

export default async function UpdateVideoAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const videoId = req.params.id;

    const video = await UpdateVideoRequestSchema.validateAsync(req.body);

    const existingVideo = await Videos.findByPk(videoId);

    if (!existingVideo) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    const updatedVideo = await Videos.update(video, {
      where: {
        id: videoId,
      },
    });

    if (updatedVideo) {
      return res.status(200).json({
        message: "Video updated successfully",
        data: video,
      });
    }
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({
        message: "Validation Error",
        data: err.details[0].message,
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
      data: err,
    });
  }
}
