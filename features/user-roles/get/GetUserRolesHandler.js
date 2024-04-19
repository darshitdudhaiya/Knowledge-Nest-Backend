import UserRoles from "../../../models/UserRoles.js";
import Jwt from "../../../utils/Jwt.js";


export default async function GetUserRolesAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const userRoles = await UserRoles.findAll();

    return res.status(201).json({
      data: userRoles,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
