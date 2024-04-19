import Semesters from "../../../models/Semesters.js";
import Jwt from "../../../utils/Jwt.js";

export default async function GetByIdSemesterAsync(req, res) {
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

    return res.status(200).json({
      data: semester,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
