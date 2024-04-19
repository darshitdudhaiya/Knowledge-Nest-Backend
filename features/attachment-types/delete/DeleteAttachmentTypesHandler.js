import AttachmentTypes from "../../../models/AttachmentTypes.js";
import Jwt from "../../../utils/Jwt.js";
export default async function DeleteAttachmentTypesAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const attachmentTypeId = req.params.id;

    const attachmentType = await AttachmentTypes.findByPk(attachmentTypeId);
    if (!attachmentType) {
      return res.status(404).json({
        message: "AttachmentType not found",
      });
    }

    const deletedAttachmentType = await attachmentType.destroy();
    if (deletedAttachmentType) {
      return res.status(201).json({
        data: "Attachment Type deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
