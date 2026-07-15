let express = require("express");
let router = express.Router();

let {login,signup,status} = require("../Controller/auth")

router.get("/",status)

router.post("/api/login",login)
router.post("/api/signup",signup)

module.exports = router;