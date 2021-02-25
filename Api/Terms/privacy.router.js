
const {viewTerms,addTerms} = require("./privacy.controller");

const router = require("express").Router();


router.post("/ViewTerms",viewTerms);
router.post("/AddTerms",addTerms);


module.exports = router;