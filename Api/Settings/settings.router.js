
const {viewPrivacy,addPrivacy,viewTerms,addTerms,viewPos,editPos,viewMemberCard,getMemberCardId,editMembercard,viewPoints,addPoints,getPointsId,editPoints,add_Appcontent,update_Appcontent,delete_Appcontent,view_Appcontent,view_MembershipTitle,update_MembershipTitle,add_TierBenefits,update_TierBenefits,delete_TierBenefits,view_TierBenefits,view_Aboutas,update_Aboutas,view_Topuplimit,update_Topuplimit,delete_Points,add_VoucherBrand,view_VoucherBrand,edit_VoucherBrand,delete_VoucherBrand} = require("./settings.controller");

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
router.post("/deletePoints",delete_Points);
router.post("/addAboutMembership",add_Appcontent);
router.post("/updateAboutMembership",update_Appcontent);
router.post("/deleteAboutMembership",delete_Appcontent);
router.post("/viewAboutMembership",view_Appcontent);
router.post("/viewMembershipTitle",view_MembershipTitle);
router.post("/updateMembershipTitle",update_MembershipTitle);
router.post("/addTierBenefits",add_TierBenefits);
router.post("/updateTierBenefits",update_TierBenefits);
router.post("/deleteTierBenefits",delete_TierBenefits);
router.post("/viewTierBenefits",view_TierBenefits);
router.post("/viewAboutas",view_Aboutas);
router.post("/updateAboutas",update_Aboutas);
router.post("/viewTopuplimit",view_Topuplimit);
router.post("/updateTopuplimit",update_Topuplimit);
router.post("/addVoucherBrand",add_VoucherBrand);
router.post("/viewVoucherBrand",view_VoucherBrand);
router.post("/editVoucherBrand",edit_VoucherBrand);
router.post("/deleteVoucherBrand",delete_VoucherBrand);
module.exports = router;