
const {Login_Employee} = require("./AdminLogin.controller");
const router = require("express").Router();


router.post("/login",Login_Employee);


module.exports = router;