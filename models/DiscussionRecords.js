import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import Users from "./Users.js";
import Discussions from "./Discussions.js";

const connection = Database.getInstance();

const DiscussionRecords = connection.define("DiscussionRecords", {
  Record: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  DiscussionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

DiscussionRecords.belongsTo(Users, { foreignKey: "UserId", constraints: true });
DiscussionRecords.belongsTo(Discussions, {
  foreignKey: "DiscussionId",
  constraints: true,
});

connection.sync().catch((error) => {
  console.error("Error syncing DiscussionRecords:", error);
});

export default DiscussionRecords;
