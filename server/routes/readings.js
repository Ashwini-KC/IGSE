const {Router} = require("express")
const {db} = require("../utils")
const router = Router()

router.get("/", (req, res) => {
    const user = req.user.payload.customer_id

    db.query(`select * from reading where customer_id="${user}"; `,(err,results)=>{
        if (err){
            return res.sendStatus(500)
        }
        if(results.length === 0){
            return res.status(404).json({msg: "Readings not found."})
        }

        const paid = results.filter(reading => reading.status === "paid")
        const pending = results.filter(reading => reading.status === "pending")

        res.json({paid, pending})
        
    })
})

router.post("/new", async (req, res) => {
    const user = req.user.payload.customer_id

    const { day, night, gas} = req.body
    const date = req.body.date || `${new Date(Date.now()).getFullYear()}-${new Date(Date.now()).getMonth() + 1}-${new Date(Date.now()).getDate()}`

    let readings = []
    let previous = {
        day: null,
        night: null,
        gas: null,
        date: null
    }

    let nextReading = {
        day,
        night,
        gas
    }

    db.query(`SELECT * FROM READING WHERE customer_id = '${user}'`, (err, results) => {
        if(err){
            return res.status(500).json({err})
        }
        readings = results
        
        if(results.length > 0){
            let recent = results.filter(reading => new Date(reading.submission_date).getTime() <= new Date(date).getTime())
            recent = recent.sort((current, prev) => new Date(current.submission_date).getTime() > new Date(prev.submission_date).getTime() ? current : prev )
            previous.day = recent[recent.length - 1].elec_readings_day
            previous.night = recent[recent.length - 1].elet_reading_night
            previous.gas = recent[recent.length - 1].gas_reading
            previous.date = recent[recent.length - 1].submission_date
            
            let nextResult = results.sort((current, prev) => new Date(current.submission_date).getTime() > new Date(prev.submission_date).getTime() ? current : prev ).filter(reading => new Date(reading.submission_date).getTime() >= new Date(date).getTime())[0]
            if(nextResult){
                nextReading.day = nextResult[0].elec_readings_day
                nextReading.night = nextResult[0].elet_reading_night
                nextReading.gas = nextResult[0].gas_reading
            }

            if((previous.day >= day && nextReading.day >= day) || (previous.night >= night && nextReading.night >= night) || (previous.gas >= gas && nextReading.gas >= gas)){
                return res.status(400).json({msg: "Current reading values should be more than the previous gas reading and/or less than the next values", previous, nextReading})
            }
        }


        db.query(`INSERT INTO READING (customer_id, submission_date, elec_readings_day, elet_reading_night, gas_reading, status) VALUES('${user}', '${date}', ${day},${night}, ${gas}, 'pending')`, (err, results) => {
            if(err){
                return res.sendStatus(500)
            }
            res.status(201).json({msg: "New reading added."})
        })
    })


})


router.get("/:id", (req, res) => {
    const id = req.params.id
    const user = req.user.payload.customer_id

    db.query(`SELECT * FROM READING WHERE customer_id = '${user}' and reading_id = '${id}'`, (err, results) => {
        if(err){
            return res.status(500).json({msg: "Server Error"})
        }

        if(results.length === 0){
            return res.status(404).json({msg: "Reading not found"})
        }

        res.json({reading: results[0]})
    })
})

module.exports = router