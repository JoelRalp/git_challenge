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
  PAYMENT_REPORT: (body,code, callBack) => {
    let Api_token = body.api_token;
     pool.query(
       "CALL EXEC_STRING(?,?,@a);",
       [Api_token,code],
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
   TOPUP_REPORT: (body,code, callBack) => {
    let Api_token = body.api_token;
     pool.query(
       "CALL EXEC_STRING(?,?,@a);",
       [Api_token,code],
       (error, results, fields) => {
          
         if (error) {    
           callBack(error);
         }
         else{
           return callBack(null, results[0]);
         }
       }
     );
   },//DAYEND_REPORT
   DAYEND_REPORT: (body,code, callBack) => {
    let Api_token = body.api_token;
     pool.query(
       "CALL EXEC_STRING(?,?,@a);",
       [Api_token,code],
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
   REFERAL_REPORT: (body,code, callBack) => {
    let Api_token = body.api_token;
     pool.query(
       "CALL EXEC_STRING(?,?,@a);",
       [Api_token,code],
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
   RESERVATION_REPORT: (body,code, callBack) => {
    let Api_token = body.api_token;
     pool.query(
       "CALL EXEC_STRING(?,?,@a);",
       [Api_token,code],
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
   //RESERVATION_REPORT
}