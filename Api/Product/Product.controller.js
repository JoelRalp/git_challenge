

const { VIEW_PRODUCT } = require("../Product/Product.service");
const { ADD_PRODUCT } = require("../Product/Product.service");
const { GET_PRODUCT_BY_ID } = require("../Product/Product.service");
const { CHANGE_PRODUCT_STATUS } = require("../Product/Product.service");
const { EDIT_PRODUCT } = require("../Product/Product.service");
const { DELETE_PRODUCT,VIEW_PRODUCT_IMAGE,ADD_PRODUCT_IMAGE,EDIT_PRODUCT_IMAGE,DELETE_PRODUCT_IMAGE } = require("../Product/Product.service");
const { refresh } = require("../Mqtt/server");
const s3w = require("../Aws.s3");
const fs = require("fs");
const { Console } = require("console");
var mqtt = require('mqtt');
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")

module.exports = {

  View_Product: (req, res) => {
    const body = req.body;
    let Api_token = body.api_token;
    if (!Api_token) {
      return res.json({
        status: "failure",
        statuscode: "2",
        data: "Required all Fields"
      });
    }

    VIEW_PRODUCT(body, (err, results, callback) => {
      if (err) {

        return res.json({
          status: "fatal_error",
          statuscode: "500",
          data: err
        });
      }
if(results.length >0){
  if (results[0].err_id == "-1") {
    return res.json({
      status: "failure",
      statuscode: "4",
      msg: "Invalid admin api token."
    });
  }

  else {
    refresh();
    return res.json({
      status: "success",
      statuscode: "1",
      data: results
    });
  }
}
else{
  return res.json(
    nodatafound
  );
}
     


    });
  },
  Add_Product: (req, res) => {
    let body = req;
    if (!req.body.product_name) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.product_sku) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.product_category) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.product_cost) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.files.pImage) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    var imgname = makeid(5);
    s3w.uploadFile (req.files.pImage.data, imgname, (results, err) => {
      if (results) {
        ADD_PRODUCT(body, results, (err, results) => {

          if (err) {
    
            return res.json({
              status: "fatal_error",
              statuscode: "500",
              data: err
            });
          }
    
          else if (results[0].err_id == 1) {
    
            return res.json({
              status: "success",
              statuscode: "1",
              msg: "Product Insert Successfully..."
            });
          }
    
          else if (results[0].err_id == -2) {
            return res.json({
              status: "failure",
              statuscode: "2",
              msg: "Product Name Already Inserted"
            });
          }
          else if (results[0].err_id == -1) {
            return res.json({
              status: "failure",
              statuscode: "2",
              msg: "Invalid Api token."
            });
          }
          else {
            return res.json({
              status: "failure",
              statuscode: "420",
              data: results
            });
          }
    
    
        });
      }
      else {
        throw err;
      }
    });
   
  },
  Get_Product_By_Id: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.editid) { return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required All Field" }) }

    GET_PRODUCT_BY_ID(body, (err, results) => {

      if (err) {

        return res.json({
          status: "fatal_error",
          statuscode: "500",
          data: err
        });
      }
      else {
        if (results[0].err_id == -1) {
          return res.json({
            status: "failure",
            statuscode: "3",
            msg: "Invalid admin api token"
          });
        }
        else if (results[0].err_id == -2) {
          return res.json({
            status: "failure",
            statuscode: "3",
            data: "No data found"
          });
        }
        else {
          return res.json({
            status: "success",
            statuscode: "1",
            data: results
          });
        }
      }

    });
  },
  Change_Product_Status: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.productid) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.status) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }

    CHANGE_PRODUCT_STATUS(body, (err, results) => {

      if (err) {

        return res.json({
          status: "fatal_error",
          statuscode: "500",
          data: err
        });
      }
      else if (results[0].err_id == '-2') {
        return res.json({
          status: "failure",
          statuscode: "3",
          data: "Invalid product id"
        });
      }

      else if (results[0].err_id == '-1') {
        return res.json({
          status: "failure",
          statuscode: "3",
          msg: "Invalid admin api token"
        });
      }
      else if (results[0].err_id == '1') {
        return res.json({
          status: "success",
          statuscode: "1",
          data: "Product status changed successfully"
        });
      }


    });
  },
  Edit_Product: (req, res) => {

    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.product_name) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.product_sku) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.product_category) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.product_cost) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }

    EDIT_PRODUCT(body, (err, results) => {

      if (err) {

        return res.json({
          status: "fatal_error",
          statuscode: "500",
          data: err
        });
      }
      else if (results[0].err_id == '-2') {
        return res.json({
          status: "failure",
          statuscode: "3",
          data: "Product sku already inserted"
        });
      }

      else if (results[0].err_id == '-1') {
        return res.json({
          status: "failure",
          statuscode: "3",
          msg: "Invalid admin api token"
        });
      }
      else if (results[0].err_id == '1') {
        return res.json({
          status: "success",
          statuscode: "1",
          data: "Product updated successfully"
        });
      }


    });
  },
  Delete_Product: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.id) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }

    DELETE_PRODUCT(body, (err, results) => {

      if (err) {

        return res.json({
          status: "fatal_error",
          statuscode: "500",
          data: err
        });
      }
      else if (results[0].err_id == '-2') {
        return res.json({
          status: "failure",
          statuscode: "3",
          data: "Invalid product id"
        });
      }

      else if (results[0].err_id == '-1') {
        return res.json({
          status: "failure",
          statuscode: "3",
          msg: "Invalid admin api token"
        });
      }
      else if (results[0].err_id == '1') {
        return res.json({
          status: "success",
          statuscode: "1",
          data: "Product deleted successfully"
        });
      }


    });
  },
  View_Product_Image: (req, res) => {
    const body = req.body;
    let Api_token = body.api_token;
    let productid = body.productid;
    if (!Api_token) {
      return res.json({
        status: "failure",
        statuscode: "2",
        data: "Required all Fields"
      });
    }
else if(!productid){
  return res.json({
    status: "failure",
    statuscode: "2",
    data: "Required all Fields"
  });
}
VIEW_PRODUCT_IMAGE(body, (err, results, callback) => {
      if (err) {({
          status: "fatal_error",
          statuscode: "500",
          data: err
        });
      }
      else if (results[0].err_id == "-1") {
        return res.json({
          status: "failure",
          statuscode: "4",
          msg: "Invalid admin api token."
        });
      }
      else {
        refresh();
        return res.json({
          status: "success",
          statuscode: "1",
          data: results
        });
      }
    });
  },
  Add_Product_Image: (req, res) => {
    let body = req.body;
    console.log(body);
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.id) { return res.status(200).json(reqallfeild) }
    else if (!req.files || !req.files.pImage) { return res.status(200).json(reqallfeild) }
    console.log(req.body.id);
    var imgname = makeid(5);
    s3w.uploadFile (req.files.pImage.data,imgname,(results, err) => {
      if (results) {
        ADD_PRODUCT_IMAGE(body,results,(err,results) => {
          if (err) {fatal_error = fatal_error.data = err; return res.json(fatal_error);}
          else if (results[0].err_id == 1) {
    
            return res.json({
              status: "success",
              statuscode: "1",
              msg: "Product Insert Successfully..."
            });
          }
    
          else if (results[0].err_id == -2) {
            return res.json({
              status: "failure",
              statuscode: "2",
              msg: "Product Name Already Inserted"
            });
          }
          else if (results[0].err_id == -1) {
            return res.json({
              status: "failure",
              statuscode: "2",
              msg: "Invalid Api token."
            });
          }
          else {
            return res.json({
              status: "failure",
              statuscode: "420",
              data: results
            });
          }
    
    
        });
      }
      else {
        throw err;
      }
    });
   
  },
  Edit_Product_Image: (req, res) => {
    let body = req.body;
    
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.id) { return res.status(200).json(reqallfeild) }
    else if (!req.files || !req.files.pImage) { return res.json({
      status: "success",
      statuscode: "1",
      msg: "Product Updated Successfully..."
    });
   }
    var imgname = makeid(5);
    s3w.uploadFile (req.files.pImage.data,imgname,(results, err) => {
      if (results) {
        EDIT_PRODUCT_IMAGE(body,results,(err,results) => {
          if (err) {fatal_error = fatal_error.data = err; return res.json(fatal_error);}
          else if (results[0].err_id == 1) {
    
            return res.json({
              status: "success",
              statuscode: "1",
              msg: "Product Updated Successfully..."
            });
          }
    
          else if (results[0].err_id == -2) {
            return res.json({
              status: "failure",
              statuscode: "2",
              msg: "Product Sku Already Inserted"
            });
          }
          else if (results[0].err_id == -1) {
            return res.json({
              status: "failure",
              statuscode: "2",
              msg: "Invalid Api token."
            });
          }
          else {
            return res.json({
              status: "failure",
              statuscode: "420",
              data: results
            });
          }
    
    
        });
      }
      else {
        throw err;
      }
    });
   
  },
  Delete_Product_Image: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.id) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }

    DELETE_PRODUCT_IMAGE(body, (err, results) => {

      if (err) {

        return res.json({
          status: "fatal_error",
          statuscode: "500",
          data: err
        });
      }
      else if (results[0].err_id == '-2') {
        return res.json({
          status: "failure",
          statuscode: "3",
          data: "Invalid product id"
        });
      }

      else if (results[0].err_id == '-1') {
        return res.json({
          status: "failure",
          statuscode: "3",
          msg: "Invalid admin api token"
        });
      }
      else if (results[0].err_id == '1') {
        return res.json({
          status: "success",
          statuscode: "1",
          data: "Product Image deleted successfully"
        });
      }


    });
  },
};
function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}