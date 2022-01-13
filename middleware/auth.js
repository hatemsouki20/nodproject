const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
//const db = require("../models");
//const User = db.user;

const verifyToken = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    try {
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded;
        console.log("req.user", req.user, req.user.role)
        if(!req.user.role || req.user.role !== "client") return res.status(401).send("Must be client");
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};



module.exports = verifyToken;
;