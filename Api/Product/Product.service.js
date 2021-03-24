const pool = require("../../config/database");

module.exports = {
 
  VIEW_PRODUCT: (body, callBack) => {
   let Api_token = body.api_token;
   
  
    pool.query(
      "CALL View_Product(?,@a);",
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
  ADD_PRODUCT: (bodynew,imgnew,callBack) => {
   
    
    var query = "CALL AddProduct(?,?,?,?,?,?,@p);" ;
  
     pool.query(  
      query ,
      [bodynew.body.api_token,bodynew.body.product_name,bodynew.body.product_sku,bodynew.body.product_category,bodynew.body.product_cost,imgnew],  
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
   GET_PRODUCT_BY_ID: (body, callBack) => {
    let Api_token = body.api_token;
    let editid = body.editid;
    var query = "CALL Get_Data_By_Id(?, ?,?,?,@p);" ;
  
     pool.query(  
      query ,
      ["product",Api_token,"id",editid],  
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
   CHANGE_PRODUCT_STATUS: (body, callBack) => {
    let Api_token = body.api_token;
    let productid = body.productid;
    let statusid = body.status;
    statusid = parseInt(statusid);
    var query = "CALL Product_Change_Status(?,?,?,@p);" ;
  
     pool.query(  
      query ,
      [Api_token,productid,statusid],  
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
   EDIT_PRODUCT: (body, callBack) => {
  
    let api = body.api_token;
    let id = body.id;
    let productname= body.product_name;
   let productsku = body.product_sku;
  let productcategory= body.product_category; 
  
  let productcost = body.product_cost;

   
    var query = "CALL Edit_Product(?,?,?,?,?,?,@p);";
     pool.query(  
      query ,
      [api,productname,productsku,productcategory,productcost,id],  
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
  DELETE_PRODUCT: (body, callBack) => {
    let Api_token = body.api_token;
    let productid = body.id;
   
    productid = parseInt(productid);
    var query = "CALL Delete_Product(?,?,@p);" ;
  
     pool.query(  
      query ,
      [Api_token,productid],  
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
   VIEW_PRODUCT_IMAGE: (body, callBack) => {
    let Api_token = body.api_token;
    let id = body.productid;
   
     pool.query(
       "CALL View_Product_Image(?,?,@a);",
       [id,Api_token],
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
     ADD_PRODUCT_IMAGE: (body,img,callBack) => {
      let Api_token = body.api_token;
      let id = body.id;
     console.log(Api_token);
       pool.query(
         "CALL Add_Product_Image(?,?,?,@a);",
         [Api_token,img,id],
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
       EDIT_PRODUCT_IMAGE: (body,img,callBack) => {
        let Api_token = body.api_token;
        let id = body.id;
      
       console.log(Api_token);
         pool.query(
           "CALL Edit_Product_Image(?,?,?,@a);",
           [Api_token,img,id],
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
         DELETE_PRODUCT_IMAGE: (body, callBack) => {
          let Api_token = body.api_token;
          let productid = body.id;
         
          productid = parseInt(productid);
          var query = "CALL Delete_Product_Image(?,?,@p);" ;
        
           pool.query(  
            query ,
            [Api_token,productid],  
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
}
