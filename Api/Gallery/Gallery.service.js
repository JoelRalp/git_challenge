const pool = require("../../config/database");
module.exports = {
	COMMON:(data,callBack)=>{
    pool.query(
      data.query,
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log(results);
        return callBack(null, results);
      }
    );
  },

  Gallery_View:(data,callBack)=>{
  	var aapi_token=data.api_token;
  	var query = "CALL view_admin_gallery(?,@p)";
  	pool.query(
      query,
      [aapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },
  Gallery_delete:(data,callBack)=>{
  	var aapi_token=data.api_token;
  	var deleteid=data.deleteid;
  	var query = "CALL delete_admin_gallery(?,?,@p)";
  	pool.query(
      query,
      [aapi_token,deleteid],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },
}