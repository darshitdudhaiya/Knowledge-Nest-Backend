import Circular from "../../../models/Circulars.js";
import Jwt from "../../../utils/Jwt.js";
import UpdateCircularSchema from "./UpdateCircularValidator.js";

export default async function UpdateCircularAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const circularId = req.params.id;

    const updatedCircularRequest = req.body;

    const circular = await UpdateCircularSchema.validateAsync(updatedCircularRequest);

    const existingCircular = await Circular.findByPk(circularId);

    if (!existingCircular) {
      return res.status(404).json({
        message: "Circular not found",
      });
    }

    const updatedCircular = await Circular.update(circular, {
      where: {
        id: circularId,
      },
    });

    if (updatedCircular) {
      return res.status(200).json({
        data: updatedCircularRequest,
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
