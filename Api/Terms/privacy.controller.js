const fs = require("fs");
const { Console } = require("console");
const {ADD_TERMS,VIEW_TERMS} = require("./privacy.service.");
const { makeid, refresh } = require("../Mqtt/server");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")


module.exports = {
  viewTerms: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    VIEW_TERMS(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  addTerms: (req, res) => {
    const body = req.body;
         if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
         else if (!req.body.description) { return res.status(200).json(reqallfeild) }
       
         ADD_TERMS(body, (err, results) => {
          if (err) { fatal_error.data = err; return res.json(fatal_error); }
          else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
          else { sucess.data = results; return res.json(sucess); }
        });
  }
}
