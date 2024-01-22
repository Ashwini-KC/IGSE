const { Router } = require("express");
const { db } = require("../utils");

const router = Router()

router.get("/", (req, res) => {
    res.send("Admin")
})

router.get("/readings/all", (req, res) => {
    db.query("SELECT * FROM Reading", (err, results) => {
        if(err){
            return res.sendStatus(500)
        }

        if(results.length === 0){
            return res.status(404).json({msg: "No readings yet"})
        }

        res.json({
            readings: results
        })
    })
})


module.exports = router