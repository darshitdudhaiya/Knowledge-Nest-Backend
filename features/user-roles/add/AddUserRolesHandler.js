import UserRoles from "../../../models/UserRoles.js";
import Jwt from "../../../utils/Jwt.js";
import UserRolesSchema from "./AddUserRolesRequestValidator.js";

export default async function AddUserRoleAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const userRole = await UserRolesSchema.validateAsync(req.body);

    const createdUserRole = await UserRoles.create(userRole);

    return res.status(201).json({
      message: "User role created successfully",
      data: createdUserRole,
    });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        message: "Validation Error",
        data: error.details[0].message,
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
}
