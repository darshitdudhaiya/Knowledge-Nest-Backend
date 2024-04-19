import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import Users from "./Users.js";
import Circulars from "./Circulars.js";

const connection = Database.getInstance();

const CircularRecords = connection.define("CircularRecords", {
  Record: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  CircularId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

CircularRecords.belongsTo(Users, {
  foreignKey: "UserId",
  constraints: true,
});
CircularRecords.belongsTo(Circulars, {
  foreignKey: "CircularId",
  constraints: true,
});

connection.sync().catch((error) => {
  console.error("Error syncing CircularRecords:", error);
});

export default CircularRecords;
