import Years from "../../../models/Years.js";
import Jwt from "../../../utils/Jwt.js";
export default async function GetByIdYearAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const yearId = req.params.id;

    const year = await Years.findByPk(yearId);
    if (!year) {
      return res.status(404).json({
        message: "Year not found",
      });
    }

    return res.status(200).json({
      data: year,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
