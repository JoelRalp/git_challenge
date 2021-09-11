const pool = require("../../config/database");

module.exports = {

  VIEW_VOUCHER_CATEGORY: (body, callBack) => {
    let Api_token = body.api_token;


    pool.query(
      "CALL View_Voucher_Category(?,@a);",
      [Api_token],
      (error, results, fields) => {

        if (error) {
          callBack(error);
        }
        else {
          return callBack(null, results[0]);
        }
      }
    );
  },
  ADD_VOUCHER_CATEGORY: (body, callBack) => {
    var query = "CALL Add_Voucher_Category(?,?,?,?,@a);";
    pool.query(
      query,
      [body.api_token, body.cateName, body.cateStatus,body.cateType],
      (error, results, fields) => {

        if (error) {
          callBack(error);
        }
        else {

          return callBack(null, results[0]);
        }
      }
    );
  },
  EDIT_VOUCHER_CATEGORY: (body, callBack) => {
    var query = "CALL Edit_Voucher_Category(?,?,?,?,?,@a);";
    pool.query(
      query,
      [body.id, body.api_token, body.cateName, body.cateStatus,body.cateType],
      (error, results, fields) => {

        if (error) {
          callBack(error);
        }
        else {

          return callBack(null, results[0]);
        }
      }
    );
  },
  GET_VOUCHER_CATEGORY: (body, callBack) => {
    let Api_token = body.api_token;
    let editid = body.editid;
    editid = parseInt(editid);
    var query = "CALL Get_Voucher_Category_By_Id(?,?,@p);";

    pool.query(
      query,
      [editid, Api_token],
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
  CHANGE_VOUCHER_CATEGORY_STATUS: (body, callBack) => {
    let Api_token = body.api_token;
    let cateid = body.cateid;
    let statusid = body.status;
    statusid = parseInt(statusid);
    var query = "CALL Change_Voucher_Category_Status(?,?,?,@p);" ;
  
     pool.query(  
      query ,
      [Api_token,cateid,statusid],  
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
   DELETE_VOUCHER_CATEGORY: (body, callBack) => {
    let Api_token = body.api_token;
    let Voucatid = body.id;

    Voucatid = parseInt(Voucatid);
    var query = "CALL Delete_Voucher_Category(?,?,@p);";

    pool.query(
      query,
      [Api_token, Voucatid],
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

  Category_View:(data,callBack) => {
    var aapi_token = data.api_token;
    var vtype = data.type;
    var query = "CALL view_voucher_category_add(?,?,@p);";
     pool.query(
      query,
      [aapi_token,vtype],
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
