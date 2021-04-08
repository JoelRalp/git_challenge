
const {viewNewsLetter,addNewsLetter,getNewsLettertId,deleteNewsLettertId,changeNewsLettertStatus,editnewsletter,viewNewsLetterImage} = require("./newsletter.controller");

const router = require("express").Router();

router.post("/Viewnewsletter",viewNewsLetter);
router.post("/Addnewsletter",addNewsLetter);
router.post("/Getnewsletter",getNewsLettertId);
router.post("/Deletenewsletter",deleteNewsLettertId);
router.post("/changenewsletterststus",changeNewsLettertStatus);
router.post("/editnewsletter",editnewsletter);
router.post("/ViewNewsImage",viewNewsLetterImage);
module.exports = router;