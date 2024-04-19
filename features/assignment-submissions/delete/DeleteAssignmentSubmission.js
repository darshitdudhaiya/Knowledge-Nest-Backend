import Jwt from "../../../utils/Jwt.js";
import AssignmentSubmissions from "../../../models/AssignmentSubmissions.js";
import Assignments from "../../../models/Assignments.js";
import Users from "../../../models/Users.js";
import { deleteFile } from "../../../utils/File-handle.js";

export default async function DeleteAssignmentSubmissionAsync(
  req,
  res
) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const assignmentSubbmissionId = req.params.id;

    const assignmentSubmission = await AssignmentSubmissions.findByPk(
      assignmentSubbmissionId
    );

    if (!assignmentSubmission) {
      return res.status(404).json({
        message: "Assignment Submission Not Found",
      });
    }

    deleteFile("uploads/assignment-submissions", assignmentSubmission.FileName);

    await assignmentSubmission.destroy();

    return res.status(200).json({
      message: "Assignment Submission Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: err,
    });
  }
}
