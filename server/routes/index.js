const {Router} = require("express")

const authRoutes = require("./auth")
const customerRoutes = require("./customer")
const adminRoutes = require('./admin')
const igseRoutes = require("./igse")
const {auth, adminVerify} = require("../middleware") 
const router = Router()

router.get("/", (req, res) => {
    res.json({"message": "Hello world"})
})
router.use(authRoutes)
router.use("/admin",auth, adminVerify, adminRoutes)
router.use("/customer", auth, customerRoutes)

router.use("/igse", igseRoutes)

module.exports = router