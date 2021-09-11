const pool = require("../../config/database");

module.exports = {
 
 
    VIEW_VOUCHER: (body, callBack) => {
      let Api_token = body.api_token;
      
     
       pool.query(
         "CALL View_External_Voucher(?,@a);",
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
    ADD_VOUCHER: (bodynew,imgnew,callBack) => {
      var body = bodynew.body;
      let cateIDnew = body.cateID;
      let link = body.link;
      let discount_typenew = body.discount_type;
      let voucher_codenew = body.voucher_code;
      let titlenew = body.title;
      let descriptionnew = body.description;
      let photonew = imgnew;    
      let addDatenew = null;
      let color_codenew = body.color_code;
      let typesnew = body.types;
      let types_valuenew = body.types_value;
      let apply_tonew = body.apply_to;
      let apply_to_valuenew = body.apply_to_value;
      let countrynew = body.country;
      let country_valuenew = body.ountry_value;
      let ship_ratenew = body.country_value;
      let ship_rate_valuenew = body.ship_rate;
      let cust_buynew = body.cust_buy;
      let cust_buy_value1new = body.cust_buy_value1;
      let cust_buy_value2new = body.cust_buy_value2;
      let cust_getnew = body.cust_get;
      let cust_get_value1new = body.cust_get_value1;
      let cust_get_value2new = body.cust_get_value2;
      let at_discountnew = body.at_discount;
      let at_discount_valuenew = body.at_discount_value;
      let set_min_ordernew = body.set_min_order;
      let set_min_order_valuenew = body.set_min_order_value;
      let min_reqnew = body.min_req;
      let min_req_valuenew = body.min_req_value;
      let cus_elgnew = body.cus_elg;
      let cus_elg_valuenew = body.cus_elg_value;
      let usage_limitnew = body.usage_limit;
      let usage_limit_valuenew = body.usage_limit_value;
      let total_vou_countnew = body.total_vou_count;
      let limt_pernew = body.limt_per;
      let limit_per_valuenew = body.limit_per_value;
      let start_datenew = body.start_date;
      let start_timenew = body.start_time;
      let end_datenew = body.end_date;
      let end_timenew = body.end_time;
      let expired_datenew = body.expired_date;
      let expired_timenew = body.expired_time;
      let redeemname = body.redeem_name;
      let redeemvalue = body.redeem_value;
      let vStatusnew = body.vStatus;
      let Subtitle = body.sub_title;
     
      
       if(!cateIDnew ){cateIDnew =null}
      else if(! discount_typenew ){discount_typenew = null; }
      else if(! voucher_codenew ){ voucher_codenew = null;}
      else if(! redeemname ){redeemname = null; }
      else if(! redeemvalue ){ redeemvalue = null;}
      else if(! titlenew ){titlenew = null;}
      else if(! descriptionnew ){descriptionnew = null;}
      else if(! photonew){photonew = null;}  
      else if(! addDatenew){addDatenew = null;}
      else if(! color_codenew ){color_codenew = null;}
      else if(! typesnew ){typesnew = null;}
      else if(! types_valuenew ){types_valuenew = null;}
      else if(! apply_tonew ){apply_tonew = null;}
      else if(! apply_to_valuenew ){apply_to_valuenew = null}
      else if(! countrynew ){countrynew = null;}
      else if(! country_valuenew ){country_valuenew = null;}
      else if(! ship_ratenew ){ship_ratenew = null;}
      else if(! ship_rate_valuenew ){ship_rate_valuenew = null;}
      else if(! cust_buynew ){cust_buynew = null}
      else if(! cust_buy_value1new ){cust_buy_value1new = null}
      else if(! cust_buy_value2new ){cust_buy_value2new = null}
      else if(! cust_getnew ){cust_getnew = null;}
      else if(! cust_get_value1new ){cust_get_value1new = null;}
      else if(! cust_get_value2new ){cust_get_value2new = null;}
      else if(! at_discountnew ){at_discountnew = null;}
      else if(! at_discount_valuenew ){at_discount_valuenew = null;}
      else if(! set_min_ordernew ){set_min_ordernew = null;}
      else if(! set_min_order_valuenew ){set_min_order_valuenew = null}
      else if(! min_req_valuenew ){min_req_valuenew = null;}
      else if(! cus_elgnew ){cus_elgnew = null;}
      else if(! cus_elg_valuenew ){cus_elg_valuenew = null;}
      else if(! usage_limitnew ){usage_limitnew = null;}
      else if(! usage_limit_valuenew ){usage_limit_valuenew = null;}
      else if(! total_vou_countnew ){total_vou_countnew = null;}
      else if(! limt_pernew ){limt_pernew = null;}
      else if(! limit_per_valuenew ){limit_per_valuenew = null;}
      else if(! start_datenew ){start_datenew = null;}
      else if(! start_timenew ){start_timenew = null;}
      else if(! end_datenew ){end_datenew = null;}
      else if(! end_timenew ){end_timenew = null;}
      else if(! expired_datenew ){expired_datenew = null;}
      else if(! expired_timenew ){expired_timenew = null;}
      else if(! vStatusnew ){vStatusnew = null;}
      else if(! link ){link = null;}
      else if(! Subtitle ){Subtitle = null;}
     
      var query = "CALL Add_Voucher(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@p);" ;
    
       pool.query(  
        query ,        
         [
           body.api_token,
           cateIDnew,
           discount_typenew,
           voucher_codenew,
           titlenew,
           descriptionnew,
           photonew,
           color_codenew,
           typesnew,
           types_valuenew,
           apply_tonew,
           apply_to_valuenew,
           cus_elgnew,
           cus_elg_valuenew,
           usage_limitnew,
           usage_limit_valuenew,
           total_vou_countnew,
           limt_pernew,
           limit_per_valuenew,
           start_datenew,
           start_timenew,
           end_datenew,
           end_timenew,
           expired_datenew,
           expired_timenew,
           redeemname,
           redeemvalue,
           link,
           vStatusnew,
           Subtitle
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
     GET_EXP_VOUCHER_BY_ID: (body, callBack) => {
      let Api_token = body.api_token;
      let editid = body.id;
      var query = "CALL Get_Exp_Voucher_By_Id(?,?,@p);" ;
    
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
     ADD_APP_VOUCHER: (req,callBack) => {
     
      let body = req;
      var query = "CALL Add_New_Voucher(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@p);" ;
       pool.query(  
        query ,        
         [
body.api_token,
body.voucher_code_IN ,
body.total_redeem_limit_IN ,
body.total_redeem_limit_value_IN ,
body.total_redeem_per_day_IN ,
body.total_redeem_per_day_value_IN ,
body.total_redeem_per_customer_IN ,
body.total_redeem_per_customer_value_IN ,
body.category_IN ,
body.available_outlet_IN ,
body.photo_path ,  
body.tump_path ,
body.brand_IN ,
body.voucher_title_IN ,
body.voucher_desc_IN ,
body.redeemable_IN ,
body.redeemable_value_IN ,
body.customer_eligiblity_IN ,
body.customer_eligiblity_value_IN ,
body.voucher_type_IN ,
body.apply_to_channel_IN , 
body.start_date_IN ,
body.start_time_IN ,
body.end_date_IN ,
body.end_time_IN ,
body.expiry_date_IN ,
body.expiry_time_IN ,
body.activation_day_IN ,
body.total_reddem_cus,
body.total_reddem_cus_value
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
     ADD_EXTERNAL_APP_VOUCHER: (req,callBack) => {
      let body = req;
      var query = "CALL Add_External_Voucher(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@p);" ;
       pool.query(  
        query ,        
         [
          body.api_token,
          body.voucher_code_type_new,
          body.voucher_code_new ,
          body.no_of_code_new,
          body.code_length_new,
          body.code_prefix_new ,
          body.usage_limit_new,
          body.usage_limit_value_new ,
          body.category_new,
          body.outlet_new,
          body.title_new ,
          body.description_new  ,
          body.voucher_type_new ,
          body.apply_to_channel_new ,
          body.start_date_new,
          body.start_time_new  ,
          body.end_date_new  ,
          body.end_time_new  ,
          body.activation_day_new 
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
     GET_VOUCHER_BY_ID: (body, callBack) => {
      let Api_token = body.api_token;
      let editid = body.id;
      var query = "CALL Get_Voucher_By_Id(?,?,@p);" ;
    
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
     GET_APP_VOUCHER_BY_ID: (body, callBack) => {
      let Api_token = body.api_token;
      let editid = body.id;
      var query = "CALL Get_App_Voucher_By_Id(?,?,@p);" ;
    
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
     COMMON: (body,callBack) => {       
       pool.query(  
        body.query ,
         (error, results, fields) => {
          
           if (error) {  
            setTimeout(() => {
              callBack(error);
            });  
            
           }
           else{
             setTimeout(() => {
              return callBack(null, results);
            }); 
            
           }
         }
       );
     },
     CHANGE_VOUCHER_STATUS: (body, callBack) => {
      let Api_token = body.api_token;
      let vouid = body.voucherid;
      let statusid = body.status;
     let statusnewid = parseInt(statusid);
      var query = "CALL Change_Voucher_Status(?,?,?,@p);" ;
    
       pool.query(  
        query ,
        [Api_token,vouid,statusnewid],  
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
     CHANGE_EXP_VOUCHER_STATUS: (body, callBack) => {
      let Api_token = body.api_token;
      let vouid = body.voucherid;
      let statusid = body.status;
     let statusnewid = parseInt(statusid);
      var query = "CALL Change_Exp_Voucher_Status(?,?,?,@p);" ;
    
       pool.query(  
        query ,
        [Api_token,vouid,statusnewid],  
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
   EDIT_VOUCHER: (bodynew,imgnew, callBack) => {
    var body = bodynew;
    let api = body.api_token;
    let id = body.id;
    let cateIDnew = body.cateID;
    let discount_typenew = body.discount_type;
    let voucher_codenew = body.voucher_code;
    let titlenew = body.title;
    let descriptionnew = body.description;
    let photonew = imgnew;    
    let addDatenew = body.addDate;
    let color_codenew = body.color_code;
    let typesnew = body.types;
    let types_valuenew = body.types_value;
    let apply_tonew = body.apply_to;
    let apply_to_valuenew = body.apply_to_value;
    let cus_elgnew = body.cus_elg;
    let cus_elg_valuenew = body.cus_elg_value;
    let usage_limitnew = body.usage_limit;
    let usage_limit_valuenew = body.usage_limit_value;
    let total_vou_countnew = body.total_vou_count;
    let limt_pernew = body.limt_per;
    let limit_per_valuenew = body.limit_per_value;
    let start_datenew = body.start_date;
    let start_timenew = body.start_time;
    let end_datenew = body.end_date;
    let end_timenew = body.end_time;
    let expired_datenew = body.expired_date;
    let expired_timenew = body.expired_time;
    let vStatusnew = body.vStatus;
    let redeemname = body.redeem_name;
    let redeemvalue = body.redeem_value;
    let link = body.link;
    let Subtitle = body.sub_title;
    
    let enddate = end_datenew + " " + end_timenew;
    let expdate = expired_datenew + " " + expired_timenew;
    var query = `UPDATE tb_voucher
    SET
    cateID ='` + cateIDnew + `',
    discount_type ='` + discount_typenew + `',
    voucher_code ='` + voucher_codenew+ `',
    title ='` + titlenew + `',
    description ='` + descriptionnew+ `',
    photo ='` +photonew+ `',
    color_code ='` + color_codenew+ `',
    types ='` + typesnew+ `',
    types_value ='` + types_valuenew+ `',
    apply_to ='` + apply_tonew+ `',
    apply_to_value ='` + apply_to_valuenew+ `',
    cus_elg ='` + cus_elgnew+ `',
    cus_elg_value ='` + cus_elg_valuenew+ `',
    usage_limit ='` + usage_limitnew+ `',
    usage_limit_value ='` + usage_limit_valuenew+ `',
    total_vou_count ='` + total_vou_countnew+ `',
    limt_per ='` + limt_pernew+ `',
    limit_per_value ='` + limit_per_valuenew+ `',
    start_date ='` + start_datenew+ `',
    start_time ='` + start_timenew+ `',
    end_date ='` + end_datenew+ `',
    end_time ='` + end_timenew+ `',
    expired_date ='` + expired_datenew+ `',
    expired_time ='` + expired_timenew+ `',
    redeem_name ='` + redeemname+ `',
    redeem_value ='` + redeemvalue+ `',
    link ='` + link+ `',
    vStatus ='` + vStatusnew+ `',
    created_at = now(),
    updated_at =now(),
    end  ='` + enddate + `',
    expire ='` +expdate + `',
    subtitle ='` + Subtitle+ `'
    WHERE id ='` + id + `'`;
    
     pool.query(  
      query ,
      
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
   
  DELETE_PRODUCT: (body, callBack) => {
    let Api_token = body.api_token;
    let delid = body.id;
   
    delid = parseInt(delid);
    var query = "CALL Delete_Voucher(?,?,@p);" ;
  
     pool.query(  
      query ,
      [Api_token,delid],  
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
   DELETE_APP_PRODUCT: (body, callBack) => {
    let Api_token = body.api_token;
    let delid = body.id;
   
    delid = parseInt(delid);
    var query = "CALL Delete_App_Voucher(?,?,@p);" ;
  
     pool.query(  
      query ,
      [Api_token,delid],  
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
   EDIT_APP_VOUCHER: (body, callBack) => {
   
    var query = "CALL Edit_App_Voucher(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@p);" ;
  
     pool.query(  
      query ,
      [ body.api_token , 
        body.voucher_code_new,
        body.total_redeem_limit_new ,
        body.total_redeem_limit_value_new ,
        body.total_redeem_per_day_new ,
        body.total_redeem_per_day_value_new ,
        body.total_redeem_per_customer_new ,
        body.total_redeem_per_customer_value_new ,
        body.category_new ,
        body.available_outlet_new ,
        body.voucher_image_new ,
        body.thumbnail_image_new ,
        body.brand_new ,
        body.voucher_title_new ,
        body.voucher_desc_new ,
        body.redeemable_new ,
        body.redeemable_value_new ,
        body.customer_eligiblity_new ,
        body.customer_eligiblity_value_new ,
        body.voucher_type_new ,
        body.apply_to_channel_new ,
        body.start_date_new ,
        body.start_time_new ,
        body.end_date_new ,
        body.end_time_new ,
        body.expiry_date_new ,
        body.expiry_time_new ,
        body.activation_day_new ,
        body.id,
      body.total_reddem_cus,
      total_reddem_cus_value],  
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
   EDIT_EXP_VOUCHER: (body, callBack) => {
   
    var query = "CALL Edit_Exp_Voucher(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@p);" ;
  
     pool.query(  
      query ,
      [ body.api_token,
        body.voucher_code_type_new,
        body.voucher_code_new ,
        body.no_of_code_new,
        body.code_length_new,
        body.code_prefix_new ,
        body.usage_limit_new,
        body.usage_limit_value_new ,
        body.category_new,
        body.outlet_new,
        body.title_new ,
        body.description_new  ,
        body.voucher_type_new ,
        body.apply_to_channel_new ,
        body.start_date_new,
        body.start_time_new  ,
        body.end_date_new  ,
        body.end_time_new  ,
        body.activation_day_new ,
        body.id],  
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
   CHANGE_APP_VOUCHER_STATUS: (body, callBack) => {
    let Api_token = body.api_token;
    let vouid = body.voucherid;
    let statusid = body.status;
   let statusnewid = parseInt(statusid);
    var query = "CALL Change_App_Voucher_Status(?,?,?,@p);" ;
     pool.query(  
      query ,
      [Api_token,vouid,statusnewid],  
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
   DEFINE_SCHEDULER: (body, callBack) => {
    var query = "CALL Define_Scheduler(@p);" ;
     pool.query(  
      query , 
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
