const pool = require("../../config/database");

module.exports = {
 
  VIEW_POINTS: (body, callBack) => {
   let Api_token = body.api_token;
    pool.query(
      "CALL View_Points(?,@a);",
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
  ADD_POINTS: (body,callBack) => {
     pool.query(
       "CALL Add_Points(?,?,?,?,?,?,@a);",
       [body.api_token,
        body.name,
        body.no_rm,
        body.rate_others,
        body.rate_ewallet,
        body.points
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
   GET_POINTS_ID: (body, callBack) => {
    let Api_token = body.api_token;
    let editid = body.editid;
    editid = parseInt(editid);
    var query = "CALL Get_Web_Order_Table_By_Id(?,?,@p);" ;
  
     pool.query(  
      query ,
      [Api_token,editid],  
       (error, results, fields) => {
        
         if (error) {    
           callBack(error);
         }
         else{
          console.log(results);
           return callBack(null, results[0]);
         }
       }
     );
   },
  
  EDIT_POINTS: (body,callBack) => {
    pool.query(
      "CALL Edit_Points(?,?,?,?,?,?,?,@a);",
      [body.api_token,
       body.name,
       body.no_rm,
       body.rate_others,
       body.rate_ewallet,
       body.points,
       body.editid
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
  // DELETE_POINTS: (body, callBack) => {
  //   let Api_token = body.api_token;
  //   let id = body.deleteid;
  //   var query = "CALL Delete_WebOrder_Table(?,?,@p);";
  //   pool.query(
  //     query,
  //     [Api_token, id],
  //     (error, results, fields) => {
  //       if (error) {
  //         callBack(error);
  //       }
  //       else {
  //         console.log(results);
  //         return callBack(null, results[0]);
  //       }
  //     }
  //   );
  // },

}