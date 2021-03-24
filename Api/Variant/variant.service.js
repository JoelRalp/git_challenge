const pool = require("../../config/database");

module.exports = {

  VIEW_VARIANT: (body, callBack) => {
    let Api_token = body.api_token;


    pool.query(
      "CALL View_Variation(?,@a);",
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
  ADD_VARIANT: (body, callBack) => {
    let Api_token = body.api_token;


    pool.query(
      "CALL Add_Variant(?,?,@a);",
      [Api_token,body.name],
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
  EDIT_VARIANT: (body, callBack) => {
    let Api_token = body.api_token;


    pool.query(
      "CALL Edit_Variant(?,?,?,@a);",
      [Api_token,body.name,body.variationid],
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
  GET_VARIANT: (body, callBack) => {
    let Api_token = body.api_token;
    let editid = body.editid;
    editid = parseInt(editid);
    var query = "CALL Get_Variant_By_Id(?,?,@p);";

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
  CHANGE_VARIANT_STATUS: (body, callBack) => {
    let Api_token = body.api_token;
    let id = body.variationid;
    id = parseInt(body.variationid);
    let statusid = body.status;
    statusid = parseInt(statusid);
    var query = "CALL Change_Variant_Status(?,?,?,@p);" ;
  
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
   DELETE_VARIANT: (body, callBack) => {
    let Api_token = body.api_token;
    let Varid = body.deleteid;

    Varid = parseInt(Varid);
    var query = "CALL Delete_Variant(?,?,@p);";

    pool.query(
      query,
      [Api_token, Varid],
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
  