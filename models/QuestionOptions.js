import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import QuizeQuestions from "./QuizeQuestions.js";

const connection = Database.getInstance();

const QuestionOptions = connection.define("QuestionOptions", {
  Value: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  IsCorrect: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  QuestionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

QuestionOptions.belongsTo(QuizeQuestions, {
  foreignKey: "QuestionId",
  constraints: true,
});

connection.sync().catch((error) => {
  console.error("Error syncing QuestionOptions:", error);
});

export default QuestionOptions;
