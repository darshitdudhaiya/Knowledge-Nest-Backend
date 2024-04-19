import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import QuizeSubmissions from "./QuizeSubmissions.js";

const connection = Database.getInstance();

const QuizeMarks = connection.define("QuizeMarks", {
  Marks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  QuizeSubmissionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

QuizeMarks.belongsTo(QuizeSubmissions, {
  foreignKey: "QuizeSubmissionId",
  constraints: true,
});

connection.sync().catch((error) => {
  console.error("Error syncing QuizeMarks:", error);
});

export default QuizeMarks;
