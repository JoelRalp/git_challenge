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
    EDIT_POS: (body,callBack) => {
      pool.query(
        "CALL Edit_POs(?,?,?,?,?,?,?,?,?,?,?,@a);",
        [
         body.api_token,
         body.companyname,
         body.phone,
         body.receiptheader, 
         body.receiptfooter,
         body.currency, 
         body.discount,
         body.default_tax,
         body.service_tax,
         body.timezone,  
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
     VIEW_POINTS: (body, callBack) => {
      let Api_token = body.api_token;
       pool.query(
         "CALL View_Points(?,@a);",
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
     ADD_POINTS: (body,callBack) => {
        pool.query(
          "CALL Add_Points(?,?,?,?,?,?,@a);",
          [body.api_token,
           body.name,
           body.no_rm,
           body.rate_others,
           body.rate_ewallet,
           body.points
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
      GET_POINTS_ID: (body, callBack) => {
       let Api_token = body.api_token;
       let editid = body.editid;
       editid = parseInt(editid);
       var query = "CALL Get_Web_Order_Table_By_Id(?,?,@p);" ;
     
        pool.query(  
         query ,
         [Api_token,editid],  
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
     EDIT_POINTS: (body,callBack) => {
       pool.query(
         "CALL Edit_Points(?,?,?,?,?,?,?,@a);",
         [body.api_token,
          body.name,
          body.no_rm,
          body.rate_others,
          body.rate_ewallet,
          body.points,
          body.editid
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