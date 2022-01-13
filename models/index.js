const dbconfig = require("../config/dbconfig");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbconfig.BD, dbconfig.USER, dbconfig.PASSWORD , {
    host : dbconfig.HOST ,
    dialect : dbconfig.dialect ,
    pool : {
        max : dbconfig.pool.max ,
        min : dbconfig.pool.min ,
        acquire : dbconfig.pool.acquire ,
        idle : dbconfig.pool.idle
    },
} );
const db = {};
db.Sequelize = Sequelize ;
db.sequelize = sequelize ;
db.produit = require("./produit")(sequelize , Sequelize);
db.file = require("./file")(sequelize , Sequelize);
db.user = require("./user.models")(sequelize , Sequelize);
db.admin = require("./admin")(sequelize , Sequelize);
db.client = require("./client")(sequelize , Sequelize);
db.partner = require("./partner")(sequelize , Sequelize);




db.user.hasOne(db.admin);
db.admin.belongsTo(db.user);
db.user.hasOne(db.client);
db.client.belongsTo(db.user);
db.user.hasOne(db.partner);
db.partner.belongsTo(db.user);

db.produit.hasMany(db.file);
db.file.belongsTo(db.produit);
/*
db.role.belongsToMany(db.user ,{
    through : "user_role",
    foreignKey: "roleId",
    otherKey : "userId"
});
db.user.belongsToMany(db.role , {
    through : "user_role",
    foreignKey: "userId",
    otherKey : "roleId"

})*/

module.exports = db ;