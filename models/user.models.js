

module.exports =(sequelise , Sequelise)  =>{

const User = sequelise.define("user", {
    username: {
        type: Sequelise.STRING,
    },
    email:{
        type : Sequelise.STRING ,

    },
    pwd:{
        type : Sequelise.STRING ,

    },
    role: {
        type: Sequelise.ENUM,
        values: ["admin", "client", "partner"],
    },
    activation_code: {
        type: Sequelise.STRING,
    }

});
return User ;
} ;

