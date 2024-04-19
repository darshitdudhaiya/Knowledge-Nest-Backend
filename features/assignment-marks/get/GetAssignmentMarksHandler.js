import AssignmentSubmissions from "../../../models/AssignmentSubmissions.js";
import AssignmentMarks from "../../../models/AssignmentMarks.js";
import Jwt from "../../../utils/Jwt.js";

export default async function GetAssignmentMarksAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const assignmentMarks = await AssignmentMarks.findAll({
      include: [
        {
          model: AssignmentSubmissions,
        },
      ],
    });

    return res.status(200).json({
      message: "Assignment Marks fetched successfully",
      data: assignmentMarks,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: err.message,
    });
  }
}
