const jwt = require("jsonwebtoken")

const {JWT_SECRET} = require("../utils")

module.exports  = async (req, res, next) => {
    const authorization = req.headers.authorization || "Bearer invalidToken"
    const token =  authorization.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ msg: "Please login"})
        } 
        req.user = user
        next()
    })
}

