const pool = require("../../config/database");

module.exports = {
 
  VIEW_EMPLOYEE: (body, callBack) => {
   let Api_token = body.api_token;
   
   
    pool.query(
      "CALL View_Employee(?,@a);",
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
  ADD_EMPLOYEE: (body,img,callBack) => {
     pool.query(
       "CALL Add_Employee(?,?,?,?,?,?,?,?,?,?,?,?,@a);",
       [body.api_token,body.employee_name,body.eStaffid,body.employee_email,body.employee_phone,body.employee_ic,body.employee_password,body.employee_role,img,body.gender,body.nationality,body.empid],
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
   GET_EMPLOYEE_ID: (body, callBack) => {
    let Api_token = body.api_token;
    let editid = body.editid;
    editid = parseInt(editid);
    var query = "CALL Get_Employee_By_Id(?,?,@p);" ;
  
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
   CHANGE_EMPLOYEE_STATUS: (body, callBack) => {
    let Api_token = body.api_token;
    let employeeid = body.employeeid;
    let statusid = body.status;
    statusid = parseInt(statusid);
    var query = "CALL Change_Employee_Status(?,?,?,@p);" ;
  
     pool.query(  
      query ,
      [Api_token,employeeid,statusid],  
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
   EDIT_EMPLOYEE: (body,img, callBack) => {
   
     pool.query(  
      "CALL Edit_Employee(?,?,?,?,?,?,?,?,?,?,?,?,?,@a);",
       [body.api_token,body.employee_name,body.eStaffid,body.employee_email,body.employee_phone,body.employee_ic,body.employee_password,body.employee_role,img,body.gender,body.nationality,body.empid,body.editid],  
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
   DELETE_EMPLOYEE: (body, callBack) => {
    let Api_token = body.api_token;
    let id = body.deleteid;
   
    var query = "CALL Delete_Employe(?,?,@p);";
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