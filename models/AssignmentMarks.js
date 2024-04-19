import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import AssignmentSubmissions from "./AssignmentSubmissions.js";

const connection = Database.getInstance();

const AssignmentMarks = connection.define("AssignmentMarks", {
  Marks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  AssignmentSubmissionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

AssignmentMarks.belongsTo(AssignmentSubmissions, {
  foreignKey: "AssignmentSubmissionId",
  constraints: true,
});

connection.sync().catch((error) => {
  console.error("Error syncing AssignmentMarks:", error);
});

export default AssignmentMarks;
