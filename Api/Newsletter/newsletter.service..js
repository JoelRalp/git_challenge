const pool = require("../../config/database");

module.exports = {
 
  VIEW_NEWSLETTER: (body, callBack) => {
   let Api_token = body.api_token;
    pool.query(
      "CALL View_Newsletter(?,@a);",
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
  ADD_NEWSLETTER: (body,callBack) => {
     pool.query(
       "CALL Add_Newsletter(?,?,?,?,?,@p);",
       [body.api_token,
        body.title,
        body.sub_title,
        body.description,
        body.pStatus
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
   GET_NEWSLETTER_ID: (body, callBack) => {
    let Api_token = body.api_token;
    let editid = body.editid;
    editid = parseInt(editid);
    var query = "CALL Get_Newsletter_By_Id(?,?,@p);" ;
  
     pool.query(  
      query ,
      [editid,Api_token],  
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
   DELETE_NEWSLETTER: (body, callBack) => {
    let Api_token = body.api_token;
    let id = body.deleteid;
    var query = "CALL Delete_Newsletter(?,?,@p);";
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
  CHANGE_NEWSLETTER_STATUS: (body, callBack) => {
    let Api_token = body.api_token;
    let id = body.newsid;
    let statusid = body.status;
    statusid = parseInt(statusid);
    var query = "CALL Change_Newsletter_Status(?,?,?,@p);" ;
  
     pool.query(  
      query ,
      [Api_token,id,statusid],  
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
   EDIT_NEWSLETTER: (body,callBack) => {
    pool.query(
      "CALL Edit_Newsletter(?,?,?,?,?,?,@p);",
      [body.api_token,
       body.title,
       body.sub_title,
       body.description,
       body.pStatus,
       body.editid,
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