const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Client = db.client;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.singup =  async (req, res,next) =>
{

    console.log(req.body);

   /* const user ={
        username : req.body.username ,

        email : req.body.email,
        pwd :req.body.pwd,
        role: "client"
    }*/
   const  pwd = req.body.user.pwd;
    bcrypt.hash(pwd, 10).then((hash) => {
        User.create({
            username: req.body.user.username,

            email: req.body.user.email,
            pwd:hash,
            role: "client"

        }).then((data) => {
            const role = "client";
            const token = jwt.sign({userId: data.id, role}, config.secret, {
                noTimestamp: true,
                expiresIn: "24h",
            });
            console.log("from signup", jwt.verify(token, config.secret))
            Client.create(
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    address: req.body.address,
                    phone: req.body.phone,
                    userId: data.id
                }
            ).then((clien) => {

                    return res.status(200).send({clien, data: token});

                }
            );

        })
    })
}
