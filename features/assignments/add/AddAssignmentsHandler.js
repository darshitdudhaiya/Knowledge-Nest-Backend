import Assignments from "../../../models/Assignments.js";
import Jwt from "../../../utils/Jwt.js";
import AssignmentsSchema from "./AddAssignmentsRequestValidator.js";

export default async function AddAssignmentsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const assignment = await AssignmentsSchema.validateAsync(req.body);

    const createdAssignment = await Assignments.create(assignment);

    return res.status(201).json({
      message: "Assignment created successfully",
      data: createdAssignment,
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
