module.exports = (app) => {
    const produit = require("../controller/produitController");

    var router = require ("express").Router({params: true});
    router.get("/", produit.getAllProduits);
    router.post("/",produit.createProduits);
    router.get("/:produitId", produit.getOneProduit),
    router.put("/:produitId", produit.updateProduitDetails);
    router.post("/images", produit.uploadProductPic);
    router.get("/images/:fileId", produit.showfilebyid);
    router.post("/add", produit.addfilebyidProduct);
    app.use("/api/produit", router);
}