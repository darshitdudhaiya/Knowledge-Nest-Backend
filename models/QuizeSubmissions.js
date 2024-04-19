import Database from "../utils/Database.js";
import Users from "./Users.js";
import Quizzes from "./Quizzes.js";
import { DataTypes } from "sequelize";

const connection = Database.getInstance();

const QuizeSubmissions = connection.define("QuizeSubmissions", {
  StudentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  QuizeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

QuizeSubmissions.belongsTo(Users, {
  foreignKey: "StudentId",
  constraints: true,
});
QuizeSubmissions.belongsTo(Quizzes, {
  foreignKey: "QuizeId",
  constraints: true,
});

connection.sync().catch((error) => {
  console.error("Error syncing QuizeSubmissions:", error);
});

export default QuizeSubmissions;