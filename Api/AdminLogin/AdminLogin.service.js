const pool = require("../../config/database");

module.exports = {
 
  GetAdmin: (body, callBack) => {
   let E_mail = body.email;
   let Password = body.password;
  
    pool.query(
      "CALL Admin_Login(?,?,@a);",
      [E_mail,Password],
      (error, results, fields) => {
         
        if (error) {
         
          callBack(error);
        }
        else{
          callBack(null,results);
        }
      
        return callBack(null, results[0]);
      }
    );
  },//View_Admin
  View_Admin: (body, callBack) => {
    let api_token = body.api_token;
  
     pool.query(
       "CALL View_Admin(?,@a);",
       [api_token],
       (error, results, fields) => {
          
         if (error) {
          
           callBack(error);
         }
         else{
           callBack(null,results[0]);
         }
       
        
       }
     );
   },
   View_User_Admin: (body, callBack) => {
    let api_token = body.api_token;
  
     pool.query(
       "CALL view_home_user(?,@a);",
       [api_token],
       (error, results, fields) => {
          
         if (error) {
          
           callBack(error);
         }
         else{
           callBack(null,results[0]);
         }
       
        
       }
     );
   },
}