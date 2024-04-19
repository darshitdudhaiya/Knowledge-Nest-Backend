import Classes from "../../../models/Classes.js";
import Jwt from "../../../utils/Jwt.js";
export default async function GetClassesAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const Class = await Classes.findAll();

    return res.status(200).json({
      data: Class,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
