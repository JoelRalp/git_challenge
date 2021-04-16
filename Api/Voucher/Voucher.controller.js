

const { VIEW_VOUCHER } = require("../Voucher/Voucher.service");
const { ADD_VOUCHER } = require("../Voucher/Voucher.service");
const { GET_VOUCHER_BY_ID } = require("../Voucher/Voucher.service");
const { CHANGE_VOUCHER_STATUS } = require("../Voucher/Voucher.service");
const { EDIT_VOUCHER } = require("../Voucher/Voucher.service");
const { DELETE_PRODUCT, COMMON } = require("../Voucher/Voucher.service");
var s3w = require("../Aws.s3")
const fs = require("fs");
const ASYNC = require('async');
const { Console } = require("console");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")
module.exports = {

  View_Voucher: async(req, res) => {
    const body = req.body;
    let Api_token = body.api_token;
    let currDate = new Date();
    let cate = "";
    let total_json = []; 
    if (!Api_token) {
      return res.json({
        status: "failure",
        statuscode: "2",
        data: "Required all Fields"
      });
    }
    if (!body.flag) { { return res.status(200).json(reqallfeild) } }
    if (body.flag) {
      if (body.flag == 'all') {
        let query = "select tb.*  from tb_voucher as tb where tb.vStatus = '1' or tb.vStatus = '0' and tb.discount_type = 'Default' and  tb.cateID != '1' order by id DESC"
        body.query = query;
      COMMON(body,(err, results) => {
  
          if (err) { fatal_error.data = err; return res.json(fatal_error); }
          if (results) {
            if (results.length > 0) {
              try{
                results.forEach(element => {
                  
                  let query =
                    "select * from tb_voucher_category where id = " +
                    "'" +
                    element.cateID +
                    "'";
                  body.query = query;
                  total_json.push(
                    new Promise((resolve, reject) => {
                      COMMON(body, (err, results, newElement) => {
                       
                        if (err) {
                          fatal_error.data = err;
                          return res.json(fatal_error);
                        }
                        if (results) {
                          if (results.length > 0) {
                            cate = results[0].cateName;
                          } else {
                            cate = "";
                          }
                          let json = {
                            id: element.id,
                            catename: cate,
                            title: element.title,
                            description: element.description,
                            expired_date:element.expired_date,
                            expired_time:element.expired_time,
                            start_date:element.start_date,
                            start_time:element.start_time,
                            end_date:element.end_date,
                            end_time:element.end_time,
                            vStatus:element.vStatus
                          };
                          resolve(json);
                        }
                      });
                     
                    })
                  );
                  
                });
              
                Promise.all(total_json).then(response=>{
                  console.log(response);
                  if(response.length > 0)
                  {
                    sucess.data = response; 
                    return res.json(sucess);
                  }
                  else{
                    return res.json(nodatafound);
                  }
                })
              
              }
              catch(error){

              }
           
            }
            else { return res.json(nodatafound); }
          }
        });
       
      }
      if (body.flag == 'active') {
        let query = "select tb.*  from tb_voucher as tb where tb.vStatus = '1' or tb.vStatus = '0' and tb.discount_type = 'Default' and  tb.cateID != '1' order by id DESC"
        body.query = query;
      COMMON(body,(err, results) => {
  
          if (err) { fatal_error.data = err; return res.json(fatal_error); }
          if (results) {
            if (results.length > 0) {
              try{
                results.forEach(element => {
                  if (element.start_date <= currDate && element.end_date >= currDate)
                  {
                  let query =
                    "select * from tb_voucher_category where id = " +
                    "'" +
                    element.cateID +
                    "'";
                  body.query = query;
                  total_json.push(
                    new Promise((resolve, reject) => {
                      COMMON(body, (err, results, newElement) => {
                       
                        if (err) {
                          fatal_error.data = err;
                          return res.json(fatal_error);
                        }
                        if (results) {
                          if (results.length > 0) {
                            cate = results[0].cateName;
                          } else {
                            cate = "";
                          }
                          let json = {
                            id: element.id,
                            catename: cate,
                            title: element.title,
                            description: element.description,
                            expired_date:element.expired_date,
                            expired_time:element.expired_time,
                            start_date:element.start_date,
                            start_time:element.start_time,
                            end_date:element.end_date,
                            end_time:element.end_time,
                            vStatus:element.vStatus
                          };
                          resolve(json);
                        }
                      });
                     
                    })
                  );
                  }
                });
              
                Promise.all(total_json).then(response=>{
                  console.log(response);
                  if(response.length > 0)
                  {
                    sucess.data = response; 
                    return res.json(sucess);
                  }
                  else{
                    return res.json(nodatafound);
                  }
                })
              
              }
              catch(error){

              }
           
            }
            else { return res.json(nodatafound); }
          }
        });
        
      }
      if (body.flag == 'schedule') {
        let query = "select * from tb_voucher where vStatus = '1' or vStatus = '0' and discount_type = 'Default' and  cateID != '1' order by id DESC"
        body.query = query;
      COMMON(body,(err, results) => {
        let total_json = []; 
          if (err) { fatal_error.data = err; return res.json(fatal_error); }
          if (results) {
            if (results.length > 0) {
              try{
              
                results.forEach(element => {
                  if (currDate < element.start_date)
                  {
                  let query =
                    "select * from tb_voucher_category where id = " +
                    "'" +
                    element.cateID +
                    "'";
                  body.query = query;
                  total_json.push(
                    new Promise((resolve, reject) => {
                      COMMON(body, (err, results, newElement) => {
                       
                        if (err) {
                          fatal_error.data = err;
                          return res.json(fatal_error);
                        }
                        if (results) {
                          if (results.length > 0) {
                            cate = results[0].cateName;
                          } else {
                            cate = "";
                          }
                          let json = {
                            id: element.id,
                            catename: cate,
                            title: element.title,
                            description: element.description,
                            expired_date:element.expired_date,
                            expired_time:element.expired_time,
                            start_date:element.start_date,
                            start_time:element.start_time,
                            end_date:element.end_date,
                            end_time:element.end_time,
                            vStatus:element.vStatus
                          };
                          resolve(json);
                        }
                      });
                     
                    })
                  );
                  }
                });
              
                Promise.all(total_json).then(response=>{
                  if(response.length > 0)
                  {
                    sucess.data = response; 
                    return res.json(sucess);
                  }
                  else{
                    return res.json(nodatafound);
                  }
                })
              
              }
              catch(error){

              }
           
            }
            else { return res.json(nodatafound); }
          }
        });
        
      }
      if (body.flag == 'expired') {
        let query = "select * from tb_voucher where vStatus = '1' or vStatus = '0' and discount_type = 'Default' and  cateID != '1' order by id DESC"
        body.query = query;
      COMMON(body,(err, results) => {
        let total_json = []; 
          if (err) { fatal_error.data = err; return res.json(fatal_error); }
          if (results) {
            if (results.length > 0) {
              try{
              
                results.forEach(element => {
                  if (currDate >= element.end_date)
                  {
                  let query =
                    "select * from tb_voucher_category where id = " +
                    "'" +
                    element.cateID +
                    "'";
                  body.query = query;
                  total_json.push(
                    new Promise((resolve, reject) => {
                      COMMON(body, (err, results, newElement) => {
                       
                        if (err) {
                          fatal_error.data = err;
                          return res.json(fatal_error);
                        }
                        if (results) {
                          if (results.length > 0) {
                            cate = results[0].cateName;
                          } else {
                            cate = "";
                          }
                          let json = {
                            id: element.id,
                            catename: cate,
                            title: element.title,
                            description: element.description,
                            expired_date:element.expired_date,
                            expired_time:element.expired_time,
                            start_date:element.start_date,
                            start_time:element.start_time,
                            end_date:element.end_date,
                            end_time:element.end_time,
                            vStatus:element.vStatus
                          };
                          resolve(json);
                        }
                      });
                     
                    })
                  );
                  }
                });
              
                Promise.all(total_json).then(response=>{
                  if(response.length > 0)
                  {
                    sucess.data = response; 
                    return res.json(sucess);
                  }
                  else{
                    return res.json(nodatafound);
                  }
                })
              
              }
              catch(error){

              }
           
            }
            else { return res.json(nodatafound); }
          }
        });
        
      }
    }
   
  },
  
  Add_Voucher: (req, res) => {
  
    let body = req;
    let imagesarr = [];
    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    if (!req.body.cateID) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.discount_type) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.voucher_code) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.title) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.files.photo) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.start_date) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.start_time) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.title) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.expired_date) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.expired_time) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.link) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.vStatus) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    var imgname = makeid(5);
    if(req.files.thump_nail_pic){
      var imgname = makeid(5);
      s3w.uploadFile(req.files.thump_nail_pic.data, imgname, (results, err) => {
if(results){
  imagesarr.push(results);
}
else{
  throw err;
}
      });
    }
    s3w.uploadFile(req.files.photo.data, imgname, (results, err) => {
      if (results) {
        
        ADD_VOUCHER(body, results, (err, results) => {
         
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
              msg: "Voucher Insert Successfully..."
            });
          }

          else if (results[0].err_id == -2) {
            return res.json({
              status: "failure",
              statuscode: "2",
              msg: "Voucher Name Already Inserted"
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
  getVoucherById: (req, res) => {
    let body = req.body;
   
    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.id) { return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required All Field" }) }

    GET_VOUCHER_BY_ID(body, (err, results) => {

      if (err) {

        return res.json({
          status: "fatal_error",
          statuscode: "500",
          data: err
        });
      }
      else if (results) {
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
  changeVoucherStatus: (req, res) => {
    let body = req.body;

    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.voucherid) { return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required All Field" }) }

    CHANGE_VOUCHER_STATUS(body, (err, results) => {

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
            statuscode: "4",
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
            data: "Category Changes Sucessfully."
          });
        }
      }

    });
  },
  editVoucher: (req, res) => {
    let body = req.body;
    console.log(body);
let i = 0;
if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
if (!req.body.cateID) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
else if (!req.body.discount_type) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
else if (!req.body.voucher_code) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
else if (!req.body.title) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
else if(req.files){
   if ( !req.files.photo) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
}
else if(req.body){
   if(!req.body.photo){ return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
}
else if (!req.body.start_date) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
else if (!req.body.start_time) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
else if (!req.body.title) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
else if (!req.body.expired_date) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
else if (!req.body.expired_time) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
else if (!req.body.link) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
else if (!req.body.vStatus) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    var imgname = makeid(5);
    //fs.writeFileSync("Api\\Images\\VoucherImages\\" + imgname + ".png", body.files.photo);
    EDIT_VOUCHER(body, imgname, (err, results) => {
      console.log("innnnnnnn");

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
          msg: "Voucher Updated Successfully..."
        });
      }

      else if (results[0].err_id == -1) {
        return res.json({
          status: "failure",
          statuscode: "2",
          msg: "Voucher Name Already Inserted"
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
  deleteVoucher: (req, res) => {
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
          data: "Invalid voucher id"
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
          data: "voucher deleted successfully"
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