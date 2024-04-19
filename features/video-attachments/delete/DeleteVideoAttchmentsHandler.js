import Jwt from "../../../utils/Jwt.js";
import VideoAttachments from "../../../models/VideoAttachments.js";
import { deleteFile } from "../../../utils/File-handle.js";

export default async function DeleteVideoAttachmentAsync(
  req,
  res
) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const videoAttachmentId = req.params.id;

    const videoAttachment = await VideoAttachments.findByPk(
      videoAttachmentId
    );

    if (!videoAttachment) {
      return res.status(404).json({
        message: "Video Attchment Not Found",
      });
    }

    deleteFile("uploads/video-attachments", videoAttachment.FileName);

    await videoAttachment.destroy();

    return res.status(200).json({
      message: "Video Attachment Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: err,
    });
  }
}
