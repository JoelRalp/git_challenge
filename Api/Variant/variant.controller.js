

const{ VIEW_VARIANT,ADD_VARIANT,EDIT_VARIANT,GET_VARIANT,CHANGE_VARIANT_STATUS,DELETE_VARIANT} = require("../Variant/variant.service");
const{ refresh} = require("../Mqtt/server");


module.exports = {
 
  viewVarient: (req, res) => {
    const body = req.body;
    let Api_token = body.api_token;
    if (!Api_token) {
      return res.json({
        status: "failure",
        statuscode: "2",
        data: "Required all Fields"
      });
    }

    VIEW_VARIANT(body, (err, results, callback) => {
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
        return res.json({
          status: "success",
          statuscode: "1",
          data: results
        });
      }


    });
  },
  addVariant: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) {
      return res.json({
        status: "failure",
        statuscode: "2",
        data: "Required all Fields"
      });
    }
    else if (!req.body.name) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
   

    ADD_VARIANT(body, (err, results) => {
      if (err) {

        return res.json({
          status: "fatal_error",
          statuscode: "500",
          data: err
        });
      }

      else if (results[0].err_id == 1) {

        refresh();
        return res.json({
          status: "success",
          statuscode: "1",
          msg: "Variation Inserted Successfully..."
        });
      }

      else if (results[0].err_id == -1) {
        return res.json({
          status: "failure",
          statuscode: "4",
          msg: "Invalid Api Token"
        });
      }

      else if (results[0].err_id == -2) {
        return res.json({
          status: "failure",
          statuscode: "2",
          msg: "Variation Name Already Inserted"
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
  editVariant: (req, res) => {
   
    const body = req.body;
    if (!req.body.api_token) {
      return res.json({
        status: "failure",
        statuscode: "2",
        data: "Required all Fields"
      });
    }
    else if (!req.body.name) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.id) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }

    EDIT_VARIANT(body, (err, results) => {

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
          data: "Invalid Variation Id"
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

        refresh();
        return res.json({
          status: "success",
          statuscode: "1",
          data: "Variation updated changed successfully"
        });
      }


    });
  },
  getVariantById: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.editid) { return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required All Field" }) }

    GET_VARIANT(body, (err, results) => {

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
          statuscode: "3",
          msg: "Invalid admin api token"
        });
      }
      else if (results[0].err_id == "-2") {
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


    });
  },
  changeVariantStatus: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.variationid) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.status) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }

    CHANGE_VARIANT_STATUS(body, (err, results) => {

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
          data: "Invalid Variant id"
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
          data: "Variant status changed successfully"
        });
      }


    });
  },
  deleteVaiant: (req, res) => {
    let body = req.body;

    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.deleteid) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }

    DELETE_VARIANT(body, (err, results) => {

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
          data: "Invalid variation id"
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
        refresh();
        return res.json({
          status: "success",
          statuscode: "1",
          data: "Variation deleted successfully"
        });
      }


    });
  },
};

