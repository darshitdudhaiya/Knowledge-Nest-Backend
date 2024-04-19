import AddVideoRequestSchema from "./AddVideoRequestValidator.js";
import Videos from "../../../models/Videos.js";
import Jwt from "../../../utils/Jwt.js";

export default async function AddVideoAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const video = await AddVideoRequestSchema.validateAsync(req.body);

    const createdVideo = await Videos.create({
      Title: video.Title,
      Description: video.Description,
      FileName: "",
      ThumbnailName: "",
      IsApproved: video.IsApproved,
      UserId: video.UserId,
      SubjectId: video.SubjectId,
    });

    return res.status(201).json({
      message: "Success, Video created!",
      data: createdVideo,
    });
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({
        message: "Validation Error",
        data: err.details,
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
      data: err,
    });
  }
}
