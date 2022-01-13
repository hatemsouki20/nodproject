


module.exports = (app) => {

    const verifySignUp  = require("../middleware/verifySignUp");
    const client = require("../controller/clientController");
    var router = require ("express").Router({params: true});

    router.post("/sig",[ verifySignUp.checkDuplicateUsernameOrEmail],client.singup);

    app.use("/api/client", router);
}



