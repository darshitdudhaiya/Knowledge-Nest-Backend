import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import Users from "./Users.js";
import Classes from "./Classes.js";
import Subjects from "./Subjects.js";

const connection = Database.getInstance();

const Assignments = connection.define("Assignments", {
  Title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  LastSubmissionDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Marks: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  PassingMarks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  SubjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ClassId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Assignments.belongsTo(Users, { foreignKey: "UserId", constraints: true });
Assignments.belongsTo(Subjects, { foreignKey: "SubjectId", constraints: true });
Assignments.belongsTo(Classes, { foreignKey: "ClassId", constraints: true });

connection.sync().catch((error) => {
  console.error("Error syncing Assignments:", error);
});

export default Assignments;
