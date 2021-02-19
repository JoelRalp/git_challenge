
const {View_Category} = require("./Category.controller");
const {Add_Category} = require("./Category.controller");
const {Get_Category_By_Id} = require("./Category.controller");
const {Change_Category_Status} = require("./Category.controller");
const {Edit_Category} = require("./Category.controller");
const router = require("express").Router();


router.post("/ViewCategory",View_Category);
router.post("/AddCategory",Add_Category);
router.post("/Get_Category_By_Id",Get_Category_By_Id);
router.post("/Change_Category_Status",Change_Category_Status);
router.post("/Edit_Category",Edit_Category);


module.exports = router;