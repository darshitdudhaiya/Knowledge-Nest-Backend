import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import Streams from "./Streams.js";

const connection = Database.getInstance();

const Years = connection.define("Years", {
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  StreamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Years.belongsTo(Streams, { foreignKey: "StreamId", constraints: true });

connection.sync().catch((error) => {
  console.error("Error syncing Years:", error);
});

export default Years;
