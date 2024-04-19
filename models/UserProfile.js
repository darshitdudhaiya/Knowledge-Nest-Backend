import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import Users from "./Users.js";

const connection = Database.getInstance();

const UserProfile = connection.define("UserProfile", {
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Gender: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  Contact: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  Address: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  ImageName: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
UserProfile.belongsTo(Users, { foreignKey: "UserId", constraints: true });
Users.hasOne(UserProfile);

connection.sync().catch((error) => {
  console.error("Error syncing UserProfile:", error);
});

export default UserProfile;
