import CircularRecords from "../../../models/CircularRecords.js";
import Jwt from "../../../utils/Jwt.js";
import UpdateCircularRecordsSchema from "./UpdateCircularRecordValidator.js";

export default async function UpdateCircularRecordsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const circularRecordsId = req.params.id;

    const updatedCircularRecordsRequest = req.body;

    const circularRecords = await UpdateCircularRecordsSchema.validateAsync(updatedCircularRecordsRequest);

    const existingCircularRecords = await CircularRecords.findByPk(circularRecordsId);

    if (!existingCircularRecords) {
      return res.status(404).json({
        message: "CircularRecords not found",
      });
    }

    const updatedCircularRecords = await CircularRecords.update(circularRecords, {
      where: {
        id: circularRecordsId,
      },
    });

    if (updatedCircularRecords) {
      return res.status(200).json({
        data: updatedCircularRecordsRequest,
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
