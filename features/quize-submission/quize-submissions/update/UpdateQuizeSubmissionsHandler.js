import QuizeSubmissions from "../../../../models/QuizeSubmissions.js";
import Jwt from "../../../../utils/Jwt.js";
import UpdateQuizeSubmissionsSchema from "./UpdateQuizeSubmissionsRequestValidator.js";

export default async function UpdateQuizeSubmissionsAsync(req, res) 
{
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizeSubmissionId = req.params.id;

    const updatedQuizeSubmissionsRequest = req.body;

    const quizeSubmissions = await UpdateQuizeSubmissionsSchema.validateAsync(updatedQuizeSubmissionsRequest);

    const existingQuizeSubmissions = await QuizeSubmissions.findByPk(quizeSubmissionId);

    if (!existingQuizeSubmissions) {
      return res.status(404).json({
        message: "Quize Submission not found",
      });
    }

    const updatedQuizeSubmissions = await QuizeSubmissions.update(quizeSubmissions, {
      where: {
        id: quizeSubmissionId,
      },
    });

    if (updatedQuizeSubmissions) {
      return res.status(200).json({
        data: updatedQuizeSubmissionsRequest,
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
