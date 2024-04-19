import Streams from "../../../models/Streams.js";
import Jwt from "../../../utils/Jwt.js";
export default async function GetStreamsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const streams = await Streams.findAll();
    return res.status(201).json({
      data: streams,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
