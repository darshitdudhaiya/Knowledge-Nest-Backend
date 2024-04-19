import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";
import Semesters from "./Semesters.js";

const connection = Database.getInstance();

const Subjects = connection.define("Subjects", {
  Name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      isUnique: async function (value) {
        const existingSubject = await Subjects.findOne({ where: { Name: value } });

        if (existingSubject) {
          throw new Error('Subject name must be unique');
        }
      },
    },
  },
  SemesterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Subjects.belongsTo(Semesters, { foreignKey: "SemesterId", constraints: true });

connection.sync().catch((error) => {
  console.error("Error syncing Subjects:", error);
});

export default Subjects;