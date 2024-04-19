import QuizeSubmissions from "../../../../models/QuizeSubmissions.js";
import Jwt from "../../../../utils/Jwt.js";
import QuizeSubmissionsSchema from "./AddQuizeSubmissionsRequestValidator.js";

export default async function AddQuizeSubmissionsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const quizeSubmission = await QuizeSubmissionsSchema.validateAsync(req.body);

    const createdQuizeSubmissions = await QuizeSubmissions.create(quizeSubmission);

    return res.status(201).json({
      message: "Quize Submissions created successfully",
      data: createdQuizeSubmissions,
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
