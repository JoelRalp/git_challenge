const pool = require("../../config/database");

module.exports = {
 
  VIEW_PRIVACY: (body, callBack) => {
   let Api_token = body.api_token;
    pool.query(
      "CALL View_Privacy(?,@a);",
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
  ADD_PRIVACY: (body,callBack) => {
     pool.query(
       "CALL Add_Privacy(?,?,@a);",
       [body.api_token,
        body.description,
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
   VIEW_TERMS: (body, callBack) => {
    let Api_token = body.api_token;
     pool.query(
       "CALL View_Terms(?,@a);",
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
   ADD_TERMS: (body,callBack) => {
      pool.query(
        "CALL Add_Terms(?,?,@a);",
        [body.api_token,
         body.description,
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
    VIEW_POS: (body,callBack) => {
      pool.query(
        "CALL View_Pos(?,?,@a);",
        [
         body.id,
         body.api_token
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
    EDIT_POS: (body,img,callBack) => {
      pool.query(
        "CALL Edit_POs(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@a);",
        [
         body.api_token,
         body.companyname,
         img,
         body.phone,
         body.currency, 
         body.keyboard, 
         body.receiptheader, 
         body.receiptfooter,
         body.theme,  
         body.discount,
         body.tax,
         body.service_tax,  
         body.timezone,
         body.language,  
         body.stripe,
         body.stripe_secret_key, 
         body.stripe_publishable_key,  
         body.decimals,
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
    VIEW_MEMBERCARD: (body, callBack) => {
      let Api_token = body.api_token;
       pool.query(
         "CALL View_Member_Card(?,@a);",
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
     GET_MEMBERCARD_ID: (body, callBack) => {
      let Api_token = body.api_token;
      let editid = body.editid;
      editid = parseInt(editid);
      var query = "CALL Get_Member_Card_By_Id(?,?,@p);" ;
    
       pool.query(  
        query ,
        [editid,Api_token],  
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
     EDIT_MEMBERCARD: (body,img, callBack) => {
      let Api_token = body.api_token;
      let editid = body.editid;
      editid = parseInt(editid);
      var query = "CALL Edit_Member_Card(?,?,?,?,@p);" ;
    
       pool.query(  
        query ,
        [editid,Api_token,body.status,img],  
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