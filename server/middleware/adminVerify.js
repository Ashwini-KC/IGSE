const {db} = require("../utils")

const adminVerify = (req, res, next) => {
    const user = req.user.payload.customer_id

    db.query(`SELECT type FROM Customer WHERE customer_id = '${user}'`, (err, result) => {
        if(err){
            return res.status(500).json({msg: "Server Error"})
        }
        if(result[0].type !== "admin"){
            return res.status(403).json({msg: "Not admin"})
        }
        req.admin = result[0].type
        next()
    })
}

module.exports = adminVerify