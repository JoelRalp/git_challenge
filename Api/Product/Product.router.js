
const {View_Product} = require("./Product.controller");
const {Add_Product} = require("./Product.controller");
const {Get_Product_By_Id} = require("./Product.controller");
const {Change_Product_Status} = require("./Product.controller");
const {Edit_Product} = require("./Product.controller");
const {Delete_Product} = require("./Product.controller");
const router = require("express").Router();


router.post("/ViewProduct",View_Product);
router.post("/AddProduct",Add_Product);
router.post("/Get_product_by_id",Get_Product_By_Id);
router.post("/Change_Product_Status",Change_Product_Status);
router.post("/Edit_Product",Edit_Product);
router.post("/Delete_Product",Delete_Product);



module.exports = router;