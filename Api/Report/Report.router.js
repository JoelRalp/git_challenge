
const {voucherReport} = require("./Report.controller");

const router = require("express").Router();


router.post("/VoucherReport",voucherReport);



module.exports = router;