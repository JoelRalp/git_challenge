const pool = require("../../config/database");

module.exports = {
 
  VIEW_WEBORDER: (body,key,callBack) => {
    
   let Api_token = body.api_token;

   
    pool.query(
      "CALL View_WebOrderProduct(?,?,@a);",
      [Api_token,key],
      (error, results, fields) => {
         
        if (error) {    
          callBack(error);
        }
        else{
          return callBack(null,results[0]);
        }
      }
    );
   
  
   
  },
  VIEW_USER: (body,callBack) => {
    let Api_token = body.api_token;
    var code = "CALL View_Member(?,@a);";
     pool.query(
       code,
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
  ADD_WEBORDER_PRODUCT: (body,img,callBack) => {
     pool.query(
      body.query,
       (error, results, fields) => {
          
         if (error) {    
           callBack(error);
         }
         else{
           return callBack(null, results);
         }
       }
     );
   },
   COMMON: (body,callBack) => {
    pool.query(
     body.query,
      (error, results, fields) => {
         
        if (error) {    
          callBack(error);
        }
        else{
          return callBack(null, results);
        }
      }
    );
  },
   GET_WEBORDER_PRODUCT_ID: (body,key, callBack) => {
    let Api_token = body.api_token;
    let editid = body.editid;
    editid = parseInt(editid);
    var query = "CALL Get_WebOrderProduct__By_Id(?,?,?,@p);" ;
  
     pool.query(  
      query ,
      [editid,Api_token,key],  
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
   DELETE_WEBORDER_PRODUCT: (body, callBack) => {
    let Api_token = body.api_token;
    let id = body.deleteid;
    var query = "CALL Delete_WebPorder_Productt(?,?,@p);";
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
  CHANGE_WEBORDER_PRODUCT_STATUS: (body, callBack) => {
    let Api_token = body.api_token;
    let id = body.productid;
    let statusid = body.status;
    statusid = parseInt(statusid);
    var query = "CALL Change_WebORder_Product_Status(?,?,?,@p);" ;
  
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
   EDIT_WEBORDER_PRODUCT: (body,img,callBack) => {
    pool.query(
      "CALL Edit_WebOrder_Product(?,?,?,?,?,?,?,?,?,?,?,@p);",
      [body.api_token,
       body.name,
       img,
       body.description,
       body.cateID,
       body.stock_status,
       body.webcateid,
       body.price,
       body.addon,
       body.quantity,
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