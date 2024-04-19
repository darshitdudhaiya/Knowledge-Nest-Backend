import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import Years from "./Years.js";

const connection = Database.getInstance();

const Semesters = connection.define("Semesters", {
  Semester: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  YearId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Semesters.belongsTo(Years, { foreignKey: "YearId", constraints: true });

connection.sync().catch((error) => {
  console.error("Error syncing Semesters:", error);
});

export default Semesters;
