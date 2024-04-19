import QuizeSubmissionRecords from "../../../../models/QuizeSubmissionRecords.js";
import Jwt from "../../../../utils/Jwt.js";
import QuizeSubmissionRecordsSchema from "./AddQuizeSubmissionRecordsRequestValidator.js";

export default async function AddQuizeSubmissionRecordsAsync(req, res) 
{
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizeSubmissionRecord = await QuizeSubmissionRecordsSchema.validateAsync(req.body);

    const createdQuizeSubmissionRecord = await QuizeSubmissionRecords.create(quizeSubmissionRecord);

    return res.status(201).json({
      message: "Quize Submission Records created successfully",
      data: createdQuizeSubmissionRecord,
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
