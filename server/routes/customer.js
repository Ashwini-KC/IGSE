const {Router} = require("express")
const {db} = require("../utils")
const readingRoutes = require("./readings")
const router = Router()


router.use("/readings", readingRoutes)

router.get("/", (req,res)=>{
    const customer_id  = req.user.payload.customer_id

    if(customer_id !== req.user.payload.customer_id){
        return res.status(403).json({msg: "Forbidden"})
    }

    db.query(`select * from customer where customer_id= "${customer_id}";`,(err,result)=>{

        if (err) {
            res.status(500).json({err})
        } else {
            if(result.length === 1){
                const { address, property_type, bedroom_num, balance, type } = result[0];
                res.send({customer_id,address, property_type, bedroom_num, balance, type })
            } else {
                res.status(404).json({err: "User not found"})
            }
            
        }
    })
    
})

router.post("/topup", (req, res) => {
    const {code} = req.body
    const customer_id  = req.user.payload.customer_id
    let balance = 0;

    db.query(`SELECT * FROM Voucher WHERE EVC_code = '${code}'`, (err, results) => {
        if(err){
            return res.status(500).json(err)
        }

        if(results.length == 0){
            return res.status(404).json({msg: "Voucher not found"})
        }

        if(results[0].used === 1){
            return res.status(400).json({msg: "Voucher Used"})
        }

        db.query(`UPDATE VOUCHER SET used =1 WHERE EVC_code = "${code}"`, (errors, result) => {
            if(errors){
                return res.status(500).json(errors)
            }

            db.query(`SELECT balance FROM Customer WHERE customer_id = '${customer_id}'`, (error, bal) => {
                if(error){
                    return res.status(500).json(error)
                }
                balance = bal[0].balance
                const newBalance = balance + 200
                db.query(`UPDATE customer SET balance = ${newBalance} WHERE customer_id = '${customer_id}'`, (error, results) => {
                    if(err){
                        return res.status(500).json(err)
                    }
                    res.json({msg: "Topped up £200", balance: newBalance})
                })
            })
        })
    })
})

module.exports = router