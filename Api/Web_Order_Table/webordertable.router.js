
const {viewWebOrderTable,addWebOrderTable,getWebOrderTableId,changeWebOrderTableStatus,editWebOrderTable,deleteWebOrderTable} = require("./webordertable.controller");

const router = require("express").Router();


router.post("/ViewWebOrderTable",viewWebOrderTable);
router.post("/AddWebOrderTable",addWebOrderTable);
router.post("/GetWebOrderTableByID",getWebOrderTableId);
router.post("/ChangeWebOrderTableStatus",changeWebOrderTableStatus);
router.post("/EditWebOrderTable",editWebOrderTable);
router.post("/DeleteWebOrderTable",deleteWebOrderTable);

module.exports = router;