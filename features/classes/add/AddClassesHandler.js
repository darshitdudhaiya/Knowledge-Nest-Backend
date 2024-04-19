import Classes from "../../../models/Classes.js";
import Jwt from "../../../utils/Jwt.js";
import AddClassesSchema from "./AddClassesRequestValidator.js";

export default async function AddClassesAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const Class = await AddClassesSchema.validateAsync(req.body);

    const createdClass = await Classes.create(Class);

    return res.status(201).json({
      message: "Class created successfully",
      data: createdClass,
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
