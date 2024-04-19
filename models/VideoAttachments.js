import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import Videos from "./Videos.js";
import AttachmentTypes from "./AttachmentTypes.js";

const connection = Database.getInstance();

const VideoAttachments = connection.define("VideoAttachments", {
  FileName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  VideoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  AttachmentTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

VideoAttachments.belongsTo(Videos, {
  foreignKey: "VideoId",
  constraints: true,
});
VideoAttachments.belongsTo(AttachmentTypes, {
  foreignKey: "AttachmentTypeId",
  constraints: true,
});

connection.sync().catch((error) => {
  console.error("Error syncing VideoAttachments:", error);
});

export default VideoAttachments;
