const pool = require("../../config/database");
module.exports = {
	Admin_login:(data,callBack)=>{
		var aemail=data.email;
		var apassword=data.password;
		var query = "CALL login_admin(?,?,@p)";
		pool.query(
	      query,
	      [aemail,apassword],
	      (error, results, fields) => {
	        if (error) {
	          callBack(error);
	        }
	        //console.log(mapi_token);
	        return callBack(null, results[0]);
	      }
    	);
	},

	Password_reset:(data,callBack)=>{
		var aapi_token=data.api_token;
		var query = "CALL reset_password_admin(?,@p)";
		pool.query(
	      query,
	      [aapi_token],
	      (error, results, fields) => {
	        if (error) {
	          callBack(error);
	        }
	        //console.log(mapi_token);
	        return callBack(null, results[0]);
	      }
    	);
	},
	COMMON:(data,callBack)=>{
    pool.query(
      data.query,
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },
}