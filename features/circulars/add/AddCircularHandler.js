import Circulars from "../../../models/Circulars.js";
import Jwt from "../../../utils/Jwt.js";
import AddCircularsSchema from "./AddCircularsSchema.js";

export default async function AddCircularsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const circular = await AddCircularsSchema.validateAsync(req.body);

    const createdcircular = await Circulars.create(circular);

    return res.status(201).json({
      message: "Circular created successfully",
      data: createdcircular,
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
