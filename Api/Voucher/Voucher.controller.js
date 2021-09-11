

const { ADD_VOUCHER,ADD_APP_VOUCHER,GET_APP_VOUCHER_BY_ID,CHANGE_APP_VOUCHER_STATUS } = require("../Voucher/Voucher.service");
const { GET_VOUCHER_BY_ID ,GET_EXP_VOUCHER_BY_ID} = require("../Voucher/Voucher.service");
const { CHANGE_VOUCHER_STATUS,EDIT_EXP_VOUCHER } = require("../Voucher/Voucher.service");
const { EDIT_VOUCHER,EDIT_APP_VOUCHER,ADD_EXTERNAL_APP_VOUCHER ,CHANGE_EXP_VOUCHER_STATUS} = require("../Voucher/Voucher.service");
const { DELETE_PRODUCT, COMMON ,DELETE_APP_PRODUCT,DEFINE_SCHEDULER} = require("../Voucher/Voucher.service");
var s3w = require("../Aws.s3");
const {uploadImg }= require("../Aws.s3");
const fs = require("fs");
const ASYNC = require('async');
const moment= require('moment') 
const cron = require('node-cron');
const {PushNotification  } = require("../Mqtt/push");
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
  getAppExternalVoucherById: (req, res) => {
    let body = req.body;
   
    if (!req.body.api_token) { return res.status(200).json(reqallfeild) }
    else if (!req.body.id) { return res.status(200).json(reqallfeild) }

    GET_EXP_VOUCHER_BY_ID(body, (err, results) => {

      if (err) {fatal_error.data = err; return res.json(fatal_error);}
      else if (results) {
        if (results[0].err_id == -1) {
          return res.json(apierrmsg);
        }
        else if (results[0].err_id == -2) {
          return res.json(nodatafound);
        }
        else {
          sucess.data = results;
          return res.json(sucess);
        }
      }

    });
  },
  View_App_Voucher: (req, res) => {
    let body = req.body;
   //View_External_Voucher
    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    Verify_Employee(body,(err,results)=>{
      if (err) {return res.json(fatal_error);}
      if(results){
       let query = "Select * from tb_voucher_new where Vstatus = '1' or Vstatus = '0'";
       body.query = query;
       COMMON(body,(err,results)=>{
        if (err) {return res.json(fatal_error);}
        if(results){sucess.data =results;return res.json(sucess); }
       });
      }
     else{return res.json(apierrmsg);}
    })
  },
  View_External_Voucher: (req, res) => {
    let body = req.body;
   
    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    Verify_Employee(body,(err,results)=>{
      if (err) {return res.json(fatal_error);}
      if(results){
       let query = "Select * from new_external_voucher_table where vstaus = 0 or vstaus = 1";
       body.query = query;
       COMMON(body,(err,results)=>{
        if (err) {return res.json(fatal_error);}
        if(results){sucess.data =results;return res.json(sucess); }
       });
      }
     else{return res.json(apierrmsg);}
    })
  },
  Add_App_Voucher: (req, res) => {
    
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(reqallfeild) }
    else if (!req.body.voucher_code_IN) { return res.status(200).json(reqallfeild) }
    else if (!req.body.category_IN) { return res.status(200).json(reqallfeild) }
    else if (!req.body.redeemable_value_IN) { return res.status(200).json(reqallfeild) }
    else if (!req.body.customer_eligiblity_IN) { return res.status(200).json(reqallfeild) }
    else if (!req.body.voucher_type_IN) { return res.status(200).json(reqallfeild) }
    else if (!req.body.start_date_IN) { return res.status(200).json(reqallfeild) }
    else if (!req.body.start_time_IN) { return res.status(200).json(reqallfeild) }
    else if (!req.body.end_date_IN) { return res.status(200).json(reqallfeild) }
    else if (!req.body.end_time_IN) { return res.status(200).json(reqallfeild) }
    console.log(req.files)
     if (req.files) { 

      var fileKeys = Object.keys(req.files);
      let tump_path = "";
      let photo_path = "";
      
      ASYNC.each(fileKeys, function(element, callback) 
      {	
        
        let imgname = makeid(5);
        s3w.uploadFile(req.files[element].data, imgname, (results, err) => {
          if (err) {fatal_error.data =err;return res.json(fatal_error);}
          if(res){if(element === "tump_path"){tump_path = results};
          if(element === "photo_path"){photo_path = results};}
          callback();
        });
      }, function(err)
      {
        if (err) {fatal_error.data =err;  return res.json(fatal_error);}
        if(tump_path != ""){req.body.tump_path = tump_path;}
        if(photo_path != ""){req.body.photo_path = photo_path;}
        ADD_APP_VOUCHER(body,(err, results) => {
          if (err) {fatal_error.data =err;return res.json(fatal_error);}
          if(results){if(results[0].err_id == "-1"){return res.json(apierrmsg);}
          if(results[0].err_id == "1"){inssucess.msg = "Voucher Added"; return res.json(inssucess);}}
        });
      });
     

     }
  
    

  },
  Add_External_Voucher: (req, res) => {
    let body = req.body;
    if (!req.body.api_token ) { return res.status(200).json(reqallfeild) }
    else if (!req.body.voucher_code_type_new ) { return res.status(200).json(reqallfeild) } //int(0 => Single_Code , 1=> MultiCode)
    if (req.body.voucher_code_type_new == 1 ){
       if (!req.body.no_of_code_new ) { return res.status(200).json(reqallfeild) }//int
      else if (!req.body.code_length_new ) { return res.status(200).json(reqallfeild) }//int
      else if (!req.body.code_prefix_new) { return res.status(200).json(reqallfeild) }//varchar
      else if (!req.body.usage_limit_new ) { return res.status(200).json(reqallfeild) }//int : default value 0 => unlimited,value 1 => limited
      if(req.body.usage_limit_new == 1){
        if (!req.body.usage_limit_value_new) { return res.status(200).json(reqallfeild) }//int
      }
     }
    else if (!req.body.voucher_code_new) { return res.status(200).json(reqallfeild) }//varchar  
    else if (!req.body.category_new ) { return res.status(200).json(reqallfeild) }//dropDOWN =>INT
    else if (!req.body.outlet_new ) { return res.status(200).json(reqallfeild) }//dropDOWN =>INT
    else if (!req.body.voucher_type_new) { return res.status(200).json(reqallfeild) }//varchar
    else if (!req.body.start_date_new ) { return res.status(200).json(reqallfeild) }//date =>yyyy/mm/dd
    else if (!req.body.start_time_new ) { return res.status(200).json(reqallfeild) }//time=> 00:00:00     
        ADD_EXTERNAL_APP_VOUCHER(body,(err, results) => {
          if (err) {fatal_error.data =err;return res.json(fatal_error);}
          if(results){if(results[0].err_id == "-1"){return res.json(apierrmsg);}
          if(results[0].err_id == "1"){inssucess.msg = "Voucher Added"; return res.json(inssucess);}}
        });
    
  },
  Add_Voucher: async(req, res) => {
  
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
    let result =await uploadImg(req.files.photo.data,imgname);
    s3w.uploadFile(req.files.photo.data, imgname, (results, err) => {
      if (results) {
        
        ADD_VOUCHER(body, results, (err, results) => {
         console.log(results);
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
if (req.files && req.body.photo) {
  s3w.uploadFile(req.files.photo.data, imgname, (results, err) => {

    EDIT_VOUCHER(body, results, (err, results) => {
      
      if (err) {

        return res.json({
          status: "fatal_error",
          statuscode: "500",
          data: err
        });
      }

      else if (results) {

        return res.json({
          status: "success",
          statuscode: "1",
          msg: "Voucher Updated Successfully..."
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
}
else{
  EDIT_VOUCHER(body, "", (err, results) => {
      
    if (err) {

      return res.json({
        status: "fatal_error",
        statuscode: "500",
        data: err
      });
    }

    else if (results) {

      return res.json({
        status: "success",
        statuscode: "1",
        msg: "Voucher Updated Successfully..."
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
  getAppVoucherById: (req, res) => {
    let body = req.body;
   
    if (!req.body.api_token) { return res.status(200).json(reqallfeild) }
    else if (!req.body.id) { return res.status(200).json(reqallfeild) }

    GET_APP_VOUCHER_BY_ID(body, (err, results) => {

      if (err) {fatal_error.data = err; return res.json(fatal_error);}
      else if (results) {
        if (results[0].err_id == -1) {
          return res.json(apierrmsg);
        }
        else if (results[0].err_id == -2) {
          return res.json(nodatafound);
        }
        else {
          sucess.data = results;
          return res.json(sucess);
        }
      }

    });
  },
  changeAppVoucherStatus: (req, res) => {
    let body = req.body;

    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.voucherid) { return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required All Field" }) }

    CHANGE_APP_VOUCHER_STATUS(body, (err, results) => {

      if (err) {fatal_error.data = err; return res.json(fatal_error);}
      else {
        if (results[0].err_id == -1) {return res.json(apierrmsg);}
        else if (results[0].err_id == -2) {return res.json(nodatafound);}
        else {
          sucess.data= "Status Changed Sucessfully."
          return res.json(sucess);
        }
      }

    });
  },
  changeExpVoucherStatus: (req, res) => {
    let body = req.body;

    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.voucherid) { return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required All Field" }) }
    else if (!req.body.status) { return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required All Field" }) }
    CHANGE_EXP_VOUCHER_STATUS(body, (err, results) => {

      if (err) {fatal_error.data = err; return res.json(fatal_error);}
      else {
        if (results[0].err_id == -1) {return res.json(apierrmsg);}
        else if (results[0].err_id == -2) {return res.json(nodatafound);}
        else {
          sucess.data= "Status Changed Sucessfully."
          return res.json(sucess);
        }
      }

    });
  },
  Delete_App_Voucher: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.id) { return res.status(200).json(reqallfeild) }

    DELETE_APP_PRODUCT(body, (err, results) => {

      if (err) {fatal_error.data =err; return res.json();}
      else if (results[0].err_id == '-2') {
        insfailure.msg = "Invalid Id.";
        return res.json(insfailure);
      }
      else if (results[0].err_id == '-1') {
        return res.json(apierrmsg);
      }
      else if (results[0].err_id == '1') {
        sucess.data = "Deleted Sucessfully";
      return res.json(sucess);
      }


    });
  },
  editAppVoucher: async(req, res) => {
let body = req.body;
if (!body.api_token) { return res.status(200).json(reqallfeild) }
if(req.files){
  var fileKeys = Object.keys(req.files);
  let tump_path = "";
  let photo_path = "";
  ASYNC.each(fileKeys, function(element, callback) 
  {	
    let imgname = makeid(5);
    s3w.uploadFile(req.files[element].data, imgname, (results, err) => {
      if (err) {return res.json(fatal_error);}
      if(res){if(element === "tump_path"){tump_path = results};
      if(element === "photo_path"){photo_path = results};}
      callback();
    });
  }, function(err)
  {
    if (err) {return res.json(fatal_error);}
    if(tump_path != ""){req.body.thumbnail_image_new = tump_path;}
    if(photo_path != ""){req.body.voucher_image_new = photo_path;}
    EDIT_APP_VOUCHER(body,(err, results) => {
      if (err) {fatal_error.data = err; return res.json(fatal_error);}
      if(results){if(results[0].err_id == "-1"){return res.json(apierrmsg);}
      if(results[0].err_id == "1"){inssucess.msg = "Voucher Updated"; return res.json(inssucess);}
      if(results[0].err_id == "-2"){insfailure.msg = "Invalid Id"; return res.json(insfailure);}}
      
    });
  });


}
else{
  req.body.thumbnail_image_new = '';
  req.body.voucher_image_new = '';
  EDIT_APP_VOUCHER(body,(err, results) => {
    if (err) {return res.json(fatal_error);}
    if(results){if(results[0].err_id == "-1"){return res.json(apierrmsg);}
    if(results[0].err_id == "1"){inssucess.msg = "Voucher Updated"; return res.json(inssucess);}}
  });
}


},
editExpVoucher: async(req, res) => {
  let body = req.body;
  if (!body.api_token) { return res.status(200).json(reqallfeild) }

      EDIT_EXP_VOUCHER(body,(err, results) => {
        if (err) {fatal_error.data = err; return res.json(fatal_error);}
        if(results){if(results[0].err_id == "-1"){return res.json(apierrmsg);}
        if(results[0].err_id == "1"){inssucess.msg = "Voucher Updated"; return res.json(inssucess);}
        if(results[0].err_id == "-2"){insfailure.msg = "Invalid Id"; return res.json(insfailure);}}
            
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
cron.schedule('* * * * *', () => {
  
  ScduleVoucher = async(req, res) => {
    
    let body = {};
    DEFINE_SCHEDULER(body, (err, results) => {
     console.log(results);
      if (err) {fatal_error.data = err; return res.json(fatal_error);}
      if(results){if(!results[0].err_id){
        ASYNC.each(results, function(element, callback) 
        {	
          console.log(element.customer_eligiblity);
          if(element.customer_eligiblity == 'all'){
            console.log("cjbf");
            let query = "select u.* from users as u inner join firebase as f on f.userID = u.id";
            body.query = query;
            COMMON(body, (err, results) => {
              
              if (err) {fatal_error.data = err; return res.json(fatal_error);}
              if(results.length > 0){
                results.forEach(element => {
                  let vouchermsg = "new";
                  if(results.device_token){
                    PushNotification(results.device_token, vouchermsg);
                  }
                
                });

              }else{return res.json(nodatafound);}
            });
          }
if(element.customer_eligiblity == 'particular_customer')
{
  console.log("cjb");
  if(element.customer_eligiblity_value.includes(","))
  {
  let str = element.customer_eligiblity_value;
  let Id_arr = [];
  Id_arr = str.split(",");
  
  Id_arr.forEach(element => {
    let query = "select u.*,f.* from users as u left join firebase as f on f.userID = u.id where u.id = '" + element +"';"
    body.query = query;
COMMON(body, (err, results) => {
  if (err) {fatal_error.data = err; return res.json(fatal_error);}
if(results){  
  if(results.length > 0){
    let vouchermsg = "new";
    
    if(results[0].device_token){ 
      console.log(results[0].device_token);
       PushNotification(results[0].device_token,"demo",vouchermsg);
      }
}
}

});
  });
  }


}

        },
function(err)   {


        });


      }}
      else{return res.json(nodatafound);}
    });

  }
  ScduleVoucher();
});
