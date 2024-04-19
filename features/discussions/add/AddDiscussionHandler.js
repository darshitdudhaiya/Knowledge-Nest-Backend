import Discussions from "../../../models/Discussions.js";
import Jwt from "../../../utils/Jwt.js";
import AddDiscussionSchema from "./AddDiscussionSchema.js";

export default async function AddDiscussionAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const discussion = await AddDiscussionSchema.validateAsync(req.body);

    const discussions = await Discussions.create(discussion);

    return res.status(201).json({
      message: "Discussion created successfully",
      data: discussions,
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
