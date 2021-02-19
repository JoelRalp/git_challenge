
const {viewWebOrder} = require("./weborder.controller");

const router = require("express").Router();


router.post("/ViewWebOrderProduct",viewWebOrder);
router.post("/AddWebOrderProduct",viewWebOrder);


module.exports = router;