
const {Login_Employee,ViewAdmin,ViewAdminUser} = require("./AdminLogin.controller");
const router = require("express").Router();


router.post("/login",Login_Employee);
router.post("/ViewAdmin",ViewAdmin);
router.post("/ViewAdminUser",ViewAdminUser);

module.exports = router;