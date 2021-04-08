const fs = require("fs");
const { Console } = require("console");
const {ADD_PRIVACY,VIEW_PRIVACY,ADD_TERMS,VIEW_TERMS,VIEW_POS,EDIT_POS,VIEW_MEMBERCARD,GET_MEMBERCARD_ID,EDIT_MEMBERCARD,GET_POINTS_ID,VIEW_POINTS,ADD_POINTS,EDIT_POINTS} = require("./settings.service.");
const { makeid, refresh } = require("../Mqtt/server");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service");



module.exports = {
  viewPrivacy: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    VIEW_PRIVACY(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  addPrivacy: (req, res) => {
    const body = req.body;
         if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
         else if (!req.body.description) { return res.status(200).json(reqallfeild) }
       
         ADD_PRIVACY(body, (err, results) => {
           console.log(results);
          if (err) { fatal_error.data = err; return res.json(fatal_error); }
          else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
          else { sucess.data = results; return res.json(sucess); }
        });
  },
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
  },
  viewPos: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    if (!req.body.id) { reqallfeild }
    VIEW_POS(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else if (results[0].err_id == "-2") { return res.json(nodatafound); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  editPos: (req, res) => {
    console.log("in");
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }//
    else if (!req.body.companyname) { return res.status(200).json(reqallfeild ) }//
    else if (!req.body.phone) { return res.status(200).json(reqallfeild )  }//
    else if (!req.body.currency) { return res.status(200).json(reqallfeild )  }//
    else if (!req.body.receiptheader) { return res.status(200).json(reqallfeild ) }//
    else if (!req.body.receiptfooter) { return res.status(200).json(reqallfeild ) }//
    else if (!req.body.default_tax) { return res.status(200).json(reqallfeild ) }//
    else if (!req.body.service_tax) { return res.status(200).json(reqallfeild ) }//
    else if (!req.body.discount) { return res.status(200).json(reqallfeild ) }//
    else if (!req.body.decimals) { return res.status(200).json(reqallfeild ) }//
    else if (!req.body.editid) { return res.status(200).json(reqallfeild ) }//
    EDIT_POS(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
        refresh();
        inssucess.msg = "Category updated sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Category name already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
  viewMemberCard: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    if (!req.body.id) { reqallfeild }
    VIEW_MEMBERCARD(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else if (results[0].err_id == "-2") { return res.json(nodatafound); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  getMemberCardId: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    GET_MEMBERCARD_ID(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else if (results[0].err_id == "-2") { return res.json(nodatafound); }
      else { sucess.data = results[0]; return res.json(sucess); }
    });
  },
  editMembercard: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    else if (!(req.files && req.files.mImage)) { return res.status(200).json(reqallfeild) }
    else if (!req.body.status) { return res.status(200).json(reqallfeild) }
    var imgname = makeid(5);
    EDIT_MEMBERCARD(body, imgname, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
        fs.writeFileSync("Api\\Images\\Logo\\" + imgname + ".png", req.files.mImage.data);
        refresh();
        inssucess.msg = "Member card updated sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Member card already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
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
         else if (!req.body.point) { return res.status(200).json(reqallfeild) }
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
