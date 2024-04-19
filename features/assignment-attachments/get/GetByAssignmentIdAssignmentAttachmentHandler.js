import AssignmentAttachments from "../../../models/AssignmentAttachments.js";
import Assignments from "../../../models/Assignments.js";
import AttachmentTypes from "../../../models/AttachmentTypes.js";
import Jwt from "../../../utils/Jwt.js";

export default async function GetByIdAssignmentAttachmentAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const assignmentId = req.params.id;

    const existingAssignment = await Assignments.findByPk(assignmentId);

    if (!existingAssignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    const assignmentAttachment = await AssignmentAttachments.findAll({
      include: [
        {
          model: Assignments,
        },
        {
          model: AttachmentTypes,
        },
      ],
      where: {
        AssignmentId: assignmentId,
      },
    });

    if (!assignmentAttachment) {
      return res.status(404).json({
        message: "Assignment Attachment Not Found",
      });
    }

    return res.status(200).json({
      data: assignmentAttachment,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: err,
    });
  }
}
