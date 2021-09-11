
const {viewVoucherCategory,addVoucherCategory,editVoucherCategory,getVoucherCategoryById,changeVoucherCategoryStatus,deleteVoucherCategory,view_Category} = require("./Vouchercategory.controller");
const router = require("express").Router();


router.post("/ViewVoucherCategory",viewVoucherCategory);
router.post("/AddVoucherCategory",addVoucherCategory);
router.post("/EditVoucherCategory",editVoucherCategory);
router.post("/GetVoucherCategory",getVoucherCategoryById);
router.post("/ChangeVoucherCategoryStatus",changeVoucherCategoryStatus);
router.post("/DeleteVoucherCategory",deleteVoucherCategory);
router.post("/viewCategory",view_Category);
module.exports = router;