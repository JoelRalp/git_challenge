
const {viewBetaCategory,addBetaCategory,getBetaCategory,changeBetaCategoryStatus,deleteBetaCategory,editBetaCategory,viewBetaProduct,addBetaProduct,getBetaProduct,changeBetaProductStatus,deleteBetaProduct,editBetaProduct,viewBetaSubProduct,addBetaSubProduct,getBetaSubProduct,changeBetaSubProductStatus,deleteBetaSubProduct,editBetaSubProduct} = require("./beta.controller");

const router = require("express").Router();


router.post("/ViewBetaCategory",viewBetaCategory);
router.post("/AddBetaCategory",addBetaCategory);
router.post("/GetBetaCategory",getBetaCategory);
router.post("/ChangeBetaCategoryStatus",changeBetaCategoryStatus);
router.post("/DeleteBetaCategory",deleteBetaCategory);
router.post("/EditeBetaCategory",editBetaCategory);
router.post("/ViewBetaProduct",viewBetaProduct);
router.post("/AddBetaProduct",addBetaProduct);
router.post("/GetBetaProduct",getBetaProduct);
router.post("/ChangeBetaProductStatus",changeBetaProductStatus);
router.post("/DeleteBetaProduct",deleteBetaProduct);
router.post("/EditBetaProduct",editBetaProduct);
router.post("/ViewBetaSubProduct",viewBetaSubProduct);
router.post("/AddBetaSubProduct",addBetaSubProduct);
router.post("/GetBetaSubProduct",getBetaSubProduct);
router.post("/ChangeBetaSubProductStatus",changeBetaSubProductStatus);
router.post("/DeleteBetaSubProduct",deleteBetaSubProduct);
router.post("/EditBetaSubProduct",editBetaSubProduct);
module.exports = router;
