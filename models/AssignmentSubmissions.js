import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import Users from "./Users.js";
import Assignments from "./Assignments.js";

const connection = Database.getInstance();

const AssignmentSubmissions = connection.define("AssignmentSubmissions", {
  FileName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  StudentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  AssignmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

AssignmentSubmissions.belongsTo(Users, {
  foreignKey: "StudentId",
  constraints: true,
});
AssignmentSubmissions.belongsTo(Assignments, {
  foreignKey: "AssignmentId",
  constraints: true,
});

connection.sync().catch((error) => {
  console.error("Error syncing AssignmentSubmissions:", error);
});

export default AssignmentSubmissions;
