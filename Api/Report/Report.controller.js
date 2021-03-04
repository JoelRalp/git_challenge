const fs = require("fs");
const { Console } = require("console");
const {VOUCHER_REPORT,PAYMENT_REPORT,TOPUP_REPORT,REFERAL_REPORT,RESERVATION_REPORT} = require("./Report.service.");
const { makeid, refresh } = require("../Mqtt/server");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")


module.exports = {
  voucherReport: (req, res) => {
   
    const body = req.body;
    var code = 0;
    var query = "SELECT a.id,a.title,a.types_value,a.types,a.usage_limit_value,a.total_vou_count,a.at_discount,a.usage_limit,b.cateName FROM tb_voucher a , tb_voucher_category b where a.cateID = b.id and"
 
    if (req.body.title) {//code = 1
      query = query + " " + "a.title =" + "'" + body.title + "' " + "and";
    }
    if (req.body.category) {//code =2
      query = query + " " + "b.cateName = category and"//code = 3no
    }
    if (req.body.types) {
      query = query + " " + "types = typesnew and";//code= 4
    }

    if (req.body.order_by) {
      var queryendnew = query.substr(query.length - 3); // => "Tabs1"
      if (queryendnew = "and") {
        query = query.slice(0, -4)
        
      }
      query = query + " " + "order by a.id" + " " + body.order_by ;//code5
      
    }

    var queryend = query.substr(query.length - 3); // => "Tabs1"
   
    if (queryend == "and") {

      query = query.slice(0, -3)
    }
    query = query + ";";
    console.log(query);
    VOUCHER_REPORT(body,query, (err, results) => {
      console.log(results);
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if(results.length > 0){if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }}
      else{return res.json(nodatafound);}
    });
  },
  PaymentReport: (req, res) => {
   
    const body = req.body;
    var code = 0;
    var query = "SELECT a.id,a.paymentID,a.pay_method,a.status,a.amount,a.point,b.name AS Merchant_name,b.name,d.user_type,c.outlet_name,a.created_at from payment a,merchant b,tb_outlet c, users d  where a.merchantID = b.id and"
 
    if (req.body.payment_id) {//code = 1
      query = query + " " + "a.paymentID =" + "'" + body.payment_id + "' " + "and";
    }
    if (req.body.pay_method) {//code =2
      query = query + " " + "a.pay_method =" + "'" + body.pay_method + "' " + " and"//code = 3no
    }
    if (req.body.merchantID) {
      query = query + " " + "a.merchantID =" + "'" + body.merchantID + "' " + "and";//code= 4a.merchantID
    }
    if (req.body.outlet_name) {
      query = query + " " + "c.outlet_name =" + "'" + body.outlet_name + "' " + "and";//code= 4a.merchantID
    }
    if (req.body.date) {
      query = query + " " + "a.created_at =" + "'" + body.created_at + "' " + "and";//code= 4a.merchantID
    }
    if (req.body.order_by) {
      var queryendnew = query.substr(query.length - 3); // => "Tabs1"
      if (queryendnew = "and") {
        query = query.slice(0, -4)
      }
      query = query + " " + "order by a.id" + " " + body.order_by ;//code5
      
    }

    var queryend = query.substr(query.length - 3); // => "Tabs1"
   
    if (queryend == "and") {

      query = query.slice(0, -3)
    }
    query = query + ";";
    console.log(query);
    PAYMENT_REPORT(body,query, (err, results) => {
      console.log(results);
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if(results.length > 0){if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }}
      else{return res.json(nodatafound);}
    });
  },
  TopupReport: (req, res) => {
   
    const body = req.body;
    var code = 0;
    var query = "SELECT a.id,a.paymentID AS Topup_Id,a.pay_method as Topup_Method,a.status,a.amount,a.point,b.name AS Merchant_name,b.name,d.user_type as user_type,c.outlet_name,a.created_at from payment a,merchant b,tb_outlet c, users d  where a.pay_type = 'Topup' and"
 
    if (req.body.topup_id) {//code = 1
      query = query + " " + "a.paymentID =" + "'" + body.topup_id + "' " + "and";
    }
    if (req.body.topup_method) {//code =2
      query = query + " " + "a.pay_method =" + "'" + body.topup_method + "' " + " and"//code = 3no
    }
    if (req.body.merchantID) {
      query = query + " " + "a.merchantID =" + "'" + body.merchantID + "' " + "and";//code= 4a.merchantID
    }
    if (req.body.outlet_name) {
      query = query + " " + "c.outlet_name =" + "'" + body.outlet_name + "' " + "and";//code= 4a.merchantID
    }
    if (req.body.order_by) {
      var queryendnew = query.substr(query.length - 3); // => "Tabs1"
      if (queryendnew = "and") {
        query = query.slice(0, -4)
        
      }
      query = query + " " + "order by a.id" + " " + body.order_by ;//code5
      
    }

    var queryend = query.substr(query.length - 3); // => "Tabs1"
   
    if (queryend == "and") {

      query = query.slice(0, -3)
    }
    query = query + ";";
    console.log(query);
    TOPUP_REPORT(body,query, (err, results) => {
      console.log(results);
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if(results.length > 0){if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }}
      else{return res.json(nodatafound);}
    });
  },
  DayendReport: (req, res) => {
   
    const body = req.body;
    var code = 0;
    var query = "SELECT a.id,a.total_wallet,a.total_others,a.total_topup,a.payment_cancelled,a.topup_cancelled,a.created_at,a.dayend_id AS Day_End_ID,b.outlet_name,c.name AS Merchant_id FROM TokyoApi.tb_dayend a , tb_outlet b ,merchant c where a.outlet = b.id and"
 
    if (req.body.dayend_id) {
      query = query + " " + "a.dayend_id =" + "'" + body.dayend_id + "' " + "and";
    }
    if (req.body.merchant_id) {
      query = query + " " + "c.name =" + "'" + body.merchant_id + "' " + "and";
    }
    if (req.body.outlet_name) {
      query = query + " " + "b.outlet_name =" + "'" + body.outlet_name + "' " + "and";//code= 4a.merchantID
    }
    if (req.body.order_by) {
      var queryendnew = query.substr(query.length - 3); // => "Tabs1"
      if (queryendnew = "and") {
        query = query.slice(0, -4)
        
      }
      query = query + " " + "order by a.id" + " " + body.order_by ;//code5
      
    }

    var queryend = query.substr(query.length - 3); // => "Tabs1"
   
    if (queryend == "and") {

      query = query.slice(0, -3)
    }
    query = query + ";";
    console.log(query);
    DAYEND_REPORT(body,query, (err, results) => {
      console.log(results);
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if(results.length > 0){if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }}
      else{return res.json(nodatafound);}
    });
  },
  RefferalReport: (req, res) => {
   
    const body = req.body;
    var code = 0;
    var query = "SELECT a.name,a.referral_code,a.referral_count,a.created_at FROM users a"
 
    if (req.body.member_id) {
      query = query + " " + "where" + " " + "a.referral_code =" + "'" + body.member_id + "' " + "and";
    }
    if (req.body.order_by) {
      var queryendnew = query.substr(query.length - 3); // => "Tabs1"
      if (queryendnew = "and") {
        query = query.slice(0, -4)
        
      }
      query = query + " " + "order by a.id" + " " + body.order_by ;//code5
      
    }

    var queryend = query.substr(query.length - 3); // => "Tabs1"
   
    if (queryend == "and") {

      query = query.slice(0, -3)
    }
    query = query + ";";
    console.log(query);
    REFERAL_REPORT(body,query, (err, results) => {
      console.log(results);
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if(results.length > 0){if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }}
      else{return res.json(nodatafound);}
    });
  }, 
  ReservationReport: (req, res) => {
   
    const body = req.body;
    var code = 0;
    var query = "SELECT a.id,a.created_at,a.name,a.phone,a.description,a.status,a.pax1,a.pax2,b.outlet_name FROM TokyoApi.tb_reservation a,tb_outlet b where a.outID = b.id where"
 
    if (req.body.name) {
      query = query + " " + "a.name =" + "'" + body.name + "' " + "and";
    }
    if (req.body.status) {
      query = query + " " + "a.status =" + "'" + body.status + "' " + "and";
    }
    if (req.body.outlet_name) {
      query = query + " "  + "b.outlet_name =" + "'" + body.outlet_name + "' " + "and";
    }
    if (req.body.order_by) {
      var queryendnew = query.substr(query.length - 3); // => "Tabs1"
      if (queryendnew = "and") {
        query = query.slice(0, -4)
        
      }
      query = query + " " + "order by a.id" + " " + body.order_by ;//code5
      
    }

    var queryend = query.substr(query.length - 3); // => "Tabs1"

    if (queryend == "and" || queryend == "ere") {
      if (queryend == "ere") {
        query = query.slice(0, -5)
      }
      else {
        query = query.slice(0, -3)
      }

    }
    
    query = query + ";";
    console.log(query);
    RESERVATION_REPORT(body,query, (err, results) => {
      console.log(results);
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if(results.length > 0){if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }}
      else{return res.json(nodatafound);}
    });
  },
  
}//SELECT a.name,a.referral_code,a.referral_count,a.created_at FROM users a
