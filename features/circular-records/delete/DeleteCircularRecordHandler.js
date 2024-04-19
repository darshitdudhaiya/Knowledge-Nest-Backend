import CircularRecords from "../../../models/CircularRecords.js";
import Jwt from "../../../utils/Jwt.js";

export default async function DeleteCircularRecordsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const CircularId = req.params.id;

    const circular = await CircularRecords.findByPk(CircularId);
    if (!circular) {
      return res.status(404).json({
        message: "Circular record not found",
      });
    }

    const deletedCircularRecord = await circular.destroy();
    if (deletedCircularRecord) {
      return res.status(201).json({
        data: "Circular record deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
