import Semesters from "../../../models/Semesters.js";
import Jwt from "../../../utils/Jwt.js";

export default async function GetSemestersAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const semester = await Semesters.findAll();

    return res.status(200).json({
      data: semester,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
