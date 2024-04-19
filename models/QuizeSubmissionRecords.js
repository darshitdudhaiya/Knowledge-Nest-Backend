import Database from "../utils/Database.js";
import QuizeQuestions from "./QuizeQuestions.js";
import QuestionOptions from "./QuestionOptions.js";
import QuizeSubmissions from "./QuizeSubmissions.js";
import { DataTypes } from "sequelize";

const connection = Database.getInstance();

const QuizeSubmissionRecords = connection.define("QuizeSubmissionRecords", {
  QuizeSubmissionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  QuestionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  OptionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

QuizeSubmissionRecords.belongsTo(QuizeSubmissions, {
  foreignKey: "QuizeSubmissionId",
  constraints: true,
});
QuizeSubmissionRecords.belongsTo(QuizeQuestions, {
  foreignKey: "QuestionId",
  constraints: true,
});
QuizeSubmissionRecords.belongsTo(QuestionOptions, {
  foreignKey: "OptionId",
  constraints: true,
});

connection.sync().catch((error) => {
  console.error("Error syncing QuizeSubmissionRecords:", error);
});

export default QuizeSubmissionRecords;