import Jwt from "../../../utils/Jwt.js";
import Users from "../../../models/Users.js";
import UserProfile from "../../../models/UserProfile.js";
import multer from "multer";
import path from "path";
import { deleteFile } from "../../../utils/File-handle.js";

const storageForProfilePicture = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile-pictures");
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + "-" + Date.now() + "-" + file.originalname);
  },
});

const uploadForProfilePicture = multer({
  storage: storageForProfilePicture,
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
}).single("profilePicture");

export default async function updateProfilePicture(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const userId = req.params.id;

    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userProfile = await UserProfile.findOne({
      where: { UserId: userId },
    });
    const imageName = userProfile.dataValues.ImageName;

    if (imageName) deleteFile("uploads/profile-pictures", imageName);

    uploadForProfilePicture(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          message: "2 Validation Error",
          data: err,
        });
      } else {
        const updatedUserProfile = UserProfile.update(
          {
            ImageName: req.file.filename,
          },
          {
            where: {
              UserId: userId,
            },
          }
        );

        if (updatedUserProfile) {
          return res.status(200).json({
            message: "Profile Picture uploaded!",
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
