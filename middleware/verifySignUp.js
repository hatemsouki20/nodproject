const db = require("../models");

const User = db.user;
const Client = db.client;
checkDuplicateUsernameOrEmail = async  (req, res, next) => {
    // Username
   User.findOne({
        where: {
            username: req.body.user.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }

        // Email
        User.findOne({
            where: {
                email: req.body.user.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }

            next();
        });
    });
};



const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
 
};

module.exports = verifySignUp;