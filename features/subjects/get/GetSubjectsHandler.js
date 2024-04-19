import Subjects from "../../../models/Subjects.js";
import Jwt from "../../../utils/Jwt.js";
export default async function GetSubjectsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const subject = await Subjects.findAll();

    return res.status(200).json({
      data: subject,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
