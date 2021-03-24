

const{ VIEW_VOUCHER } = require("../Voucher/Voucher.service");
const{ ADD_VOUCHER } = require("../Voucher/Voucher.service");
const{ GET_VOUCHER_BY_ID } = require("../Voucher/Voucher.service");
const{ CHANGE_VOUCHER_STATUS } = require("../Voucher/Voucher.service");
const{ EDIT_VOUCHER } = require("../Voucher/Voucher.service");
const{ DELETE_PRODUCT } = require("../Voucher/Voucher.service");
var s3w = require("../Aws.s3")
const fs = require("fs");
const { Console } = require("console");
module.exports = {
 
  View_Voucher: (req, res) => {
    console.log(req);
    const body = req.body;
    let Api_token = body.api_token;
    if (!Api_token) {
      return res.json({
        status: "failure",
        statuscode: "2",
        data: "Required all Fields"
      });
    }

    VIEW_VOUCHER(body, (err, results) => {


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
  Add_Voucher: (req, res) => {
    let body = req;
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

    var imgname=   makeid(5);
     s3w.uploadFile (req.files.photo.data,imgname, (results, err) => {
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
   
    if (!req.body.cateID) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.discount_type) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.apikey) { return res.status(200).json({ status: "failure", statuscode: "2", msg: "Invalid Api token" }) }
    else if (!req.body.voucher_code) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.title) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.min_req) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.description) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.file.photo) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.addDate) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.color_code) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.types) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.types_value) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.apply_to) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.apply_to_value) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.country) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.country_value) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.ship_rate) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.ship_rate_value) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.cust_buy) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.cust_buy_value1) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.cust_buy_value2) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.cust_get) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.cust_get_value1) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.cust_get_value2) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.at_discount) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.at_discount_value) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.set_min_order) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.set_min_order_value) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.min_req_value) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.cus_elg) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.cus_elg_value) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.usage_limit) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.usage_limit_value) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.total_vou_count) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.limt_per) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.limit_per_value) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.start_date) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.start_time) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.end_date) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.end_time) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.expired_date) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.expired_time) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.vStatus) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    var imgname = makeid(5);
    fs.writeFileSync("Api\\Images\\VoucherImages\\" + imgname + ".png", body.files.pImage.photo);
    EDIT_VOUCHER(body,imgname, (err, results) => {


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
  deleteVoucher: (req,res) => { 
    let body = req.body;
      if(!req.body.api_token){return res.status(200).json({status:"failure",statuscode:"3",msg:"Invalid admin api token"})}
      else if(!req.body.id){return res.status(200).json({status:"failure",statuscode:"3",msg:"Required All Field"})}
   
      DELETE_PRODUCT(body, (err, results) => {
     
        if (err) {
          
          return res.json({
              status: "fatal_error",
              statuscode: "500",
              data: err
            });
        }
        else if(results[0].err_id == '-2')
        {
          return res.json({
            status: "failure",
            statuscode: "3",
            data: "Invalid voucher id"
          });
        }
      
        else  if(results[0].err_id == '-1')
          {
            return res.json({
                status: "failure",
                statuscode: "3",
                msg:"Invalid admin api token"
              });
          }     
          else if(results[0].err_id == '1'){
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
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}