module.exports =(sequelise , Sequelise)  =>{

    const Admin = sequelise.define("admin", {
        firstName:{
            type : Sequelise.STRING ,

        },
        lastName:{
            type : Sequelise.STRING ,

        },



        phone:{
            type : Sequelise.STRING ,

        },

    });
    return Admin ;
} ;
