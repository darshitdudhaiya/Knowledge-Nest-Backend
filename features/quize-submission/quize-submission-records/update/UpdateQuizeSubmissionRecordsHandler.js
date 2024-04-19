import QuizeSubmissionRecords from "../../../../models/QuizeSubmissionRecords.js"; 
import Jwt from "../../../../utils/Jwt.js";
import UpdateQuizeSubmissionRecordsSchema from "./UpdateQuizeSubmissionRecordsRequestValidator.js";

export default async function UpdateQuizeSubmissionRecordsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizeSubmissionRecordId = req.params.id;

    const updatedQuizeSubmissionRecordRequest = req.body;

    const quizeSubmissionRecord = await UpdateQuizeSubmissionRecordsSchema.validateAsync(updatedQuizeSubmissionRecordRequest);

    const existingQuizeSubmissionRecord = await QuizeSubmissionRecords.findByPk(quizeSubmissionRecordId);

    if (!existingQuizeSubmissionRecord) {
      return res.status(404).json({
        message: "Quize Submission Record not found",
      });
    }

    const updatedQuizeSubmissionRecord = await QuizeSubmissionRecords.update(quizeSubmissionRecord, {
      where: {
        id: quizeSubmissionRecordId,
      },
    });

    if (updatedQuizeSubmissionRecord) {
      return res.status(200).json({
        data: updatedQuizeSubmissionRecordRequest,
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
