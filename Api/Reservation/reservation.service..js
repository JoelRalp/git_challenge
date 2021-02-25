const pool = require("../../config/database");

module.exports = {
 
  VIEW_RESERVATION_TABLE: (body, callBack) => {
   let Api_token = body.api_token;
    pool.query(
      "CALL View_Reservation(?,@a);",
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
  ADD_RESERVATION_TABLE: (body,callBack) => {
     pool.query(
       "CALL Add_Reservation(?,?,?,?,?,?,?,?,?,?,@a);",
       [body.api_token,
        body.outID,
        body.date,
        body.time,
        body.pax1,
        body.pax2,
        body.name,
        body.phone,
        body.description,
        body.out_area],
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
  
  DELETE_RESERVATION: (body, callBack) => {
    let Api_token = body.api_token;
    let id = body.deleteid;
    var query = "CALL Delete_Reservation(?,?,@p);";
    pool.query(
      query,
      [Api_token, id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        else {
          console.log(results);
          return callBack(null, results[0]);
        }
      }
    );
  },

}