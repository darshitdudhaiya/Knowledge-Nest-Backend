import Discussions from "../../../models/Discussions.js";
import Jwt from "../../../utils/Jwt.js";
import UpdateDiscussionSchema from "./UpdateDiscussionValidator.js";

export default async function UpdateDiscussionAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const discussionId = req.params.id;

    const updatedDiscussionRequest = req.body;

    const Discussion = await UpdateDiscussionSchema.validateAsync(updatedDiscussionRequest);

    const existingDiscussion = await Discussions.findByPk(discussionId);

    if (!existingDiscussion) {
      return res.status(404).json({
        message: "Discussion not found",
      });
    }

    const updatedDiscussion = await Discussions.update(Discussion, {
      where: {
        id: discussionId,
      },
    });

    if (updatedCircular) {
      return res.status(200).json({
        data: updatedDiscussion,
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
