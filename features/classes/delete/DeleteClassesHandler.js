import Classes from "../../../models/Classes.js";
import Jwt from "../../../utils/Jwt.js";
export default async function DeleteClassesAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const classId = req.params.id;

    const Class = await Classes.findByPk(classId);
    if (!Class) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    const deletedClass = await Class.destroy();
    if (deletedClass) {
      return res.status(201).json({
        data: "Class deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
