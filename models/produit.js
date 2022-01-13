module.exports =(sequelise , Sequelise) =>{
    const Produit = sequelise.define("produit", {
        produit_nom:{
            type : Sequelise.STRING ,

        },
        price : {
            type : Sequelise.FLOAT
        },
        description : {
            type : Sequelise.TEXT
        },

    });
    return Produit ;
} ;
