import Subjects from "../../../models/Subjects.js";
import Jwt from "../../../utils/Jwt.js";
import AddSubjectsSchema from "./AddSubjectsRequestValidator.js";

export default async function AddSubjectAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const subject = await AddSubjectsSchema.validateAsync(req.body);

    const createdSubject = await Subjects.create(subject);

    return res.status(201).json({
      message: "Subject created successfully",
      data: createdSubject,
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
