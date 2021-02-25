
const {viewPoints,addPoints,editPoints,getPointsId} = require("./points.controller");

const router = require("express").Router();


router.post("/ViewPoints",viewPoints);
router.post("/AddPoints",addPoints);
router.post("/GetPointsByID",getPointsId);
router.post("/EditPoints",editPoints);


module.exports = router;