import DiscussionRecords from "../../../models/DiscussionRecords.js";
import Jwt from "../../../utils/Jwt.js";

export default async function DeleteDiscussionRecordsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const DiscussionId = req.params.id;

    const discussionRecord = await DiscussionRecords.findByPk(DiscussionId);
    if (!discussionRecord) {
      return res.status(404).json({
        message: "Discussion record not found",
      });
    }

    const deletedCircularRecord = await discussionRecord.destroy();
    if (deletedCircularRecord) {
      return res.status(201).json({
        data: "Discussion record deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
