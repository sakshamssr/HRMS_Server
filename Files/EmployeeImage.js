let multer = require("multer");

let storage1 = multer.diskStorage({
    destination:"employeeProfile",
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
})

let EmployeeProfile = multer({
    storage:storage1,
}).fields([{name:"empImage"}])

module.exports = EmployeeProfile;