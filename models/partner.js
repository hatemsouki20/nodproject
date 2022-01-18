module.exports =(sequelise , Sequelise)  =>{

    const Partner = sequelise.define("partner", {
        firstName:{
            type : Sequelise.STRING ,

        },
        lastName:{
            type : Sequelise.STRING ,

        },

         role_partner:{
             type : Sequelise.STRING ,
         }   ,
        name_company:{
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

