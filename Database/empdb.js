let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HRMS").then(()=>{
    console.log("Database Connected Successfully")
}).catch(()=>{
    console.log("Database Not Connected")
})

// export default mongoose;
module.exports = mongoose;