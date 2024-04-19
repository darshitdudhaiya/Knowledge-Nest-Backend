import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import UserRoles from "./UserRoles.js";

const connection = Database.getInstance();

const Users = connection.define("Users", {
  Email: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  IsActivate: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  UserRoleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Users.belongsTo(UserRoles, { foreignKey: "UserRoleId", constraints: true });
UserRoles.hasMany(Users);

connection.sync().catch((error) => {
  console.error("Error syncing Users:", error);
});

export default Users;
