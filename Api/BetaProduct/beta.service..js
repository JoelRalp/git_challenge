const pool = require("../../config/database");

module.exports = {
 
  VIEW_BETA_CATEGORY: (body, callBack) => {
   let Api_token = body.api_token;
    pool.query(
      "CALL View_Beta_Category(?,@a);",
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
  ADD_BETA_CATEGORY: (body,images,callBack) => {
    let Api_token = body.api_token;
     pool.query(
       "CALL Add_Beta_Category(?,?,?,?,@a);",
       [Api_token,body.name,images,body.alow_sub],
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
  GET_BETA_CATEGORY: (body,callBack) => {
    let Api_token = body.api_token;
     pool.query(
       "CALL Get_Beta_Category(?,?,@a);",
       [body.id,Api_token],
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
   CHANGE_BETA_CATEGORY_STATUS: (body,callBack) => {
    let Api_token = body.api_token;
     pool.query(
       "CALL Change_Beta_Category_Status(?,?,@a);",
       [Api_token,body.id],
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
   DELETE_BETA_CATEGORY: (body,callBack) => {
    let Api_token = body.api_token;
     pool.query(
       "CALL Delete_Beta_Category(?,?,@a);",
       [Api_token,body.deleteid],
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
   EDIT_BETA_CATEGORY: (body,images,callBack) => {
    let Api_token = body.api_token;
    console.log(body.editid);
     pool.query(
       "CALL Edit_Beta_Category(?,?,?,?,?,@a);",
       [Api_token,body.name,images,body.alow_sub,body.editId],
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
   VIEW_BETA_PRODUCT: (body, callBack) => {
    let Api_token = body.api_token;
     pool.query(
       "CALL View_Beta_Product(?,@a);",
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
   ADD_BETA_PRODUCT: (body,img,callBack) => {
     let Api_token = body.api_token;
      pool.query(
        "CALL Add_Beta_Product(?,?,?,?,?,?,?,?,?,?,@a);",
        [Api_token,body.cateName,body.subcateName,body.productName,body.sku,body.cost,body.sellingPrice,"raw",body.status,img],
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
   GET_BETA_PRODUCT: (body,callBack) => {
     console.log(body.id);
     let Api_token = body.api_token;
      pool.query(
        "CALL Get_Beta_Product(?,?,@a);",
        [body.editid,Api_token],
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
    CHANGE_BETA_PRODUCT: (body,callBack) => {
     let Api_token = body.api_token;
      pool.query(
        "CALL Change_Beta_Category_Status(?,?,@a);",
        [Api_token,body.id],
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
    DELETE_BETA_PRODUCT: (body,callBack) => {
     let Api_token = body.api_token;
      pool.query(
        "CALL Delete_Beta_Product(?,?,@a);",
        [Api_token,body.deleteid],
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
    EDIT_BETA_PRODUCT: (body,callBack) => {
     let Api_token = body.api_token;
      pool.query(
        "CALL Edit_Beta_Product(?,?,?,?,?,?,?,?,?,?,@a);",
        [Api_token,body.cateName,body.subcateName,body.productName,body.sku,body.cost,body.sellingPrice,body.type,body.status,body.editid],
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
    VIEW_BETA_SUBPRODUCT: (body, callBack) => {
      let Api_token = body.api_token;
       pool.query(
         "CALL View_Beta_Sub_Category(?,@a);",
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
     ADD_BETA_SUBPRODUCT: (body,image,callBack) => {
       console.log(image);
       let Api_token = body.api_token;
        pool.query(
          "CALL Add_Beta_Sub_Category(?,?,?,?,@a);",
          [Api_token,body.cateName,body.subName,image],
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
     GET_BETA_SUBPRODUCT: (body,callBack) => {
       let Api_token = body.api_token;
        pool.query(
          "CALL Get_Beta_Sub_Category(?,?,@a);",
          [body.id,Api_token],
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
      CHANGE_BETA_SUBPRODUCT: (body,callBack) => {
       let Api_token = body.api_token;
        pool.query(
          "CALL Change_Beta_Sub_Product_Status(?,?,@a);",
          [Api_token,body.id],
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
      DELETE_BETA_SUBPRODUCT: (body,callBack) => {
       let Api_token = body.api_token;
        pool.query(
          "CALL Delete_Beta_Sub_Category(?,?,@a);",
          [Api_token,body.deleteid],
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
      EDIT_BETA_SUBPRODUCT: (body,img,callBack) => {
       let Api_token = body.api_token;
       console.log(img);
        pool.query(
          "CALL Edit_Beta_Sub_Category(?,?,?,?,?,@a);",
          [Api_token,body.cateName,body.subName,body.editid,img],
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
      GET_SUB_PRO: (body,callBack) => {
        let Api_token = body.api_token;
         pool.query(
           "CALL Get_SubPro_Pro(?,?,@a);",
           [Api_token,body.cateid],
           (error, results, fields) => {         
             if (error) {    
               callBack(error);
             }
             else{
               return callBack(null, results[0]);
             }
           }
         );
       }
}