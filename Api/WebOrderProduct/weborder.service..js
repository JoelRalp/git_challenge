const pool = require("../../config/database");

module.exports = {
 
  VIEW_WEBORDER: (body, callBack) => {
   let Api_token = body.api_token;
    pool.query(
      "CALL View_WebOrderProduct(?,@a);",
      [Api_token],
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
  ADD_WEBORDER: (body,img,callBack) => {
     pool.query(
       "CALL Add_Employee(?,?,?,?,?,?,?,@a);",
       [body.api_token,
        body.name,
        img,
        body.description,
        body.cateID,
        body.stock_status,
        body.status
       ],
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