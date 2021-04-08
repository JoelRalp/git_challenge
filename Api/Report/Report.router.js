
const {voucherReport,PaymentReport,TopupReport,DayendReport,ReservationReport,RefferalReport,WeborderReport,GetDeat} = require("./Report.controller");

const router = require("express").Router();


router.post("/VoucherReport",voucherReport);
router.post("/PaymentReport",PaymentReport);
router.post("/TopupReport",TopupReport);
router.post("/DayendReport",DayendReport);
router.post("/ReferalReport",RefferalReport);
router.post("/ReservationReport",ReservationReport);
router.post("/WeborderReport",WeborderReport);//GetDeat
router.post("/GetDetail",GetDeat);
module.exports = router;