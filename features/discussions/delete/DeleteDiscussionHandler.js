import Discussions from "../../../models/Discussions.js";
import Jwt from "../../../utils/Jwt.js";

export default async function DeleteDiscussionAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const DiscussionId = req.params.id;

    const discussion = await Discussions.findByPk(DiscussionId);
    if (!discussion) {
      return res.status(404).json({
        message: "Discussion not found",
      });
    }

    const deletedDiscussion = await discussion.destroy();
    if (deletedDiscussion) {
      return res.status(200).json({
        data: "Discussion deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
