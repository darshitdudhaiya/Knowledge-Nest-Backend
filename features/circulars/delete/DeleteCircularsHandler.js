import Circulars from "../../../models/Circulars.js";
import Jwt from "../../../utils/Jwt.js";

export default async function DeleteCircularsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const CircularId = req.params.id;

    const circular = await Circulars.findByPk(CircularId);
    if (!circular) {
      return res.status(404).json({
        message: "Circular not found",
      });
    }

    const deletedCircular = await circular.destroy();
    if (deletedCircular) {
      return res.status(201).json({
        data: "Circular deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
