import Years from "../../../models/Years.js";
import Jwt from "../../../utils/Jwt.js";
export default async function DeleteYearsAsnc(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const yearId = req.params.id;

    const year = await Years.findByPk(yearId);
    if (!year) {
      return res.status(404).json({
        message: "Year not found",
      });
    }

    const deletedYear = await year.destroy();
    if (deletedYear) {
      return res.status(201).json({
        data: "Year deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
