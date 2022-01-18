module.exports =(sequelize, Sequelize)  =>{

    const Client = sequelize.define("client", {
        firstName:{
            type : Sequelize.STRING ,

        },
        lastName:{
            type : Sequelize.STRING ,

        },


        address:{
            type : Sequelize.STRING ,

        },
        phone:{
            type : Sequelize.STRING ,

        },

    });
    return Client ;
} ;
