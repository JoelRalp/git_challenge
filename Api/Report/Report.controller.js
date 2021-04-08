const fs = require("fs");
const { Console } = require("console");
const {VOUCHER_REPORT,PAYMENT_REPORT,TOPUP_REPORT,REFERAL_REPORT,RESERVATION_REPORT,DAYEND_REPORT,DEAT_VOUCHER} = require("./Report.service.");
const { makeid, refresh } = require("../Mqtt/server");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")


module.exports = {
  voucherReport: (req, res) => {
   
    const body = req.body;
    var code = 0;
    var query = "SELECT a.id,a.title,a.types_value,a.types,a.usage_limit_value,a.types,a.discount_type,a.usage_limit,a.total_vou_count,a.at_discount,a.usage_limit,b.cateName FROM tb_voucher a , tb_voucher_category b where a.cateID = b.id and"
 
    if (req.body.title) {//code = 1
      query = query + " " + "a.title =" + "'" + body.title + "' " + "and";
    }
    if (req.body.category) {//code =2
      query = query + " " + "b.cateName = " + "'" + req.body.category + "'" + "and"//code = 3no
    }
    if (req.body.types) {
      query = query + " " + "a.types = " + "'" + req.body.types + "'" + "and";//code= 4
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
   console.log(body);
   
    var code = 0;
    var query = 'SELECT p.*,m.name as merchant_name,u.name as username,u.user_type,o.outlet_name FROM payment as p Left JOIN merchant as m ON p.merchantID=m.id Left JOIN users as u ON p.userID=u.id Left JOIN tb_outlet as o ON m.outlet=o.id where'
 
    if (req.body.paymentid) {//code = 1
      query = query + " " + "p.paymentID =" + "'" + body.paymentid + "' " + "and";
    }
    if (req.body.pay_method) {//code =2
      query = query + " " + "p.pay_method =" + "'" + body.pay_method + "' " + " and"//code = 3no
    }
    if (req.body.merchant_id) {
      query = query + " " + "p.merchantID =" + "'" + body.merchant_id + "' " + "and";//code= 4a.merchantID
    }
    if (req.body.outlet) {
      query = query + " " + "o.outlet_name =" + "'" + body.outlet + "' " + "and";//code= 4a.merchantID
    }
    if (req.body.date) {
      query = query + " " + "date(p.created_at) =" + "'" + body.date + "' " + "and";//code= 4a.merchantID
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
    console.log(queryend);
    if (queryend == "ere") {

      query = query.slice(0, -5)
    }
    query = query + ";";
    console.log(query);
    PAYMENT_REPORT(body,query, (err, results) => {
      
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if(results.length > 0){if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }}
      else{return res.json(nodatafound);}
    });
  },
  TopupReport: (req, res) => {
   
    const body = req.body;
console.log(body);
    var query = `SELECT p.*,m.name,u.name as username,o.outlet_name
		FROM payment as p
		Left JOIN merchant as m ON p.merchantID=m.id
		Left JOIN users as u ON p.userID=u.id
		Left JOIN tb_outlet as o ON m.outlet=o.id   
    where p.pay_type = 'Topup' and`
 
    if (req.body.paymentid) {//code = 1
      query = query + " " + "p.paymentID =" + "'" + body.paymentid + "' " + "and";
    }
    if (req.body.pay_method) {//code =2
      query = query + " " + "p.pay_method =" + "'" + body.pay_method + "' " + " and"//code = 3no
    }
    if (req.body.merchant_id) {
      query = query + " " + "p.merchantID =" + "'" + body.merchant_id + "' " + "and";//code= 4a.merchantID
    }
    if (req.body.paydate) {
      query = query + " " + "date(p.created_at) =" + "'" + body.paydate + "' " + "and";//code= 4a.merchantID
    }
    if (req.body.outlet) {
      query = query + " " + "m.outlet_name =" + "'" + body.outlet + "' " + "and";//code= 4a.merchantID
    }
    if (req.body.order_by) {
      var queryendnew = query.substr(query.length - 3); // => "Tabs1"
      if (queryendnew = "and") {
        query = query.slice(0, -4)
        
      }
      query = query + " " + "order by p.id" + " " + body.order_by ;//code5
      
    }

    var queryend = query.substr(query.length - 3); // => "Tabs1"
   
    if (queryend == "and") {

      query = query.slice(0, -3)
    }
    query = query + ";";
    console.log(query);
    TOPUP_REPORT(body,query, (err, results) => {
      
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if(results.length > 0){if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }}
      else{return res.json(nodatafound);}
    });
  },
  DayendReport: (req, res) => {
   
    const body = req.body;
    var code = 0;
    var query = 'Select d.*,o.outlet_name as outlet_name from tb_dayend d left join tb_outlet o on d.outlet = o.id  left join merchant m on d.merchant_id = m.id where'
    if (req.body.dayend_id) {
      query = query + " " + "d.dayend_id =" + "'" + body.dayend_id + "' " + "and";
    }
    if (req.body.merchant_name) {
      query = query + " " + "m.name =" + "'" + body.merchant_name + "' " + "and";
    }
    if (req.body.outlet_name) {
      query = query + " " + "o.outlet_name =" + "'" + body.outlet_name + "' " + "and";//code= 4a.merchantID
    }
    if (req.body.search_date) {
      query = query + " " + "date(d.created_at) =" + "'" + body.search_date + "' " + "and";//code= 4a.merchantID
    }
    if (req.body.order_by) {
      var queryendnew = query.substr(query.length - 3); // => "Tabs1"
      if (queryendnew == "and") {
        query = query.slice(0, -4)
        
      }
      if (queryendnew == "ere") {

        query = query.slice(0, -5)
      }
      query = query + " " + "order by d.id" + " " + body.order_by ;//code5
      
    }

    var queryend = query.substr(query.length - 3); // => "Tabs1"
    if (queryend == "ere") {

      query = query.slice(0, -5)
    }
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
    console.log(req);
    const body = req.body;
    var code = 0;
    var query = "SELECT a.name,a.referral_code,a.referral_count,a.created_at FROM users a"
 
    if (req.body.memberid) {
      
      query = query + " " + "where" + " " + "a.referral_code =" + "'" + body.memberid + "' " ;
    }
    if (req.body.order_by) {
      var queryendnew = query.substr(query.length - 3); // => "Tabs1"
      if (queryendnew == "and") {
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
     
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if(results.length > 0){if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }}
      else{return res.json(nodatafound);}
    });
  }, 
  ReservationReport: (req, res) => {
   
    const body = req.body;
    
    var code = 0;
    var query = "SELECT a.id as reservation_id,a.created_at,a.name,a.phone,a.description,a.status,a.pax1 as adult,a.pax2 as child,b.outlet_name,a.date,a.time FROM TokyoApi.tb_reservation a,tb_outlet b where a.outID = b.id where"
 
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
      var queryendnew = query.substr(query.length - 3); 
      if (queryendnew = "and") {
        query = query.slice(0, -4)
        
      }
      query = query + " " + "order by a.id" + " " + body.order_by ;
      
    }

    var queryend = query.substr(query.length - 3); 

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
  WeborderReport: (req, res) => {
let order =[];
let total = 0;
let ordrid = [];
let resjson;
let totaljson = [];
let resjsonnew =[];
    const body = req.body;
  let out = "";
    var query = "Select t.* from booking_table as t where t.status =" + "'checkout' and"

    if (req.body.search_by) {
      query = query + " " + "t.checkin_id LIKE " + "%" + body.name + "% " + "and";
    }
    if (req.body.outlet & req.body.outlet != 'all') {
      query = query + " " + "t.outletid =" + "'" + body.outlet + "' " + "and";
    }
    if (req.body.paydate) {
      query = query + " " + "date(t.checkout_date) =" + "'" + body.paydate + "' " + "and";
    }
    if (req.body.order_by) {
      var queryendnew = query.substr(query.length - 3);
      if (queryendnew = "and") {
        query = query.slice(0, -4)

      }
      query = query + " " + "order by t.created_at" + " " + body.order_by;

    }
    if (!req.body.order_by) {
      if (queryendnew = "and") {
        query = query.slice(0, -4)

      }
      query = query + " " + "order by t.created_at DESC";
    }

    var queryend = query.substr(query.length - 3);

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
    RESERVATION_REPORT(body, query, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      if (results) {
        if (results.length > 0) {
          results.forEach(element => {
            order.push(element);
          });
          var bar = new Promise((resolve, reject) => {
            order.forEach(element => {
              query = "Select * from tb_outlet where id = " +"'"+ element.id + "'";
              let query2 = "Select * from web_order_placed where book_id = " +"'"+ element.id + "'";
              RESERVATION_REPORT(body,query,(err, results) => {
                if (err) { fatal_error.data = err; return res.json(fatal_error); }
                if (results) {
                  if (results.length > 0) {
                   out = results[0].outlet_name;
                  }
                  else{
                    out = "";
                  }              
                  RESERVATION_REPORT(body,query2, async(err,results) => {
                     total = 0;
                     ordrid = [];
                    if (err) { fatal_error.data = err; return res.json(fatal_error); }
                    if (results) {
                      if (results.length > 0) {
                        results.forEach(element => {
                          total = total + element.amount;
                          ordrid.push(element.orderid);
                          });                        
                          resjson = {
                            "id":element.id,
                            "checkin_id":element.checkin_id,
                            "outlet":out,
                            "table_no":element.table_name,
                            "checkin_date":element.checkin_date,
                            "checkout_date":element.checkout_date,
                            "duration":element.duration,
                            "total":total,
                            "order_id":ordrid
                          };
                          totaljson.push(resjson);
                         
                      }
                    
                    }
                   
                   
                  });
                
                }
              });
            });
resolve(totaljson);

          });
         
          bar.then((response) => {
      
           console.log(response);
          
});
        
        }
        else {
          return res.json(nodatafound);
        }
      }
    });
  },
  GetDeat: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { apierrmsg }
    let query = ""
    if(req.body.type == "voucher"){
      query = 'SELECT a.*,u.name FROM tb_usage_voucher_list as a inner join users u on a.userID =  u.id where a.voucherID = ' + "'" + body.editid +"'";
    }
    if(req.body.type == "dayend"){
      query = 'select a.* from payment a inner join users u on u.id = a.userID where a.day_end_id =' + "'" + body.editid +"'";
    }
    if(req.body.type == "referal"){
      query = 'SELECT u.id as member_id,u.name as member_name,u.referral_code,u.created_at as date_time FROM users u where u.referral_code = ' + "'" + body.editid +"'";
    }
   console.log(query);
    DEAT_VOUCHER(body,query, (err, results) => { 
      console.log(results);
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      
      else if(results.length > 0){if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }}
      else{return res.json(nodatafound);}
    });
  },
  
}
