const {Router} = require("express")
const { hash, db, JWT_SECRET } = require("../utils")
const jwt = require("jsonwebtoken")

const router = Router()

router.post("/register", (req,res)=>{
    const {customer_id, password_hash, property_type, bedrooms, address,evc} = req.body
    const hashedPassword= hash(password_hash);
    try {

        db.query(`select customer_id from customer where customer_id="${customer_id}"; `,(err,results)=>{

            if(err){
                throw err
            }else if(results.length === 1){
                res.status(400).json({message:"User already exists"})
                
            }else {
                db.query(`select EVC_code,used from voucher where EVC_code="${evc}";`,(err,results)=>{
                    if (err) {
                        res.status(400).json(err)
                    } else if(results.length ===0){
                        res.status(404).json({error: "Voucher code is Invalid"})
                    }else if(results.length===1 && results[0].used===1){
                        res.status(400).json({error: "Voucher Code is used"})
                    }
                    else if(results.length===1 && results[0].used === 0){
                    db.query("INSERT INTO customer (customer_id, password_hash,address,property_type,bedroom_num,balance,type) VALUES (?,?,?,?,?,200,'customer')",
                    [customer_id, hashedPassword, address,property_type,bedrooms],
                    (err, result)=>{
                        res.send({msg:"Profile successfully created"})
                        db.query(`update voucher set used = 1 where EVC_Code = "${evc}";`);
                        db.query("commit");
                    });      
                }       
                })  
            }
        })
    } catch (error) {
        res.status(400).json({error})
    }
})


router.post("/login", (req,res)=>{
    const customer_id =req.body.customer_id;
    const password_hash=req.body.password_hash;
    const hashedPassword= hash(password_hash);
    const customer  = {
        customer_id:customer_id
    }
    db.query(`select customer_id,password_hash, balance from customer where customer_id="${customer_id}"; `,(err,results)=>{
        if(err){
            res.send({err: err });
        }
         else if(results.length>0){
           if(hashedPassword===results[0].password_hash){
                const token = jwt.sign({payload: {...customer, balance: results[0].balance}}, JWT_SECRET, {expiresIn: "30m"})
                res.send({msg:"successfully logged in",customer, token})
           } else {
            res.status(403).json({mesg: "Wrong password"})
           }
        } else {
            res.send({message: "User doesn't exist"});
        }
            }
        
        );
})

module.exports = router