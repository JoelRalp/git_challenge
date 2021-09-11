
const {View_Voucher} = require("./Voucher.controller");
const {Add_Voucher} = require("./Voucher.controller");
const {getVoucherById,editAppVoucher} = require("./Voucher.controller");
const {changeVoucherStatus,Delete_App_Voucher,getAppExternalVoucherById,changeExpVoucherStatus} = require("./Voucher.controller");
const {editVoucher,View_App_Voucher,changeAppVoucherStatus,View_External_Voucher} = require("./Voucher.controller");
const {deleteVoucher,editExpVoucher,Add_App_Voucher,getAppVoucherById,Add_External_Voucher} = require("./Voucher.controller");

const router = require("express").Router();

router.post("/View_External_Voucher",View_External_Voucher);
router.post("/ViewVoucher",View_Voucher);
router.post("/AddVoucher",Add_Voucher);
router.post("/Get_Voucher_By_Id",getVoucherById);
router.post("/ChangeVoucherStatus",changeVoucherStatus);
router.post("/EditVoucher",editVoucher);
router.post("/DeleteVoucher",deleteVoucher);
router.post("/Add_App_Voucher",Add_App_Voucher);
router.post("/View_App_Voucher",View_App_Voucher);
router.post("/getAppVoucherById",getAppVoucherById);//  getAppExternalVoucherById: (req, res) => {
router.post("/changeAppVoucherStatus",changeAppVoucherStatus);
router.post("/Delete_App_Voucher",Delete_App_Voucher);
router.post("/editAppVoucher",editAppVoucher);
router.post("/Add_External_Voucher",Add_External_Voucher);
router.post("/getAppExternalVoucherById",getAppExternalVoucherById);
router.post("/changeExpVoucherStatus",changeExpVoucherStatus);
router.post("/editExpVoucher",editExpVoucher);
module.exports = router;