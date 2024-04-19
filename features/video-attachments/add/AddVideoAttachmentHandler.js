import Jwt from "../../../utils/Jwt.js";
import VideoAttachments from "../../../models/VideoAttachments.js";
import Videos from "../../../models/Videos.js";
import multer from "multer";
import path from "path";
import AttachmentTypes from "../../../models/AttachmentTypes.js";

const storageForAttachment = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/video-attachments");
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + "-" + Date.now() + "-" + file.originalname);
  },
});

const uploadForAttchment = multer({
  storage: storageForAttachment,
  fileFilter: async function (req, file, cb) {
    const exts = await AttachmentTypes.findAll({ attributes: ["Extension"] });

    const fileTypesName = exts.map((ext) => ext.Extension);

    const filetypes = new RegExp(fileTypesName.join("|"));

    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    var generatedFilename =
      Math.random() + "-" + Date.now() + "-" + file.originalname;

    if (mimetype && extname) {
      return cb(null, generatedFilename);
    }

    cb("File upload only supports the following filetypes - " + filetypes);
  },
  limits: { fileSize: 50 * 1024 * 1024 },
}).single("attachment");

export default async function AddVideoAttachmentAsync(req, res) {
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

    uploadForAttchment(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message: "Validation Error",
          data: err,
        });
      } else {
        const file = req.file;

        const fileExtension = path.extname(file.filename).toLowerCase();
        const fileExtensionWithoutDot = fileExtension.substring(1);

        const AttachmentTypeId = await AttachmentTypes.findOne({
          where: {
            Extension: fileExtensionWithoutDot,
          },
        });

        const createdAttchment = await VideoAttachments.create({
          FileName: file.filename,
          VideoId: videoId,
          AttachmentTypeId: AttachmentTypeId.id,
        });

        if (createdAttchment) {
          return res.status(200).json({
            message: "Video Attachment Uploaded successfully",
          });
        }
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: err,
    });
  }
}
