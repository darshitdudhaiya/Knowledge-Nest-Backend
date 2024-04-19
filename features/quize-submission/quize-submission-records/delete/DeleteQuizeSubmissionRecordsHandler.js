import QuizeSubmissionRecords from "../../../../models/QuizeSubmissionRecords.js";
import Jwt from "../../../../utils/Jwt.js";

export default async function DeleteQuizeSubmissionRecordAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizeSubmissionRecordId = req.params.id;

    const quizeSubmissionRecord = await QuizeSubmissionRecords.findByPk(quizeSubmissionRecordId);
    if (!quizeSubmissionRecord) {
      return res.status(404).json({
        message: "Quize Submission Record not found",
      });
    }

    const deletedQuizeSubmissionRecord = await quizeSubmissionRecord.destroy();
    if (deletedQuizeSubmissionRecord) {
      return res.status(201).json({
        data: "Quize Submission Record deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
