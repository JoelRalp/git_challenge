const fs = require("fs");
const { Console } = require("console");
const { VIEW_NEWSLETTER, ADD_NEWSLETTER, GET_NEWSLETTER_ID, DELETE_NEWSLETTER, CHANGE_NEWSLETTER_STATUS, EDIT_NEWSLETTER, VIEW_IMAGE } = require("./newsletter.service.");
const { makeid, refresh } = require("../Mqtt/server");
const { Verify_Employee } = require("../common.service");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")
const s3w = require("../Aws.s3");
const { COMMON } = require("../WebOrderProduct/weborder.service.");

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
    let imgbucket = [];
    imgbucket.push(req.files.pImage);
    let myFile = (Array.isArray(req.files.pImage)?req.files.pImage:[req.files.pImage]).filter(e=>e);
    console.log(myFile);
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.title) { return res.status(200).json(reqallfeild) }
    else if (!req.body.sub_title) { return res.status(200).json(reqallfeild) }
    else if (!req.body.description) { return res.status(200).json(reqallfeild) }
    else if (!req.body.pStatus) { return res.status(200).json(reqallfeild) }
    else if (!req.files && !req.files.pImage) { return res.status(200).json(reqallfeild) }
   
    Verify_Employee(body, (err, results) => {

      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      if (results) {
        if (results[0].err_id == "-1") {
          return res.status(200).json(apierrmsg);
        }
        else {
          let query = "INSERT INTO tb_newpost(title ,sub_title ,description,pStatus ,created_at ,updated_at) VALUES ('" + req.body.title + "'," +
            "'" + req.body.sub_title + "'," + "'" + req.body.description + "'," + "'" + req.body.pStatus + "'," + "now(),now());";
          body.query = query;
          COMMON(body, (err, results) => {
            if (err) { fatal_error.data = err; return res.json(fatal_error); }
            if (results) {
              let key_id = results.insertId;
              let im_arr = req.files.pImage.length;   
               if(im_arr > 1) {
                let img_tot = imgbucket[0].length;
                let img_key = 0;
                imgbucket[0].forEach(element => {
                 
                  var imgname = makeid(5);
                  s3w.uploadFile(element.data, imgname, (results, err) => {
                    let query = "INSERT INTO newpost_image(pID ,gType ,pImage,piStatus ,created_at ,updated_at) VALUES ('" + key_id + "'," +
                      "'" + "image" + "'," + "'" + results + "'," + "'" + "1" + "'," + "now(),now());";
                    body.query = query;
                    COMMON(body, (err, results) => {
                      if (err) { fatal_error.data = err; return res.json(fatal_error); }
                      img_key++;
                      if (img_key == img_tot) {
                      
                        if (results) {
                          if (results.affectedRows == 1) { inssucess.msg = "Newsletter added sucessfully"; return res.json(inssucess); }
                        }
                      }

                    });

                  });
                });

              }
                else {             
                    var imgname = makeid(5);
                    s3w.uploadFile(req.files.pImage.data, imgname, (results, err) => {
                      let query = "INSERT INTO newpost_image(pID ,gType ,pImage,piStatus ,created_at ,updated_at) VALUES ('" + key_id + "'," +
                        "'" + "image" + "'," + "'" + results + "'," + "'" + "1" + "'," + "now(),now());";
                      body.query = query;
                      COMMON(body, (err, results) => {
                        if (err) { fatal_error.data = err; return res.json(fatal_error); }

                        if (results) {
                          if (results.affectedRows == 1) { inssucess.msg = "Newsletter added sucessfully"; return res.json(inssucess); }
                        }


                      });

                    });    
                }
             



            }

          })
        }
      }
    })




  },
  getNewsLettertId: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    GET_NEWSLETTER_ID(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
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
      if (err) { return res.json(fatal_error); }
      else if (results[0].err_id == '-2') { insfailure.msg = "Invalid Id"; return res.json(insfailure); }
      else if (results[0].err_id == '-1') { return res.json(apierrmsg); }
      else if (results[0].err_id == '1') {
        refresh(); sucess.data = "News letter deleted sucessfully"; return res.json(sucess);
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
    if (!req.body.api_token) { return res.status(200).json(reqallfeild) }
    if (!req.body.id) { return res.status(200).json(reqallfeild) }
    body.query = "Select * from newpost_image where pID = '" + req.body.id + "' and piStatus = '1' order by pID DESC";
    console.log(body.query);
    VIEW_IMAGE(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      if (results.length > 0) {
        { sucess.data = results; return res.json(sucess); }
      }
      else { return res.json(nodatafound); }
    });
  },
  editNewsLetterImage: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.status(200).json(reqallfeild) }
    else if (!req.body.id) { return res.status(200).json(reqallfeild) }
    else if (!req.files || !req.files.pImage) { return res.status(200).json(reqallfeild) }
    Verify_Employee(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      if (results) {
        if (results[0].err_id == "-1") {
          return res.status(200).json(apierrmsg);
        }
        else {
          var imgname = makeid(5);
          s3w.uploadFile(req.files.pImage.data, imgname, (results, err) => {
            body.query = "update newpost_image set pImage = '" + results + "' " + "where id = '" + body.id + "'";
            COMMON(body, (err, results) => {
              if (err) { fatal_error.data = err; return res.json(fatal_error); }
if(results){
  if(results.affectedRows != 0)
  {
    inssucess.msg = "Newletter picture updated successfully!!!!!!"
    return res.json(inssucess);
  }
  else resfailure.msg = "error while updating"; return res.json(resfailure); 
}
            });
          });
        }}
        else{return res.json(apierrmsg); }
    });
  },
}
