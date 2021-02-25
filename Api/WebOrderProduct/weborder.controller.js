const fs = require("fs");
const { Console } = require("console");
const { VIEW_WEBORDER,ADD_WEBORDER_PRODUCT,GET_WEBORDER_PRODUCT_ID,DELETE_WEBORDER_PRODUCT,CHANGE_WEBORDER_PRODUCT_STATUS,EDIT_WEBORDER_PRODUCT} = require("./weborder.service.");
const { makeid, refresh } = require("../Mqtt/server");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")


module.exports = {
  viewWebOrder: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    VIEW_WEBORDER(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  addWebOrder: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.name) { return res.status(200).json(reqallfeild) }
    else if (!req.files.image) { return res.status(200).json(reqallfeild) }
    else if (!req.body.description) { return res.status(200).json(reqallfeild) }
    else if (!req.body.cateID) { return res.status(200).json(reqallfeild) }
    else if (!req.body.stock_status) { return res.status(200).json(reqallfeild) } 
    else if (!req.body.webcateid) { return res.status(200).json(reqallfeild) }
    else if (!req.body.price) { return res.status(200).json(reqallfeild) }
    else if (!req.body.addon) { return res.status(200).json(reqallfeild) }
    else if (!req.body.quantity) { return res.status(200).json(reqallfeild) }
    var imgname = makeid(5);
    ADD_WEBORDER_PRODUCT(body, imgname, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
        fs.writeFileSync("Api\\Images\\Weborder\\" + imgname + ".png", req.files.image.data);
        refresh();
        inssucess.msg = "Web order product added sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Web order product name already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
  getWebOrderProductId: (req, res) => {
    let body = req.body;
    let price = "";
    let webcateID = "";
   let  addon_name = "";
   let addon_quantity = "";
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    GET_WEBORDER_PRODUCT_ID(body, (err, results) => {
       results.forEach(element => { 
        price += element.price + ",";
        webcateID += element.name + ","
        addon_name += element.addon_name + ",";
        addon_quantity += element.addon_value + ",";
      }); 
      results[0].price = price.slice(0, -1);
      results[0].name = webcateID.slice(0, -1);
      results[0].addon_name = addon_name.slice(0, -1);
      results[0].addon_value = addon_quantity.slice(0, -1);
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else if (results[0].err_id == "-2") { return res.json(nodatafound); }
      else { sucess.data = results[0]; return res.json(sucess); }
    });
  },
  deleteWebOrderProduct: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.deleteid) { return res.status(200).json(reqallfeild) }
    DELETE_WEBORDER_PRODUCT(body, (err, results) => {
      fatal_error.data = err;
      if (err) {return res.json(fatal_error);}
      else if (results[0].err_id == '-2') {insfailure.msg = "Invalid Id";return res.json(insfailure);}
      else if (results[0].err_id == '-1') {return res.json(apierrmsg);}
      else if (results[0].err_id == '1') {refresh();sucess.data="Table Product deleted sucessfully";return res.json(sucess);
      }
    });
  },
  changeWebOrderProductTableStatus: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.productid) { return res.status(200).json(reqallfeild) }
    else if (!req.body.status) { return res.status(200).json(reqallfeild) }
    CHANGE_WEBORDER_PRODUCT_STATUS(body, (err, results) => {
      if (err) { return res.json(fatal_error); }
      else if (results[0].err_id == '-2') { nodatafound.data = "Invalid table Id"; return res.json(nodatafound); }
      else if (results[0].err_id == '-1') { return res.json(apierrmsg); }
      else if (results[0].err_id == '1') { sucess.data = "Product status changed successfully"; return res.json(sucess); }
    });
  },
  editWebOrderProduct: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.name) { return res.status(200).json(reqallfeild) }
    else if (!req.files.image) { return res.status(200).json(reqallfeild) }
    else if (!req.body.description) { return res.status(200).json(reqallfeild) }
    else if (!req.body.cateID) { return res.status(200).json(reqallfeild) }
    else if (!req.body.stock_status) { return res.status(200).json(reqallfeild) } 
    else if (!req.body.webcateid) { return res.status(200).json(reqallfeild) }
    else if (!req.body.price) { return res.status(200).json(reqallfeild) }
    else if (!req.body.addon) { return res.status(200).json(reqallfeild) }
    else if (!req.body.quantity) { return res.status(200).json(reqallfeild) }
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    var imgname = makeid(5);
    EDIT_WEBORDER_PRODUCT(body, imgname, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
        fs.writeFileSync("Api\\Images\\Weborder\\" + imgname + ".png", req.files.image.data);
        refresh();
        inssucess.msg = "Web order product updated sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Web order product name already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
}
