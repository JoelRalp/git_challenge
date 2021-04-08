const fs = require("fs");
const { Console } = require("console");
const { VIEW_BETA_CATEGORY,ADD_BETA_CATEGORY,GET_BETA_CATEGORY,CHANGE_BETA_CATEGORY_STATUS,DELETE_BETA_CATEGORY,EDIT_BETA_CATEGORY,VIEW_BETA_PRODUCT,ADD_BETA_PRODUCT,GET_BETA_PRODUCT,CHANGE_BETA_PRODUCT,DELETE_BETA_PRODUCT,EDIT_BETA_PRODUCT,VIEW_BETA_SUBPRODUCT,ADD_BETA_SUBPRODUCT,GET_BETA_SUBPRODUCT,CHANGE_BETA_SUBPRODUCT,DELETE_BETA_SUBPRODUCT,EDIT_BETA_SUBPRODUCT} = require("./beta.service.");
const { makeid, refresh } = require("../Mqtt/server");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")


module.exports = {
  viewBetaCategory: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) {  return res.json(apierrmsg) }
    VIEW_BETA_CATEGORY(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  addBetaCategory: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.name) { return res.status(200).json(reqallfeild) }
    else if (!(req.files && req.files.image)) { return res.status(200).json(reqallfeild) }
    else if (!req.body.orderBy) { return res.status(200).json(reqallfeild) }
   
    var imgname = makeid(5);
    ADD_BETA_CATEGORY(body, imgname, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
        fs.writeFileSync("Api\\Images\\Betacategory\\" + imgname + ".png", req.files.image.data);
        refresh();
        inssucess.msg = "Category added sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Category name already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
  getBetaCategory: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    if (!req.body.id) { reqallfeild }
    GET_BETA_CATEGORY(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else if (results[0].err_id == "-2") { return res.json(nodatafound); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  changeBetaCategoryStatus: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    if (!req.body.id) { reqallfeild }
    CHANGE_BETA_CATEGORY_STATUS(body,(err, results) => {
      if (err) { return res.json(fatal_error); }
      else if (results[0].err_id == '-2') { nodatafound.data = "Invalid  Id"; return res.json(nodatafound); }
      else if (results[0].err_id == '-1') { return res.json(apierrmsg); }
      else if (results[0].err_id == '1') { sucess.data = "Category status changed successfully"; return res.json(sucess); }
    });
  },
  deleteBetaCategory: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg); }
    else if (!req.body.deleteid) { return res.status(200).json(reqallfeild); }
    DELETE_BETA_CATEGORY(body,(err, results) => {
      fatal_error.data = err;
      if (err) { return res.json(fatal_error); }
      else if (results[0].err_id == '-2') { insfailure.msg = "Invalid Id"; return res.json(insfailure); }
      else if (results[0].err_id == '-1') { return res.json(apierrmsg); }
      else if (results[0].err_id == '1') {
        refresh(); sucess.data = "Category deleted sucessfully"; return res.json(sucess);
      }
    });
  },
  editBetaCategory: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.name) { return res.status(200).json(reqallfeild) }
    else if (!(req.files && req.files.image)) { return res.status(200).json(reqallfeild) }
    else if (!req.body.orderBy) { return res.status(200).json(reqallfeild) }
    else if (!req.body.editId) { return res.status(200).json(reqallfeild) }
   
    var imgname = makeid(5);
    EDIT_BETA_CATEGORY(body, imgname, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
        fs.writeFileSync("Api\\Images\\Betacategory\\" + imgname + ".png", req.files.image.data);
        refresh();
        inssucess.msg = "Category updated sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Category name already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
  viewBetaProduct: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    VIEW_BETA_PRODUCT(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  addBetaProduct: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.cateName) { return res.status(200).json(reqallfeild) }
    else if (!req.body.subcateName) { return res.status(200).json(reqallfeild) }
    else if (!req.body.productName) { return res.status(200).json(reqallfeild) }
    else if (!req.body.sku) { return res.status(200).json(reqallfeild) }
    else if (!req.body.cost) { return res.status(200).json(reqallfeild) }
    else if (!req.body.sellingPrice) { return res.status(200).json(reqallfeild) }
    else if (!req.body.type) { return res.status(200).json(reqallfeild) }
    else if (!req.body.status) { return res.status(200).json(reqallfeild) }
    ADD_BETA_PRODUCT(body,(err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
        refresh();
        inssucess.msg = "Product added sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Product name already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
  getBetaProduct: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    if (!req.body.id) { reqallfeild }
    GET_BETA_PRODUCT(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else if (results[0].err_id == "-2") { return res.json(nodatafound); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  changeBetaProductStatus: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    if (!req.body.id) { reqallfeild }
    CHANGE_BETA_PRODUCT(body,(err, results) => {
      if (err) { return res.json(fatal_error); }
      else if (results[0].err_id == '-2') { nodatafound.data = "Invalid  Id"; return res.json(nodatafound); }
      else if (results[0].err_id == '-1') { return res.json(apierrmsg); }
      else if (results[0].err_id == '1') { sucess.data = "Product status changed successfully"; return res.json(sucess); }
    });
  },
  deleteBetaProduct: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg); }
    else if (!req.body.deleteid) { return res.status(200).json(reqallfeild); }
    DELETE_BETA_PRODUCT(body,(err, results) => {
      fatal_error.data = err;
      if (err) { return res.json(fatal_error); }
      else if (results[0].err_id == '-2') { insfailure.msg = "Invalid Id"; return res.json(insfailure); }
      else if (results[0].err_id == '-1') { return res.json(apierrmsg); }
      else if (results[0].err_id == '1') {
        refresh(); sucess.data = "Product deleted sucessfully"; return res.json(sucess);
      }
    });
  },
  editBetaProduct: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.cateName) { return res.status(200).json(reqallfeild) }
    else if (!req.body.subcateName) { return res.status(200).json(reqallfeild) }
    else if (!req.body.productName) { return res.status(200).json(reqallfeild) }
    else if (!req.body.sku) { return res.status(200).json(reqallfeild) }
    else if (!req.body.cost) { return res.status(200).json(reqallfeild) }
    else if (!req.body.sellingPrice) { return res.status(200).json(reqallfeild) }
    else if (!req.body.type) { return res.status(200).json(reqallfeild) }
    else if (!req.body.status) { return res.status(200).json(reqallfeild) }
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    
    EDIT_BETA_PRODUCT(body,(err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
        refresh();
        inssucess.msg = "Product updated sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Product name already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
  viewBetaSubProduct: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    VIEW_BETA_SUBPRODUCT(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  addBetaSubProduct: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.cateName) { return res.status(200).json(reqallfeild) }
    else if (!req.body.subName) { return res.status(200).json(reqallfeild) }
    else if (!req.body.orderBy) { return res.status(200).json(reqallfeild) }
    ADD_BETA_SUBPRODUCT(body,(err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
        refresh();
        inssucess.msg = "Sub Product added sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Sub Product already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
  getBetaSubProduct: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    if (!req.body.id) { reqallfeild }
    GET_BETA_SUBPRODUCT(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else if (results[0].err_id == "-2") { return res.json(nodatafound); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  changeBetaSubProductStatus: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    if (!req.body.id) { reqallfeild }
    CHANGE_BETA_SUBPRODUCT(body,(err, results) => {
      if (err) { return res.json(fatal_error); }
      else if (results[0].err_id == '-2') { nodatafound.data = "Invalid  Id"; return res.json(nodatafound); }
      else if (results[0].err_id == '-1') { return res.json(apierrmsg); }
      else if (results[0].err_id == '1') { sucess.data = "Sub Product status changed successfully"; return res.json(sucess); }
    });
  },
  deleteBetaSubProduct: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg); }
    else if (!req.body.deleteid) { return res.status(200).json(reqallfeild); }
    DELETE_BETA_SUBPRODUCT(body,(err, results) => {
      fatal_error.data = err;
      if (err) { return res.json(fatal_error); }
      else if (results[0].err_id == '-2') { insfailure.msg = "Invalid Id"; return res.json(insfailure); }
      else if (results[0].err_id == '-1') { return res.json(apierrmsg); }
      else if (results[0].err_id == '1') {
        refresh(); sucess.data = "Sub Product deleted sucessfully"; return res.json(sucess);
      }
    });
  },
  editBetaSubProduct: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.cateName) { return res.status(200).json(reqallfeild) }
    else if (!req.body.subName) { return res.status(200).json(reqallfeild) }
    else if (!req.body.orderBy) { return res.status(200).json(reqallfeild) }
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    
    EDIT_BETA_SUBPRODUCT(body,(err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
        refresh();
        inssucess.msg = "Sub Product updated sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Sub Product name already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  }
}
