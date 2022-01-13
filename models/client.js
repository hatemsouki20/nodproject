module.exports =(sequelise , Sequelise)  =>{

    const Client = sequelise.define("client", {
        firstName:{
            type : Sequelise.STRING ,

        },
        lastName:{
            type : Sequelise.STRING ,

        },


        address:{
            type : Sequelise.STRING ,

        },
        phone:{
            type : Sequelise.STRING ,

        },

    });
    return Client ;
} ;
