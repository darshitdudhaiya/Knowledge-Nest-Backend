import Circulars from "../../../models/Circulars.js";
import Subjects from "../../../models/Subjects.js";
import Users from "../../../models/Users.js";
import Jwt from "../../../utils/Jwt.js";

export default async function GetByIdattachmentTypeAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const circularId = req.params.id;

    const circular = await Circulars.findByPk(circularId,{include:[
      {
        model:Users,
      },
      {
        model:Subjects,
      }
    ]});

    if (!circular) {
      return res.status(404).json({
        message: "circular not found",
      });
    }

    return res.status(200).json({
      data: circular,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
