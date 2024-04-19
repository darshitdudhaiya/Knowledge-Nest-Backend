import Semesters from "../../../models/Semesters.js";
import Jwt from "../../../utils/Jwt.js";
import UpdateSemestersSchema from "./UpdateSemestersRequestValidator.js";

export default async function UpdateSemestersAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const semesterId = req.params.id;

    const updatedSemesterRequest = req.body;

    const semester = await UpdateSemestersSchema.validateAsync(updatedSemesterRequest);

    const existingSemester = await Semesters.findByPk(semesterId);

    if (!existingSemester) {
      return res.status(404).json({
        message: "Semester not found",
      });
    }

    const updatedSemester = await Semesters.update(semester, {
      where: {
        id: semesterId,
      },
    });

    if (updatedSemester) {
      return res.status(200).json({
        data: updatedSemesterRequest,
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
