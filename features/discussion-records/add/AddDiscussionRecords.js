import DiscussionRecords from "../../../models/DiscussionRecords.js";
import Jwt from "../../../utils/Jwt.js";
import AddDiscussionRecordsSchema from "./AddDiscussionRecordsSchema.js";

export default async function AddDiscussionRecordsAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const discussionRecords = await AddDiscussionRecordsSchema.validateAsync(req.body);

    const discussionRecord = await DiscussionRecords.create(discussionRecords);

    return res.status(201).json({
      message: "Discussion Record created successfully",
      data: discussionRecord,
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
