import Streams from "../../../models/Streams.js";
import Jwt from "../../../utils/Jwt.js";
import StreamSchema from "./AddStreamsRequestValidator.js";
export default async function AddStreamAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const stream = await StreamSchema.validateAsync(req.body);

    const createdStream = await Streams.create(stream);

    return res.status(201).json({
      message: "Stream created successfully",
      data: createdStream,
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
