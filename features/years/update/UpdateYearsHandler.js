import Years from "../../../models/Years.js";
import Jwt from "../../../utils/Jwt.js";
import UpdateYearsSchema from "./UpdateYearsRequestValidator.js";
export default async function UpdateYearsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const yearId = req.params.id;

    const updatedYearRequest = req.body;

    const year = await UpdateYearsSchema.validateAsync(updatedYearRequest);

    const existingYear = await Years.findByPk(yearId);

    if (!existingYear) {
      return res.status(404).json({
        message: "Year not found",
      });
    }

    const updatedYear = await Years.update(year, {
      where: {
        id: yearId,
      },
    });

    if (updatedYear) {
      return res.status(200).json({
        data: updatedYearRequest,
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
