import loginValidator from "./LoginValidator.js";
import Users from "../../../models/Users.js";
import Jwt from "../../../utils/Jwt.js";
import UserRoles from "../../../models/UserRoles.js";

export default async function login(req, res) {
  try {
    const loginRequest = await loginValidator.validateAsync(req.body);

    const user = await Users.findOne({
      where: {
        Email: loginRequest.Email,
        Password: loginRequest.Password,
      },
    });

    if (user) {
      const userRole = await UserRoles.findByPk(user.UserRoleId);
      let token = Jwt.generateToken({
        id: user.dataValues.id,
        Role: userRole.Name,
      });
      return res.status(200).json({ token: token });
    }

    return res.status(401).json({
      message: "wrong email or password",
    });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
    }

    return res.status(400).json({
      message: error.message,
    });
  }
}
