
const {viewWebOrder,addWebOrder,getWebOrderProductId,deleteWebOrderProduct,changeWebOrderProductTableStatus,editWebOrderProduct,viewUser} = require("./weborder.controller");

const router = require("express").Router();


router.post("/ViewWebOrderProduct",viewWebOrder);
router.post("/AddWebOrderProduct",addWebOrder);
router.post("/GetWebOrderProduct",getWebOrderProductId);
router.post("/DeleteWebOrderProduct",deleteWebOrderProduct);
router.post("/ChangeWebOrderProductStatus",changeWebOrderProductTableStatus);
router.post("/EditProductStatus",editWebOrderProduct);
router.post("/ViewUser",viewUser);

module.exports = router;