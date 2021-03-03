
const {viewFeedback} = require("./support.controller");

const router = require("express").Router();


router.post("/Viewfeedback",viewFeedback);



module.exports = router;