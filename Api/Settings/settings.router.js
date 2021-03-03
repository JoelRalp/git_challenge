
const {viewPrivacy,addPrivacy,viewTerms,addTerms,viewPos,editPos,viewMemberCard,getMemberCardId,editMembercard,viewPoints,addPoints,getPointsId,editPoints} = require("./settings.controller");

const router = require("express").Router();


router.post("/ViewPrivacy",viewPrivacy);
router.post("/AddPrivacy",addPrivacy);
router.post("/ViewTerms",viewTerms);
router.post("/AddTerms",addTerms);
router.post("/ViewPos",viewPos);
router.post("/EditPos",editPos);
router.post("/ViewMembercard",viewMemberCard);
router.post("/GetMembercard",getMemberCardId);
router.post("/EditMembercard",editMembercard);
router.post("/ViewPoints",viewPoints);
router.post("/AddPoints",addPoints);
router.post("/GetPointsByID",getPointsId);
router.post("/EditPoints",editPoints);
module.exports = router;