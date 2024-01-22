const express = require("express");
const app= express();
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require("./routes")

app.use(express.json());
app.use(cors())
app.use(bodyParser.json())

app.use("/", routes)

app.listen(8000, ()=>{
    console.log("running server");
});


