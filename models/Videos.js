import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import Users from "./Users.js";
import Subjects from "./Subjects.js";

const connection = Database.getInstance();

const Videos = connection.define("Videos", {
  Title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  FileName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  ThumbnailName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  IsApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  SubjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Videos.belongsTo(Users, { foreignKey: "UserId", constraints: true });
Videos.belongsTo(Subjects, { foreignKey: "SubjectId", constraints: true });

connection.sync().catch((error) => {
  console.error("Error syncing Videos:", error);
});

export default Videos;
