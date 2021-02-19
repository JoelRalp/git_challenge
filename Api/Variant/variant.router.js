
const {viewVarient,addVariant,editVariant,getVariantById,changeVariantStatus,deleteVaiant} = require("./variant.controller");
const router = require("express").Router();


router.post("/ViewVariant",viewVarient);
router.post("/AddVariant",addVariant);
router.post("/EditVariant",editVariant);
router.post("/GetVariant",getVariantById);
router.post("/ChangeVariantStatus",changeVariantStatus);
router.post("/DeleteVariant",deleteVaiant);

module.exports = router;