const fs = require("fs");
const { Console } = require("console");
const { VIEW_OUTLET } = require("../Outlet/outlet.service");
const { ADD_OUTLET } = require("../Outlet/outlet.service");
const { EDIT_OUTLET } = require("../Outlet/outlet.service");
const { DELETE_OUTLET } = require("../Outlet/outlet.service");
const { GET_OUTLET_ID } = require("../Outlet/outlet.service");
const { CHANGE_OUTLET_STATUS } = require("../Outlet/outlet.service");
const s3w = require("../Aws.s3");
const { makeid, refresh } = require("../Mqtt/server");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

module.exports = {

  viewOutlet: (req, res) => {
    const body = req.body;


    VIEW_OUTLET(body, (err, results) => {

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
          msg: "Incorrect Api."
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
  addOutlet: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) {return res.json({status: "failure",statuscode: "2",data: "Required all Fields"});}
    else if (!req.body.outlet_name) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.phone) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.email) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.address) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.coordinates) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.work_hour) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.files.out_image) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    var imgname = makeid(5);
   
    s3w.uploadFile (req.files.out_image.data,imgname,(results, err) => {
      ADD_OUTLET(body, results, (err, results) => {
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
            msg: "Outlet Insert Successfully..."
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
            msg: "Outlet Name Already Inserted"
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
    });
    

    
  },
  getOutletById: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.editid) { return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required All Field" }) }

    GET_OUTLET_ID(body, (err, results) => {

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
  changeOutletStatus: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.outletid) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.status) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }

    CHANGE_OUTLET_STATUS(body, (err, results) => {

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
          data: "Invalid Outlet id"
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
          data: "Outlet status changed"
        });
      }


    });
  },
  editOutlet: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.id) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.outlet_name) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.phone) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.email) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.address) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.work_hour) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.files || !req.files.out_image) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.coordinates) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.outStatus) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }

    var imgname = makeid(5);
    var path = s3w.uploadFile(req.files.out_image.data,imgname);
       
    EDIT_OUTLET(body, path, (err, results) => {

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
          data: "Outlet Name Aready Exists"
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
          data: "Outlet updated successfully"
        });
      }


    });
  },
  deleteOutlet: (req, res) => {
    console.log("in");  
    let body = req.body;

    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.id) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }

    DELETE_OUTLET(body, (err, results) => {

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
          data: "Invalid outlet id"
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
          data: "outlet deleted successfully"
        });
      }


    });
  },



}
