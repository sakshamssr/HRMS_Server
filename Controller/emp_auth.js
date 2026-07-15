let emp_data = require("../Model/emp_schema")
let auth_data = require("../Model/auth_schema")
let bcrypt = require("bcrypt")

let empdata = async(req,res)=>{
    let{name,username, email, phone, address,dob, doj, dest, dept} = req.body;
    try {
        let data = await emp_data({
            name:name,
            username:username,
            email:email,
            phone:phone,
            address:address,
            dob:dob,
            doj:doj,
            dest:dest,
            dept:dept,
        }).save()
        return res.status(201).json({
            success:true,
            message:"Registeration Successful"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

let findData = async(req,res) =>{
    try {
        let data = await emp_data.find();
        if(!data){
            return res.status(404).json({success:false,message:"User Not Found"})
        }
        else{
            return res.status(200).json({success:true, data:data})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:"Something Went Wrong"})
    }
    // console.log(data);
    
}

let updateEmpData = async(req,res)=>{
    console.log(req.body)
    console.log(req.files.empImage[0].filename);

    let empImage = req.files.empImage[0].filename;
    if(req.files){
        console.log(req.body.empEmail);
        let update_emp_image = await emp_data.updateOne(
            {email: req.body.empEmail},
            {$set:{
                empImage: empImage,
            }}
        )
        return res.status(200).json({
            success:true,
            message:"Image Updated",
        })
    }
    let {   name,
            username,
            email,
            phone,
            address,
            dob,
            doj,
            dest,
            dept,
        } = req.body;
    try {
        let existingEmp = await emp_data.findOne({email:req.body.email})
        if(!existingEmp){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })
        }
        else{
            let updateEmp = await emp_data.updateOne({email:email},{$set:{
                name:name,
                username:username,
                email:email,
                phone:phone,
                address:address,
                dob:dob,
                doj:doj,
                dest:dest,
                dept:dept
            }})
            return res.status(200).json({
                success:true,
                message:"Updated"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

let updateEmpDataID = async(req,res) =>{
    let id = req.params.id;
    let{name,username, email, phone, address,dob, doj, dest, dept, accountCreated} = req.body;

    try {
        let employee_EmpID = await emp_data.findByIdAndUpdate(id,{
            name:name,
            username:username,
            email:email,
            phone:phone,
            address:address,
            dob:dob,
            doj:doj,
            dest:dest,
            dept:dept,
            accountCreated:accountCreated
        }, {new:true});
        if(!employee_EmpID){
            return res.status(400).json({
                success:false,
                message:"Record Not Found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Updated",
            data:employee_EmpID
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }


}

let deleteEmp = async(req,res)=>{
    try{
        let id = req.params.id;
        await emp_data.deleteOne({_id: id});
        return res.status(200).json({success:true,message:"Deleted"})
    }
    catch(error){
        return res.status(500).json({success:false,message:"Something Went Wrong"})

    }
}

let createEmployeeAccount = async(req,res)=>{
    let id = req.params.id;
    let {password, confirmPassword, role} = req.body;

    try {
        if(!role){
            return res.status(400).json({
                success:false,
                message:"Role is required"
            })
        }

        if(!password || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm password are required"
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password doesn't match"
            })
        }

        let employee = await emp_data.findById(id);
        if(!employee){
            return res.status(404).json({
                success:false,
                message:"Employee not found"
            })
        }

        let existingAccount = await auth_data.findOne({email:employee.email});
        if(existingAccount){
            let updatedEmployee = await emp_data.findByIdAndUpdate(
                id,
                {accountCreated:true, accountRole:existingAccount.role || role},
                {new:true}
            );

            return res.status(409).json({
                success:false,
                message:"Account already exists for this employee",
                data:updatedEmployee
            })
        }

        let hashPassword = await bcrypt.hash(password,10);
        await auth_data({
            name:employee.name,
            email:employee.email,
            password:hashPassword,
            role:role,
        }).save()

        let updatedEmployee = await emp_data.findByIdAndUpdate(
            id,
            {accountCreated:true, accountRole:role},
            {new:true}
        );

        return res.status(201).json({
            success:true,
            message:"Employee account created successfully",
            data:updatedEmployee
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

module.exports = {empdata,findData,updateEmpData,updateEmpDataID,deleteEmp,createEmployeeAccount};
