const pool = require("../../config/database");

module.exports = {
  VIEW_FEEDBACK: (body,callBack) => {
   let Api_token = body.api_token;
    pool.query(
      "CALL Customer_Feedback(?,@p);",
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
 
}