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
            console.log(error);
          callBack(error);
        }
        else{

        }
      
        return callBack(null, results[0]);
      }
    );
  }
}