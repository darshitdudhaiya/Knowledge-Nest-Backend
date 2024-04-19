import Semesters from "../../../models/Semesters.js";
import Jwt from "../../../utils/Jwt.js";
import AddSemestersSchema from "./AddSemestersRequestValidator.js";

export default async function AddSemestersAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const semester = await AddSemestersSchema.validateAsync(req.body);

    const createdSemester = await Semesters.create(semester);

    return res.status(201).json({
      message: "Semester created successfully",
      data: createdSemester,
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
