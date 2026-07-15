let auth_data = require("../Model/auth_schema")
let jwt = require("jsonwebtoken")
let bcrypt = require("bcrypt")

let dotenv = require("dotenv")
dotenv.config();

let SECRET_KEY = process.env.SECRET_KEY;

let status = (req,res)=>{
    return res.status(200).json({
        status:"ok",
    })
}

// let signup = async(req,res) =>{
//     let {name,email,password,conpassword} = req.body;
    
//     try {
//         let exesting_user = await auth_data.findOne({email:email});
//         if(exesting_user){
//             return res.status(409).json({success:false,message:"User Already Exists"})
//         }
//         let data = await auth_data({
//             name:name,
//             email:email,
//             password:password,
//             conpassword:conpassword
//         }).save()
//         return res.status(201).json({success:true,message:"Record Creaded Successfully"})
//     } catch (error) {
//         return res.status(500).json({success:false,message:"Something went wrong"})
//     }

//     console.log(req)
// }

let signup = async(req,res)=>{
    console.log(req.body);
    let{name, email, password, confirmPassword} = req.body;
    try {
        if(password!=confirmPassword){
            return res.status(400).json({success:false, message:"Password doesn't match"})
        }

        let exesting_user = await auth_data.findOne({email:email})
        if(exesting_user){
            return res.status(409).json({success:false, message:"User Already Exists"})
        }

        let hashPassword = await bcrypt.hash(password,10);

        let data = await auth_data({
            name:name,
            email:email,
            password:hashPassword,
        }).save()

        let token = jwt.sign({email:data.email},SECRET_KEY)
        return res.status(201).json({
            success:true,
            message:"Registeration Successful",
            token:token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error
        })
    }
}

let login = async(req,res) => {
    let {email,password} = req.body;
    try {
        let exesting_user = await auth_data.findOne({email:email});
        if(!exesting_user){
            return res.status(404).json({success:false,message:"User Not Found"})
        }
        else{
            let matched = await bcrypt.compare(password, exesting_user.password);
            if(!matched){
                return res.status(400).json({success:false,message:"Invalid Password"})
            }
            let token = jwt.sign({email:exesting_user.email},SECRET_KEY);
            return res.status(200).json({success:true,message:"Login Successfully", role:exesting_user.role, email:exesting_user.email, token:token})
        }
    } catch (error) {
        
    }
}

module.exports = {login,signup,status}