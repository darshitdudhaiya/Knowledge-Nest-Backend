import Sequelize from "sequelize";

class Database
{
  static getInstance()
  {
    const sequelize = new Sequelize(
      "KnowledgeNest",
      "root",
      "",
      {
        host: "127.0.0.1",
        dialect: "mysql",
      }
    );
    
    return sequelize;
  }
}

export default Database;
