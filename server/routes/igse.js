const { Router } = require("express");
const { db } = require("../utils");

const router = Router()

router.get("/propertycount", (req, res) => {
    db.query("SELECT property_type, COUNT(*) as count FROM Customer GROUP BY property_type", (err, results) => {
        if(err){
            return res.sendStatus(500)
        }

        let propertycount = results.map(count => {
            let type = {}

            type[`${count.property_type}`] = count.count

            return type
        })
        
        res.json({propertycount})
    })
})

module.exports = router