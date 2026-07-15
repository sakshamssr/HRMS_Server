let router = require("./Route")
let express = require("express")
let empRoute = express.Router();


let PostEmpAPI = require("../Controller/empController")
let {empdata,findData,updateEmpData,updateEmpDataID,deleteEmp,createEmployeeAccount} = require("../Controller/emp_auth");
let EmployeeProfile = require("../Files/EmployeeImage")

empRoute.post("/api/post/employee",empdata);
empRoute.get("/api/get/employee",findData);
empRoute.put("/api/update/employee",EmployeeProfile,updateEmpData);
empRoute.put("/api/update/byid/:id",updateEmpDataID);
empRoute.post("/api/create/employee-account/:id",createEmployeeAccount);
empRoute.delete("/api/delete/byid/:id",deleteEmp);
module.exports = empRoute;