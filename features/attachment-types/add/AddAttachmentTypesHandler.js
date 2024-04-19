import AttachmentTypes from "../../../models/AttachmentTypes.js";
import Jwt from "../../../utils/Jwt.js";
import AddAttachmentTypesSchema from "./AddAttachmentTypesRequestValidator.js";

export default async function AddAttachmentTypesAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const attachmentType = await AddAttachmentTypesSchema.validateAsync(req.body);

    const createdAttachmentType = await AttachmentTypes.create(attachmentType);

    return res.status(201).json({
      message: "Attachment Type created successfully",
      data: createdAttachmentType,
    });
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
