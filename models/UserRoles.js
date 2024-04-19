import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";

const connection = Database.getInstance();

const UserRoles = connection.define("UserRoles", {
  Name: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
});

connection.sync().catch((error) => {
  console.error("Error syncing UserRoles:", error);
});

export default UserRoles;
