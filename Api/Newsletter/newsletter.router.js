
const {viewNewsLetter,addNewsLetter,getNewsLettertId,deleteNewsLettertId,changeNewsLettertStatus,editnewsletter} = require("./newsletter.controller");

const router = require("express").Router();

router.post("/Viewnewsletter",viewNewsLetter);
router.post("/Addnewsletter",addNewsLetter);
router.post("/Getnewsletter",getNewsLettertId);
router.post("/Deletenewsletter",deleteNewsLettertId);
router.post("/changenewsletterststus",changeNewsLettertStatus);
router.post("/editnewsletter",editnewsletter);
module.exports = router;