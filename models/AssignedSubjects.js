import Database from "../utils/Database.js";
import Users from "./Users.js";
import Subjects from "./Subjects.js";
import { DataTypes } from "sequelize";

const connection = Database.getInstance();

const AssignedSubjects = connection.define("AssignedSubjects", {
  FacultyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  SubjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

AssignedSubjects.belongsTo(Users, {
  foreignKey: "FacultyId",
  constraints: true,
});
Users.hasMany(AssignedSubjects);
AssignedSubjects.belongsTo(Subjects, {
  foreignKey: "SubjectId",
  constraints: true,
});

connection.sync().catch((error) => {
  console.error("Error syncing AssignedSubjects:", error);
});

export default AssignedSubjects;
