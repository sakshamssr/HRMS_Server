let mongoose = require("mongoose");

let dotenv = require("dotenv")
dotenv.config();

let mongo_db = process.env.CONNECTION_STRING;

mongoose.connect(mongo_db).then(()=>{
    console.log("Database Connected Successfully")
}).catch(()=>{
    console.log("Database Not Connected")
})

// export default mongoose;
module.exports = mongoose;