const pool = require("../../config/database");

module.exports = {
 
  VIEW_VOUCHER: (body, callBack) => {
   let Api_token = body.api_token;
   
  
    pool.query(
      "CALL View_Voucher(?,@a);",
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
     console.log(bodynew);
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
     
      let qrcodenew = null;
      let barcodenew = null;
      
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
      else if(! subtitle ){subtitle = null;}
     
      var query = "CALL Add_Voucher(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@p);" ;
    
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
          addDatenew,
          color_codenew,
          typesnew,
          types_valuenew,
          apply_tonew,
          apply_to_valuenew,
          countrynew,
          country_valuenew,
          ship_ratenew,
          ship_rate_valuenew,
          cust_buynew,
          cust_buy_value1new,
          cust_buy_value2new,
          cust_getnew,
          cust_get_value1new,
          cust_get_value2new,
          at_discountnew,
          at_discount_valuenew,
          set_min_ordernew,
          set_min_order_valuenew,
          min_reqnew,
          min_req_valuenew,
          cus_elgnew,
          cus_elg_valuenew,
          usage_limitnew,
          usage_limit_valuenew,
          total_vou_countnew,
          limt_pernew,
          limit_per_valuenew,
          start_datenew,start_timenew,
          end_datenew,end_timenew,
          expired_datenew,
          expired_timenew,        
          redeemname,
          redeemvalue,
          link,
          vStatusnew,
          Subtitle,
         
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
    let vStatusnew = body.vStatus;
    let redeemname = body.redeem_name;
    let redeemvalue = body.redeem_value;
    let link = body.link;
    let Subtitle = body.sub_title;
    let qrcodenew = null;
    let barcodenew = null;
    
    var query = "CALL Edit_Voucher(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@p);";
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
        addDatenew,
        color_codenew,
        typesnew,
        types_valuenew,
        apply_tonew,
        apply_to_valuenew,
        countrynew,
        country_valuenew,
        ship_ratenew,
        ship_rate_valuenew,
        cust_buynew,
        cust_buy_value1new,
        cust_buy_value2new,
        cust_getnew,
        cust_get_value1new,
        cust_get_value2new,
        at_discountnew,
        at_discount_valuenew,
        set_min_ordernew,
        set_min_order_valuenew,
        min_reqnew,
        min_req_valuenew,
        cus_elgnew,
        cus_elg_valuenew,
        usage_limitnew,
        usage_limit_valuenew,
        total_vou_countnew,
        limt_pernew,
        limit_per_valuenew,
        start_datenew,start_timenew,
        end_datenew,end_timenew,
        expired_datenew,
        expired_timenew,        
        redeemname,
        redeemvalue,
        link,
        vStatusnew,
        Subtitle,
        id
      ], 
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
  
  
  
}
