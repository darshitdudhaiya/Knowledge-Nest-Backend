import { DataTypes } from "sequelize";
import Database from "../utils/Database.js";

const connection = Database.getInstance();

const AttachmentTypes = connection.define("AttachmentTypes", {
  Extension: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isUnique: async function (value) {
        const existingAttachmentType = await AttachmentTypes.findOne({ where: { Extension: value } });

        if (existingAttachmentType) {
          throw new Error('AttachmentType name must be unique');
        }
      },
    },
  },
});

connection.sync().catch((error) => {
  console.error("Error syncing AttachmentTypes:", error);
});

export default AttachmentTypes;