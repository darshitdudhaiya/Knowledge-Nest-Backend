import AttachmentTypes from "../../../models/AttachmentTypes.js";
import Jwt from "../../../utils/Jwt.js";
export default async function GetAttachmentTypesAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const attachmentType = await AttachmentTypes.findAll();

    return res.status(200).json({
      data: attachmentType,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
