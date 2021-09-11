
const {viewBetaCategory,dragAndDropProduct,getsubpro,addBetaCategory,dragAndDrop,getBetaCategory,changeBetaCategoryStatus,deleteBetaCategory,editBetaCategory,dragAndDropSub,viewBetaProduct,addBetaProduct,getBetaProduct,changeBetaProductStatus,deleteBetaProduct,editBetaProduct,viewBetaSubProduct,addBetaSubProduct,getBetaSubProduct,changeBetaSubProductStatus,deleteBetaSubProduct,editBetaSubProduct} = require("./beta.controller");

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
router.post("/EditBetaSubcategory",editBetaSubProduct);
router.post("/dragAndDrop",dragAndDrop);
router.post("/dragAndDropSub",dragAndDropSub);
router.post("/getsubpro",getsubpro);
router.post("/dragAndDropProduct",dragAndDropProduct);
module.exports = router;
