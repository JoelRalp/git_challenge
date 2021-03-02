const pool = require("../../config/database");

module.exports = {
  VOUCHER_REPORT: (body,code, callBack) => {
   let Api_token = body.api_token;
    pool.query(
      "CALL Voucher_Report(?,?,?,?,?,?,@a);",
      [Api_token,body.order_by,code,body.title,body.category,body.types],
      (error, results, fields) => {
         
        if (error) {    
          callBack(error);
        }
        else{
          return callBack(null, results[0]);
        }
      }
    );
  },
 
}