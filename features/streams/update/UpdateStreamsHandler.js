import Streams from "../../../models/Streams.js";
import Jwt from "../../../utils/Jwt.js";
import UpdateStreamsSchema from "./UpdateStreamsValidator.js";
export default async function UpdateStreamsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const streamId = req.params.id;

    const updatedStreamRequest = req.body;

    const streams = await UpdateStreamsSchema.validateAsync(
      updatedStreamRequest
    );
    const updatedStreams = await Streams.update(streams, {
      where: {
        id: streamId,
      },
    });

    if (updatedStreams) {
      return res.status(200).json({
        data: updatedStreamRequest,
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
