import Jwt from "../../../utils/Jwt.js";
import AssignmentAttachments from "../../../models/AssignmentAttachments.js";
import Assignment from "../../../models/Assignments.js";
import multer from "multer";
import path from "path";
import AttachmentTypes from "../../../models/AttachmentTypes.js";

const storageForAttachment = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/assignment-attachments");
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
}).array("attachment", 10);

export default async function AddAssignmentAttachmentAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const assignmentId = req.params.id;

    const existingAssignment = await Assignment.findByPk(assignmentId);

    if (!existingAssignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    uploadForAttchment(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message: "Validation Error",
          data: err,
        });
      } else {
        const files = req.files;

        const updatedAttchments = files.map(async (file) => {
          const fileExtension = path.extname(file.filename).toLowerCase();
          const fileExtensionWithoutDot = fileExtension.substring(1);

          const AttachmentTypeId = await AttachmentTypes.findOne({
            where: {
              Extension: fileExtensionWithoutDot,
            },
          });

          const updatedAttchment = await AssignmentAttachments.create({
            FileName: file.filename,
            AssignmentId: assignmentId,
            AttachmentTypeId: AttachmentTypeId.id,
          });
          return updatedAttchment;
        });

        if (updatedAttchments) {
          return res.status(200).json({
            message: "Assignment Attachment Uploaded successfully",
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
