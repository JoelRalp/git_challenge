const pool = require("../../config/database");

module.exports = {
 
  VIEW_OUTLET: (body, callBack) => {
   let Api_token = body.api_token;
   
   
    pool.query(
      "CALL View_Data(?,?,@a);",
      ["tb_outlet",Api_token],
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
  ADD_OUTLET: (body,imgnew, callBack) => {
    var query =  "CALL Add_Outlet(?,?,?,?,?,?,?,?,?,@a);";
     pool.query(  
      query ,
      [body.api_token,body.outlet_name,body.phone,body.email,body.address,body.coordinates,body.work_hour,imgnew,body.outStatus],  
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
   GET_OUTLET_ID: (body, callBack) => {
    let Api_token = body.api_token;
    let editid = body.editid;
    editid = parseInt(editid);
    var query = "CALL Get_Outlet_By_Id(?,?,@p);" ;
  
     pool.query(  
      query ,
      [editid,Api_token],  
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
   CHANGE_OUTLET_STATUS: (body, callBack) => {
    let Api_token = body.api_token;
    let outid = body.outletid;
    let statusid = body.status;
    statusid = parseInt(statusid);
    var query = "CALL Change_Outlet_Status(?,?,?,@p);" ;
  
     pool.query(  
      query ,
      [Api_token,outid,statusid],  
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
   EDIT_OUTLET: (body,img, callBack) => {
    
    var query = "CALL Edit_Outlet(?,?,?,?,?,?,?,?,?,?,@p);" ;
  
     pool.query(  
      query ,
      [body.id,body.api_token,body.outlet_name,body.phone,body.email,body.address,body.coordinates,body.work_hour,img,body.outStatus],  
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
   DELETE_OUTLET: (body, callBack) => {
     let Api_token = body.api_token;
     let Outid = body.id;
     Outid = parseInt(Outid);
     var query = "CALL Delete_Employe(?,?,@p);";
     pool.query(
       query,
       [Api_token, Outid],
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