import Database from "../utils/Database.js";
import Users from "./Users.js";
import Subjects from "./Subjects.js";
import { DataTypes } from "sequelize";

const connection = Database.getInstance();

const Circulars = connection.define("Circulars", {
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  SubjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Circulars.belongsTo(Users, { foreignKey: "UserId", constraints: true });
Circulars.belongsTo(Subjects, { foreignKey: "SubjectId", constraints: true });

connection.sync().catch((error) => {
  console.error("Error syncing Circulars:", error);
});

export default Circulars;
