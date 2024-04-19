import Videos from "../../../models/Videos.js";
import { deleteFile } from "../../../utils/File-handle.js";
import Jwt from "../../../utils/Jwt.js";

export default async function DeleteVideoAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const videoId = req.params.id;

    const existingVideo = await Videos.findByPk(videoId);

    if (!existingVideo) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    deleteFile("uploads/videos", existingVideo.FileName);
    deleteFile("uploads/video-thumbnails", existingVideo.ThumbnailName);

    const deletedVideo = existingVideo.destroy();

    if (deletedVideo) {
      return res.status(200).json({
        message: "Video deleted successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: err,
    });
  }
}
