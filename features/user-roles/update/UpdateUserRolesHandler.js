import UserRoles from "../../../models/UserRoles.js";
import Jwt from "../../../utils/Jwt.js";
import UserRolesSchema from "./UpdateUserRolesRequestValidator.js";

export default async function UpdateUserRoleAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const userRoleId = req.params.id;

    const updatedUserRoleRequest = await UserRolesSchema.validateAsync(
      req.body
    );

    const userRole = await UserRoles.findByPk(userRoleId);
    console.log("userRole is", userRole);
    if (!userRole) {
      return res.status(404).json({
        message: "User role not found",
      });
    }

    const updatedUserRole = await UserRoles.update(updatedUserRoleRequest, {
      where: {
        id: userId,
      },
    });

    if (updatedUserRole) {
      return res.status(200).json({
        data: updatedUserRoleRequest,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
