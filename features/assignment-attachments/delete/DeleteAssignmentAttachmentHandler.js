import AssignmentAttachments from "../../../models/AssignmentAttachments.js";
import { deleteFile } from "../../../utils/File-handle.js";
import Jwt from "../../../utils/Jwt.js";

export default async function DeleteAssignmentAttachmentAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const assignmentAttachmentId = req.params.id;

    const assignmentAttachment = await AssignmentAttachments.findByPk(
      assignmentAttachmentId
    );

    if (!assignmentAttachment) {
      return res.status(404).json({
        message: "Assignment Attachment Not Found",
      });
    }

    deleteFile("uploads/assignment-attachments", assignmentAttachment.FileName);

    await assignmentAttachment.destroy();

    return res.status(200).json({
      data: "Assignment Attachment Deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: err,
    });
  }
}
