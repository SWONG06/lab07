import Sequelize from "sequelize"; 
import dbConfig from "../config/db.config.js";
import usermodel from "./user.model.js";
import rolemodel from "./role.model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    port: dbConfig.PORT,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = usermodel(sequelize, Sequelize);
db.role = rolemodel(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
    as: "roles", 
});

db.ROLES = ["user", "admin", "moderator"];

export default db;