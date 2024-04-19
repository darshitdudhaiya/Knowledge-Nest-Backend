import Jwt from "../../../utils/Jwt.js";
import VideoAttachments from "../../../models/VideoAttachments.js";
import Videos from "../../../models/Videos.js";
import Users from "../../../models/Users.js";
import AttachmentTypes from "../../../models/AttachmentTypes.js";

export default async function GetByVideoIdVideoAttachmentsAsync(
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

    const videoId = req.params.id;

    const videoAttachments = await VideoAttachments.findAll({
      include: [
        {
          model: Videos,
        },
        {
          model: AttachmentTypes,
        },
      ],
      where: {
        VideoId: videoId,
      },
    });

    return res.status(200).json({
      data: videoAttachments,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: err,
    });
  }
}
