import Streams from "../../../models/Streams.js";
import Jwt from "../../../utils/Jwt.js";
export default async function GetByIdStreamAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const streamId = req.params.id;

    const stream = await Streams.findOne({
      where: {
        id: streamId,
      },
    });

    if (!stream) {
      return res.status(404).json({
        message: "Stream not found",
      });
    }

    return res.status(201).json({
      data: stream,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
