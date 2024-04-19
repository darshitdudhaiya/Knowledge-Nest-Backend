import Semesters from "../../../models/Semesters.js";
import Jwt from "../../../utils/Jwt.js";

export default async function DeleteSemestersAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const semesterId = req.params.id;

    const semester = await Semesters.findByPk(semesterId);
    if (!semester) {
      return res.status(404).json({
        message: "Semester not found",
      });
    }

    const deletedSemester = await semester.destroy();
    if (deletedSemester) {
      return res.status(201).json({
        data: "Semester deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
