
const {View_Voucher} = require("./Voucher.controller");
const {Add_Voucher} = require("./Voucher.controller");
const {getVoucherById} = require("./Voucher.controller");
const {changeVoucherStatus} = require("./Voucher.controller");
const {editVoucher} = require("./Voucher.controller");
const {deleteVoucher} = require("./Voucher.controller");

const router = require("express").Router();


router.post("/ViewVoucher",View_Voucher);
router.post("/AddVoucher",Add_Voucher);
router.post("/Get_Voucher_By_Id",getVoucherById);
router.post("/ChangeVoucherStatus",changeVoucherStatus);
router.post("/EditVoucher",editVoucher);
router.post("/DeleteVoucher",deleteVoucher);



module.exports = router;