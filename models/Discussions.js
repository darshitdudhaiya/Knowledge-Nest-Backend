import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import Users from "./Users.js";
import Classes from "./Classes.js";
import Subjects from "./Subjects.js";

const connection = Database.getInstance();

const Discussions = connection.define("Discussions", {
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ClassId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  SubjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Discussions.belongsTo(Users, { foreignKey: "UserId", constraints: true });
Discussions.belongsTo(Classes, { foreignKey: "ClassId", constraints: true });
Discussions.belongsTo(Subjects, { foreignKey: "SubjectId", constraints: true });

connection.sync().catch((error) => {
  console.error("Error syncing Discussions:", error);
});

export default Discussions;
