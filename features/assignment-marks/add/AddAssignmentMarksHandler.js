import AddAssignmentMarksRequestSchema from "./AddAssignmentMarksRequestValidator.js";
import Jwt from "../../../utils/Jwt.js";
import AssignmentMarks from "../../../models/AssignmentMarks.js";

export default async function AddAssignmentMarksAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const addAssignmentMarks =
      await AddAssignmentMarksRequestSchema.validateAsync(req.body);

    const createdAssignmentMarks = await AssignmentMarks.create(
      addAssignmentMarks
    );

    if (createdAssignmentMarks) {
      return res.status(201).json({
        message: "Assignment Marks created successfully",
        data: createdAssignmentMarks,
      });
    }
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({
        message: "Bad Request",
        data: err.details[0].message,
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
      data: err.message,
    });
  }
}
