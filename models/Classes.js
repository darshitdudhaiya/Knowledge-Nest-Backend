import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import Years from "./Years.js";

const connection = Database.getInstance();

const Classes = connection.define("Classes", {
  Division: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isUnique: async function (value) {
        const existingClass = await Classes.findOne({ where: { Division: value } });

        if (existingClass) {
          throw new Error('Divison name must be unique');
        }
      },
    },
  },
  YearId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Classes.belongsTo(Years, { foreignKey: "YearId", constraints: true });

connection.sync().catch((error) => {
  console.error("Error syncing Classes:", error);
});

export default Classes;