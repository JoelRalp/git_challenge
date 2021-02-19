const pool = require("../../config/database");
 
module.exports = {
	Login_Merchant: (data, callBack) => {
		//console.log(data);
    var query = "Select * from merchant where staffID = '" + data.merchantid + "'";
    pool.query(
      query,
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  Point_Payment:(data,callBack) =>{
  	var user_token = data.user_token;
  	var merchant_token =data.merchant_token;
  	var amount =data.amount;
  	//console.log(user_token);
  	var query = "CALL payment_point(?,?,?,@p)";
    pool.query(
      query,
      [user_token,merchant_token,amount],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results);
        return callBack(null, results[0]);
      }
    );
  },

  // ADD_CATEGORY: (body, callBack) => {
   
  //   let catname = body.Category_name;
  //   let imgname = body.Img_name.name;
  //   var datindd = new Date().toISOString().split('T')[0];
   
  //   imagename= "cat" + "_" + new Date();
  //   var query = "CALL Add_Category(?, ?,?,?,?,?,?,?,?,@p);" ;
  
  //    pool.query(  
  //     query ,
  //     [catname,imgname,0,0,0,0,0,datindd,datindd],  
  //      (error, results, fields) => {
        
  //        if (error) {    
  //          callBack(error);
  //        }
  //        else{
          
  //          return callBack(null, results[0]);
  //        }
  //      }
  //    );
  //  },


}