import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import Users from "./Users.js";
import Classes from "./Classes.js";
import Semesters from "./Semesters.js";

const connection = Database.getInstance();

const StudentData = connection.define("StudentData", {
  EnrollmentNumber: {
    type: DataTypes.STRING(12),
    allowNull: true,
  },
  StudentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  SemesterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ClassId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

StudentData.belongsTo(Users, { foreignKey: "StudentId", constraints: true });
Users.hasOne(StudentData);
StudentData.belongsTo(Classes, { foreignKey: "ClassId", constraints: true });
StudentData.belongsTo(Semesters, {
  foreignKey: "SemesterId",
  constraints: true,
});

connection.sync().catch((error) => {
  console.error("Error syncing StudentData:", error);
});

export default StudentData;
