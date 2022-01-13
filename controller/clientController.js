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



exports.singiInclienet =  async (req, res,next) =>
{
  console.log(req.body);
  const email = req.body.email;
    const pwd = req.body.pwd;
    const role ="client";
   const username = req.body.username;

    if ( !pwd || !role || !username) {
        return res.status(400).send({
            message:" MSG.DATA_MISSING",
        });
    }

    User.findOne({ where: {username : username , role: role }    })
        .then((user) => {
            if (!user) {
                return res.status(401).send({
                    message: "MSG.USER_NOT_FOUND",
                });
            }
            bcrypt
                .compare(pwd, user.pwd)
                .then(async (valid) => {
                    if (!valid) {
                        return res.status(401).send({
                            message: "erreur 401",
                        });
                    } else {
                        const token = jwt.sign({ userId: user.id, role }, config.secret, {
                            noTimestamp: true,
                            expiresIn: "24h",
                        });

                        const data = {


                            email: user.dataValues.email,
                            token: token,
                            idUser: user.dataValues.id,
                        };
                        if (role === "client") {
                            return res.status(200).send({
                                data: data,
                                message: "MSG.SUCCESS_CNX",
                            });
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                    return res.status(500).send({
                        message: "MSG.SQL_ERROR",
                    });
                });
        })
        .catch((error) => {
            console.log("err", error);
            res.status(500).json({
                message: "MSG.SQL_ERROR",

            });
        });
}


exports.getClientByID = (req, res, next) => {
    const { userId } = req.params;
  console.log(req.params);
    User.findByPk(userId)
        .then((data) => {
            if (data) {
                 Client.findByPk(userId).then((clien) =>{
                     const log ={
                         username: data.username,
                         email: data.email
                     }

                     const client = {
                         firstName: clien.firstName,
                         lastName: clien.lastName,
                         address: clien.address,
                         phone: clien.phone,


                     };
                     return res.status(200).send({
                         clien: client,
                         data: log,


                 })});


            } else {
                return res.status(400).send({
                    message: "MSG.USER_NOT_FOUND",
                });
            }
        })
        .catch((err) => {
            console.log("err", err);
            return res.status(500).send({
                message: "MSG.SQL_ERROR",
            });
        });
}


