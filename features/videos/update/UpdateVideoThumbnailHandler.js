import Jwt from "../../../utils/Jwt.js";
import multer from "multer";
import path from "path";
import Videos from "../../../models/Videos.js";
import { deleteFile } from "../../../utils/File-handle.js";

const storageForVideoThumbnail = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/video-thumbnails");
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + "-" + Date.now() + "-" + file.originalname);
  },
});

const uploadForVideoThumbnail = multer({
  storage: storageForVideoThumbnail,
  fileFilter: function (req, file, cb) {
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    var generatedFilename =
      Math.random() + "-" + Date.now() + "-" + file.originalname;

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb("File upload only supports the following filetypes - " + filetypes);
  },
}).single("thumbnail");
export default async function UpdateThumbnailAsync(req, res) {
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

    deleteFile("uploads/video-thumbnails", video.ThumbnailName);

    uploadForVideoThumbnail(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          message: "2 Validation Error",
          data: err,
        });
      } else {
        const updatedVideo = Videos.update(
          {
            Title: video.Title,
            Description: video.Description,
            FileName: video.FileName,
            ThumbnailName: req.file.filename,
            IsApproved: video.IsApproved,
            UserId: video.UserId,
            SubjectId: video.SubjectId,
          },
          {
            where: {
              id: videoId,
            },
          }
        );

        if (updatedVideo) {
          return res.status(200).json({
            message: "Success, Video Thumbnail uploaded!",
          });
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
