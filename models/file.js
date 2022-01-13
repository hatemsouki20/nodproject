module.exports =(sequelise , Sequelise) =>{
    const File = sequelise.define("file", {
        file_nom:{
            type : Sequelise.STRING ,

        },
        url : {
            type : Sequelise.FLOAT
        }

    });
    return File ;
} ;
