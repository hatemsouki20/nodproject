
module.exports = (app) => {

    const verifySignUp  = require("../middleware/verifySignUp");
    const auth = require("../middleware/auth")
    const partner = require("../controller/partnercontroller");
    var router = require ("express").Router({params: true});

    router.post("/sig",[ verifySignUp.checkDuplicateUsernameOrEmail],partner.create);


    app.use("/api/partner", router);
}


