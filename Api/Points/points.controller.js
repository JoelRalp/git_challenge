const fs = require("fs");
const { Console } = require("console");
const {ADD_POINTS,VIEW_POINTS,EDIT_POINTS,GET_POINTS_ID} = require("./points.service.");
const { makeid, refresh } = require("../Mqtt/server");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")


module.exports = {
  viewPoints: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    VIEW_POINTS(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  addPoints: (req, res) => {
    const body = req.body;
         if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
         else if (!req.body.name) { return res.status(200).json(reqallfeild) }
         else if (!req.body.no_rm) { return res.status(200).json(reqallfeild) }
         else if (!req.body.rate_others) { return res.status(200).json(reqallfeild) }
         else if (!req.body.rate_ewallet) { return res.status(200).json(reqallfeild) }
         else if (!req.body.points) { return res.status(200).json(reqallfeild) }
    ADD_POINTS(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {    
        refresh();
        inssucess.msg = "Table inserted sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Table number already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
  getPointsId: (req, res) => {
    let body = req.body;
         if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
         else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    GET_POINTS_ID(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else if (results[0].err_id == "-2") { return res.json(nodatafound); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  
  editPoints: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
         else if (!req.body.name) { return res.status(200).json(reqallfeild) }
         else if (!req.body.no_rm) { return res.status(200).json(reqallfeild) }
         else if (!req.body.rate_others) { return res.status(200).json(reqallfeild) }
         else if (!req.body.rate_ewallet) { return res.status(200).json(reqallfeild) }
         else if (!req.body.points) { return res.status(200).json(reqallfeild) }
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    EDIT_POINTS(body, (err, results) => {
      
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {    
        refresh();
        inssucess.msg = "Table inserted sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Table name already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  }
}
