import AssignedSubjects from "../../../models/AssignedSubjects.js";
import Jwt from "../../../utils/Jwt.js";
import AddAssignedSubjectsSchema from "./AddAssignedSubjectsRequestValidator.js";

export default async function AddAssignedSubjectsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const assignedSubject = await AddAssignedSubjectsSchema.validateAsync(req.body);

    const createdAssignedSubject = await AssignedSubjects.create(assignedSubject);

    return res.status(201).json({
      message: "Assigned Subject created successfully",
      data: createdAssignedSubject,
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
