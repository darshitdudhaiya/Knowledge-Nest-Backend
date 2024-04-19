import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import Assignments from "./Assignments.js";
import AttachmentTypes from "./AttachmentTypes.js";

const connection = Database.getInstance();

const AssignmentAttachments = connection.define("AssignmentAttachments", {
  FileName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  AssignmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  AttachmentTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

AssignmentAttachments.belongsTo(Assignments, {
  foreignKey: "AssignmentId",
  constraints: true,
});
AssignmentAttachments.belongsTo(AttachmentTypes, {
  foreignKey: "AttachmentTypeId",
  constraints: true,
});

connection.sync().catch((error) => {
  console.error("Error syncing AssignmentAttachments:", error);
});

export default AssignmentAttachments;
