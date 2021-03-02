const fs = require("fs");
const { Console } = require("console");
const {VOUCHER_REPORT} = require("./Report.service.");
const { makeid, refresh } = require("../Mqtt/server");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")


module.exports = {
  voucherReport: (req, res) => {
   
    const body = req.body;
    var code = 0;
    var query = "SELECT a.id,a.title,a.types_value,a.types,a.usage_limit_value,a.total_vou_count,a.at_discount,a.usage_limit,b.cateName FROM tb_voucher a , tb_voucher_category b where a.cateID = b.id and"
 
    if (req.body.title) {//code = 1
      query = query + "\xa0" + "and a.title = titlenew and";
    }
    if (req.body.category) {//code =2
      query = query + "\xa0" + "b.cateName = category and"//code = 3
    }
    if (req.body.types) {
      query = query + "\xa0" + "types = typesnew and";//code= 4
    }

    if (req.body.order_by) {
      var queryendnew = query.substr(query.length - 3); // => "Tabs1"
      if (queryendnew = "and") {
        query = query.slice(0, -4)
        
      }
      query = query + "\xa0" + "order by a.id" + "\xa0" + body.order_by ;//code5
      
    }

    var queryend = query.substr(query.length - 3); // => "Tabs1"
   
    if (queryend == "and") {

      query = query.slice(0, -3)
    }
    query = query + ";";
    console.log(query);
    VOUCHER_REPORT(body,query, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  
}
