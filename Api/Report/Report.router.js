
const {voucherReport,PaymentReport,TopupReport,DayendReport,ReservationReport} = require("./Report.controller");

const router = require("express").Router();


router.post("/VoucherReport",voucherReport);
router.post("/PaymentReport",PaymentReport);
router.post("/TopupReport",TopupReport);
router.post("/DayendReport",DayendReport);
router.post("/ReferalReport",DayendReport);
router.post("/ReservationReport",ReservationReport);
module.exports = router;