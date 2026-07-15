let express = require("express")
let app = express()

let router = require("./Routes/Route")
let empRoute = require("./Routes/empRoute")
let cors = require("cors")  // import cors from cors

let mongoose = require("./Database/db")

app.use(cors())
app.use(express.json())

app.use((req,res,next)=>{
    console.log("HTTP: "+ req.method + req.url);
    next();
})

app.use("/",router);
app.use("/",empRoute);

app.listen(5000,()=>{
    console.log("Port 5000 is active")
})