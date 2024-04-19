import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import Quizzes from "./Quizzes.js";

const connection = Database.getInstance();

const QuizeQuestions = connection.define("QuizeQuestions", {
  Question: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  QuizeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

QuizeQuestions.belongsTo(Quizzes, { foreignKey: "QuizeId", constraints: true });

connection.sync().catch((error) => {
  console.error("Error syncing QuizeQuestions:", error);
});

export default QuizeQuestions;
