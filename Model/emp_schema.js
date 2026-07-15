const { default: mongoose } = require("mongoose");

let emp_schema = mongoose.Schema({
    name:{
        type:String,
        require : true
    },
    username:{
        type:String,
        require : true
    },
    email:{
        type:String,
        require : true
    },
    phone:{
        type:String,
        require : true
    },
    address:{
        type:String,
        require : true
    },
    dob:{
        type:String,
        require : true
    },
    doj:{
        type:String,
        require : true
    },
    dest:{
        type:String,
        require : true
    },
    dept:{
        type:String,
        require : true
    },
    accountCreated:{
        type:Boolean,
        default:false
    },
    accountRole:{
        type:String,
        default:""
    },
    empImage:{
        type:String,
    }
})

let emp_data = mongoose.model("emp_data",emp_schema);

module.exports = emp_data;
