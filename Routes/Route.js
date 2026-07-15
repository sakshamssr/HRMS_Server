let express = require("express");
let router = express.Router();

let {login,signup} = require("../Controller/auth")

router.post("/api/login",login)
router.post("/api/signup",signup)

module.exports = router;