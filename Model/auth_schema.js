const { default: mongoose } = require("mongoose");

let auth_schema = mongoose.Schema({
    name:{
        type:String,
        require : true
    },
    email:{
        type:String,
        require : true
    },
    password:{
        type:String,
        require : true
    },
    role:{
        type:String,
        default:"admin"
    },
    conpassword:{
        type:String,
        require : true
    },
    role:{
        type:String,
        require:true
    },
    empImage:{
        type:String,
    }
})

let auth_data = mongoose.model("auth_data",auth_schema);

module.exports = auth_data;
