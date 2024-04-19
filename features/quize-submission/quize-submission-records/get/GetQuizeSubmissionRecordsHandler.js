import QuizeSubmissionRecords from "../../../../models/QuizeSubmissionRecords.js";
import QuizeSubmissions from "../../../../models/QuizeSubmissions.js";
import QuizeQuestions from "../../../../models/QuizeQuestions.js";
import QuestionOptions from "../../../../models/QuestionOptions.js";
import Jwt from "../../../../utils/Jwt.js";

export default async function GetQuizeSubmissionRecordsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizeSubmissionRecord = await QuizeSubmissionRecords.findAll({
      include: [
        {
          model: QuizeSubmissions,
        },
        {
          model: QuizeQuestions,
        },
        {
          model: QuestionOptions,
        },

      ],
    });

    return res.status(200).json({
      data: quizeSubmissionRecord,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
