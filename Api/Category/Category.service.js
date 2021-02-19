const pool = require("../../config/database");

module.exports = {
 
  VIEW_CATEGORY: (body, callBack) => {
   let Api_token = body.api_token;
   
   
    pool.query(
      "CALL View_Data(?,?,@a);",
      ["category",Api_token],
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
  ADD_CATEGORY: (body, callBack) => {
   
    let catname = body.Category_name;
    let imgname = body.Img_name.name;
    var datindd = new Date().toISOString().split('T')[0];
   
    imagename= "cat" + "_" + new Date();
    var query = "CALL Add_Category(?, ?,?,?,?,?,?,?,?,@p);" ;
  
     pool.query(  
      query ,
      [catname,imgname,0,0,0,0,0,datindd,datindd],  
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
  GET_CATEGORY_BY_ID: (body, callBack) => {
    let Api_token = body.api_token;
    let editid = body.editid;
    var query = "CALL Get_Data_By_Id(?, ?,?,?,@p);" ;
  
     pool.query(  
      query ,
      ["category",Api_token,"id",editid],  
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
  
   EDIT_CATEGORY: (body, callBack) => {
   
    let catname = body.Category_name;
    let imgname = body.Img_name.name;
    let api = body.api_token1;
    let idd = body.id;
   
    imagename= "cat" + "_" + new Date();
    var query = "CALL Edit_Category(?,?,?,?,@p);";
     pool.query(  
      query ,
      [api,idd,catname,imgname],  
       (error, results, fields) => {
        console.log(results);
         if (error) {    
           callBack(error);
         }
         else{
          
           return callBack(null, results[0]);
         }
       }
     );
   },
    CHANGE_CATEGORY_STATUS: (body, callBack) => {
    let Api_token = body.api_token;
    let cateid = body.cateid;
    let statusid = body.status;
    statusid = parseInt(statusid);
    var query = "CALL Category_Change_Status(?,?,?,@p);" ;
  
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

}