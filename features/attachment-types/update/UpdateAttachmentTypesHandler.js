import AttachmentTypes from "../../../models/AttachmentTypes.js";
import Jwt from "../../../utils/Jwt.js";
import UpdateAttachmentTypesSchema from "./UpdateAttachmentTypesRequestValidator.js";
export default async function UpdateAttachmentTypesAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const attachmentTypeId = req.params.id;

    const updatedAttachmentTypeRequest = req.body;

    const attachmentType = await UpdateAttachmentTypesSchema.validateAsync(updatedAttachmentTypeRequest);

    const existingAttachmentType = await AttachmentTypes.findByPk(attachmentTypeId);

    if (!existingAttachmentType) {
      return res.status(404).json({
        message: "Attachment Type not found",
      });
    }

    const updatedAttachmentType = await AttachmentTypes.update(attachmentType, {
      where: {
        id: attachmentTypeId,
      },
    });

    if (updatedAttachmentType) {
      return res.status(200).json({
        data: updatedAttachmentTypeRequest,
      });
    }
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        message: "Validation Error",
        data: error.details[0].message,
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
}
