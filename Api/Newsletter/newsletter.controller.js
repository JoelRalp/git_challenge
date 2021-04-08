const fs = require("fs");
const { Console } = require("console");
const { VIEW_NEWSLETTER,ADD_NEWSLETTER,GET_NEWSLETTER_ID,DELETE_NEWSLETTER,CHANGE_NEWSLETTER_STATUS,EDIT_NEWSLETTER,VIEW_IMAGE} = require("./newsletter.service.");
const { makeid, refresh } = require("../Mqtt/server");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")
const s3w = require("../Aws.s3");

module.exports = {
  viewNewsLetter: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    VIEW_NEWSLETTER(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  addNewsLetter: (req, res) => {
    const body = req.body;
    let images = req.files.pImage;
    let i = 0;
    let j = -1;
    let keys = 0;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.title) { return res.status(200).json(reqallfeild) }
    else if (!req.body.sub_title) { return res.status(200).json(reqallfeild) }
    else if (!req.body.description) { return res.status(200).json(reqallfeild) }
    else if (!req.body.pStatus) { return res.status(200).json(reqallfeild) } 
    else if (!req.files && req.files.pImage) { return res.status(200).json(reqallfeild) } 
   if(req.files.pImage.length > 1) {
    images.forEach(element => {
      j++;
      var imgname = makeid(5);
     s3w.uploadFile (element.data,imgname,(results, err) => {
if(j >1){
keys = 1
}
        if (results) {
         let path = results;
            ADD_NEWSLETTER(body,path,keys,(err, results) => {
              i++;
              if(i == req.files.pImage.length)
              {
                if (err) { fatal_error.data = err; return res.json(fatal_error); }
                else if(results[0].err_id == "-2"){insfailure.msg = "Newsletter title already inserted"; return res.json(insfailure);}
                else if (results[0].err_id == '1') { sucess.data = "Newsletter inserted successfully"; return res.json(sucess); }
              }
           });
          
        }
        else {
          throw err;
        }
      });
    });
   }
   else{
    
      var imgname = makeid(5);
     s3w.uploadFile (req.files.pImage.data,imgname, (results, err) => {
        if (results) {
         let path = results;
            ADD_NEWSLETTER(body,path,keys,(err, results) => {
             
            if (err) { fatal_error.data = err; return res.json(fatal_error); }
            else if(results[0].err_id == "-2"){insfailure.msg = "Newsletter title already inserted"; return res.json(insfailure);}
            else if (results[0].err_id == '1') { sucess.data = "Newsletter inserted successfully"; return res.json(sucess); }
           });
          
        }
        else {
          throw err;
        }
      });
   
   }
  
  
  },
  getNewsLettertId: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    GET_NEWSLETTER_ID(body, (err, results) => {
      if (err){ fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else if (results[0].err_id == "-2") { return res.json(nodatafound); }
      else { sucess.data = results[0]; return res.json(sucess); }
    });
  },
  deleteNewsLettertId: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.deleteid) { return res.status(200).json(reqallfeild) }
    DELETE_NEWSLETTER(body, (err, results) => {
      fatal_error.data = err;
      if (err) {return res.json(fatal_error);}
      else if (results[0].err_id == '-2') {insfailure.msg = "Invalid Id";return res.json(insfailure);}
      else if (results[0].err_id == '-1') {return res.json(apierrmsg);}
      else if (results[0].err_id == '1') {refresh();sucess.data="News letter deleted sucessfully";return res.json(sucess);
      }
    });
  },
  changeNewsLettertStatus: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.newsid) { return res.status(200).json(reqallfeild) }
    else if (!req.body.status) { return res.status(200).json(reqallfeild) }
    CHANGE_NEWSLETTER_STATUS(body, (err, results) => {
      if (err) { return res.json(fatal_error); }
      else if (results[0].err_id == '-2') { nodatafound.data = "Invalid News letter Id"; return res.json(nodatafound); }
      else if (results[0].err_id == '-1') { return res.json(apierrmsg); }
      else if (results[0].err_id == '1') { sucess.data = "News letter changed successfully"; return res.json(sucess); }
    });
  },
  editnewsletter: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.title) { return res.status(200).json(reqallfeild) }
    else if (!req.body.sub_title) { return res.status(200).json(reqallfeild) }
    else if (!req.body.description) { return res.status(200).json(reqallfeild) }
    else if (!req.body.pStatus) { return res.status(200).json(reqallfeild) } 
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    
    EDIT_NEWSLETTER(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
        refresh();
        inssucess.msg = "Newsletter updated sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Newsletter already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
  viewNewsLetterImage: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    if (!req.body.id) { reqallfeild }
    body.query = 'Select a.pImage,a.pID from newpost_image a inner join tb_newpost b on a.pID = b.id where id = ' + " '" + body.id + "'" ;
    ;
    VIEW_IMAGE(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
     if(results.length > 0){
      { sucess.data = results; return res.json(sucess); }
     }
     else{ return res.json(nodatafound);}
    });
  },
}
