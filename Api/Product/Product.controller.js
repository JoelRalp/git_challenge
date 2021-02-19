

const { VIEW_PRODUCT } = require("../Product/Product.service");
const { ADD_PRODUCT } = require("../Product/Product.service");
const { GET_PRODUCT_BY_ID } = require("../Product/Product.service");
const { CHANGE_PRODUCT_STATUS } = require("../Product/Product.service");
const { EDIT_PRODUCT } = require("../Product/Product.service");
const { DELETE_PRODUCT } = require("../Product/Product.service");
const { refresh } = require("../Mqtt/server");

const fs = require("fs");
const { Console } = require("console");
var mqtt = require('mqtt');


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
  Add_Product: (req, res) => {
    let body = req;
    if (!req.body.product_name) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.product_sku) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.product_category) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.product_cost) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.files.pImage) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    var imgname = makeid(5);
    fs.writeFileSync("Api\\Images\\ProductImages\\" + imgname + ".png", body.files.pImage.data);

    ADD_PRODUCT(body, imgname, (err, results) => {

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