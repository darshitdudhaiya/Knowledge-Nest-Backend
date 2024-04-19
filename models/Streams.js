import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";

const connection = Database.getInstance();

const Streams = connection.define("Streams", {
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

connection.sync().catch((error) => {
  console.error("Error syncing Streams:", error);
});

export default Streams;
