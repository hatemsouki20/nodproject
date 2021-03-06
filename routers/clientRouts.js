


module.exports = (app) => {

    const verifySignUp  = require("../middleware/verifySignUp");
    const auth = require("../middleware/auth")
    const client = require("../controller/clientController");
    var router = require ("express").Router({params: true});

    router.post("/sig",[ verifySignUp.checkDuplicateUsernameOrEmail],client.singup);
    router.post("/signin", client.singiInclienet);
    router.get("/:userId", auth , client.getClientByID);
    router.post("/pwd" ,client.forgotpwd);
    router.post("/change-pwd                  ",client.changePWD);

    app.use("/api/client", router);
}



