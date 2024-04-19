import DiscussionRecords from "../../../models/DiscussionRecords.js";
import Jwt from "../../../utils/Jwt.js";
import UpdateDiscussionRecordsSchema from "./UpdateDiscussionRecordsValidator.js";

export default async function UpdateDiscussionRecordsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const DiscussionId = req.params.id;

    const updatedDiscussionRecordsRequest = req.body;

    const discussionRecords = await UpdateDiscussionRecordsSchema.validateAsync(updatedDiscussionRecordsRequest);

    const existingDiscussionRecords = await DiscussionRecords.findByPk(DiscussionId);

    if (!existingDiscussionRecords) {
      return res.status(404).json({
        message: "DiscussionRecords not found",
      });
    }

    const updatedDiscussionRecords = await DiscussionRecords.update(discussionRecords, {
      where: {
        id: DiscussionId,
      },
    });

    if (updatedDiscussionRecords) {
      return res.status(200).json({
        data: updatedDiscussionRecords,
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
