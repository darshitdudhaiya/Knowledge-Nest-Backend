import UserRoles from "../../../models/UserRoles.js";
import Jwt from "../../../utils/Jwt.js";


export default async function GetByIdUserRolesAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const userRoleId = req.params.id;

    const userRole = await UserRoles.findByPk(userRoleId);

    if (!userRole) {
      return res.status(404).json({
        message: "User role not found",
      });
    }

    return res.status(201).json({
      data: userRole,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
