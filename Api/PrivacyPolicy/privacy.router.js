
const {viewPrivacy,addPrivacy} = require("./privacy.controller");

const router = require("express").Router();


router.post("/ViewPrivacy",viewPrivacy);
router.post("/AddPrivacy",addPrivacy);


module.exports = router;