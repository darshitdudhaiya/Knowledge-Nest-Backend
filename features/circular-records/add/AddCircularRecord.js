import CircularRecords from "../../../models/CircularRecords.js";
import Jwt from "../../../utils/Jwt.js";
import AddCircularRecordsSchema from "./AddCircularRecordSchema.js";

export default async function AddCircularRecordsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const circularRecords = await AddCircularRecordsSchema.validateAsync(req.body);

    const createdcircular = await CircularRecords.create(circularRecords);

    return res.status(201).json({
      message: "Circular record created successfully",
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
