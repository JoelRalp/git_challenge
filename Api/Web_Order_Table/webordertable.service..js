const pool = require("../../config/database");

module.exports = {
 
  VIEW_WEBORDERTABLE: (body, callBack) => {
   let Api_token = body.api_token;
    pool.query(
      "CALL View_Webordertable(?,@a);",
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
  ADD_WEBORDER_TABLE: (body,callBack) => {
     pool.query(
       "CALL Add_WebOrder_Table(?,?,?,?,@a);",
       [body.api_token,
        body.table_no,
        body.max_per,
        body.outlet
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
   GET_WEBORDER_TABLE_ID: (body, callBack) => {
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
   CHANGE_WEBORDER_TABLE_STATUS: (body, callBack) => {
    let Api_token = body.api_token;
    let tableid = body.tableid;
    let statusid = body.status;
    statusid = parseInt(statusid);
    var query = "CALL Change_Weborder_Table_Status(?,?,?,@p);" ;
  
     pool.query(  
      query ,
      [Api_token,tableid,statusid],  
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
   EDIT_WEBORDER_TABLE: (body,callBack) => {
    pool.query(
      "CALL Edit_WebOrder_Table(?,?,?,?,?,@a);",
      [body.api_token,
       body.table_no,
       body.max_per,
       body.outlet,
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
  DELETE_WEBORDER_TABLE: (body, callBack) => {
    let Api_token = body.api_token;
    let id = body.deleteid;
    var query = "CALL Delete_WebOrder_Table(?,?,@p);";
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