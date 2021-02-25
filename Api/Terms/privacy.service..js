const pool = require("../../config/database");

module.exports = {
 
  VIEW_TERMS: (body, callBack) => {
   let Api_token = body.api_token;
    pool.query(
      "CALL View_Terms(?,@a);",
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
  ADD_TERMS: (body,callBack) => {
     pool.query(
       "CALL Add_Terms(?,?,@a);",
       [body.api_token,
        body.description,
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