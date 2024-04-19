import Years from "../../../models/Years.js";
import Jwt from "../../../utils/Jwt.js";
export default async function GetYearsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const year = await Years.findAll();

    return res.status(200).json({
      data: year,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
