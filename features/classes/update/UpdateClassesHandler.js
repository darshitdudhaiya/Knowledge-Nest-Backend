import Classes from "../../../models/Classes.js";
import Jwt from "../../../utils/Jwt.js";
import UpdateClassesSchema from "./UpdateClassesRequestValidator.js";
export default async function UpdateClassesAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const classId = req.params.id;

    const updatedClassRequest = req.body;

    const Class = await UpdateClassesSchema.validateAsync(updatedClassRequest);

    const existingClass = await Classes.findByPk(classId);

    if (!existingClass) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    const updatedClass = await Classes.update(Class, {
      where: {
        id: classId,
      },
    });

    if (updatedClass) {
      return res.status(200).json({
        data: updatedClassRequest,
      });
    }
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
