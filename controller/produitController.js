const db = require ("../models");
const Produit = db.produit ;
const File = db.file ;
exports.getAllProduits = (req,res) => {
    Produit.findAll({ include:[ { model: File } ] }).then((produit)=>{
        console.log(req.body);
        return res.status(200).send({data : produit})
        }).catch(()=>{
        return res.status(500).send({
            message : MSG.SQL_ERROR
        });
    });
}


exports.createProduits = (req,res)=>{;


const  produit =  {
    produit_nom : req.body. produit_nom ,
    price : req.body.price,
    description : req.body.description
       };
  Produit.create(produit).then(data => {
      res.send(data);
  })

};
exports.getOneProduit =(req,res)=>{
    const { produitId } = req.params ;
    console.log(req.params);
    Produit.findAll({where :{id: produitId} , include:[ { model: File } ]}
    ).then((produit) =>{
        return res.status(200).send({
            data : produit[0],
        });
    }) .catch((err) => {
        console.log("err", err)
        return res.status(500).send({
            message: MSG.SQL_ERROR,
        });
    });
};


exports.updateProduitDetails = (req, res, next) => {

    const produitId = req.body.id ;
    const produit_nom = req.body.produit_nom;
    const price = req.body.price;
    const description = req.body.description;

    Produit.update(
        {
            product_name: produit_nom,
            price: price,
            description: description
        },
        {
            where: { id: produitId },
        }
    )
        .then((data) => {
            if (data[0] === 0) {
                return res.status(400).send({
                    message: "MSG.NO_DATA_UPDATED",
                });
            } else {
                return res.status(200).send({
                    message: "success",
                });
            }
        })
        .catch((err) => {
            console.log("err", err)
            return res.status(500).send({
                message: "MSG.SQL_ERROR",
            });
        });
};


exports.deletProduit = (req,res)=>{
    const produitId = req.body.id ;
    if(!produitId){
   return res.status(400).send({
       message :" erreur promise ",
   });
    }

    Produit.findOne({where : {id: produitId}}).then(
        (itm) => {
            if(!itm){
                return res.status(400).send({
                    message : "erreur promise",
                });
            }else {
                itm.destroy().then(()=>
                {
                    return res.status(200).send({
                        message : "delet succes"
                    });
                }).catch(()=>{
                    return res.status(500).send({
                        message: "erreu server internal",
                    });
                })
            }
        }
    );
};
exports.uploadProductPic = async (req,res, next) => {
    try {

        return File.create({
            file_nom : req.body.file_nom,
            url : req.body.url,
            produitId : req.body.produitId
        })
        .then((files) => {

         return res.status(200).send(files);
                    });
                }


  catch (error) {
        console.log("err", error);

      }
    };

exports.showfilebyid =  async(req, res , next) =>{
    try {
       const {fileId} = req.params ;
       File.findAll({where :{id: fileId}}).then((file) =>{
           return res.status(200).send({
               data : file[0],
           });
       })

        } catch (err){
        console.log("err", err);
        };
    };
exports.addfilebyidProduct = async (req,res,next)=>{







 console.log(req.body);
      Produit.create({
          produit_nom : req.body.produit.produit_nom ,
          price : req.body.produit.price,
          description : req.body.produit.description

      }) .then((files) => {

          File.create(
              {
                  file_nom :req.body.file_nom,
                  url : req.body.url,
                  produitId : files.id,
              })
              .then((data ) => {

                      return res.status(200).send({ files,data });

                  }
              );



      })


  }



