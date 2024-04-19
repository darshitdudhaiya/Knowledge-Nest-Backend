import Years from "../../../models/Years.js";
import Jwt from "../../../utils/Jwt.js";
import AddYearsSchema from "./AddYearsRequestValidator.js";

export default async function AddYearsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const year = await AddYearsSchema.validateAsync(req.body);

    const createdYear = await Years.create(year);

    return res.status(201).json({
      message: "Year created successfully",
      data: createdYear,
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
