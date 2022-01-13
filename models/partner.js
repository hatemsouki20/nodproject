module.exports =(sequelise , Sequelise)  =>{

    const Partner = sequelise.define("partner", {
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
    return Partner ;
} ;

