import AssignmentAttachments from "../../../models/AssignmentAttachments.js";
import Assignments from "../../../models/Assignments.js";
import AttachmentTypes from "../../../models/AttachmentTypes.js";
import Jwt from "../../../utils/Jwt.js";

export default async function GetAssignmentAttachmentAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const assignmentAttachments = await AssignmentAttachments.findAll({
      include: [
        {
          model: Assignments,
        },
        {
          model: AttachmentTypes,
        },
      ],
    });

    return res.status(200).json({
      data: assignmentAttachments,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: err,
    });
  }
}
