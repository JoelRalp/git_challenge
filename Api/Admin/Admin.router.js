const {Login_Admin,reset_Password} = require("./Admin.controller");

const router = require("express").Router();

router.post('/login',Login_Admin);
router.post('/resetPassword',reset_Password);

module.exports = router;