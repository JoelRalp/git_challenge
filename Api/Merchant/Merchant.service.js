const pool = require("../../config/database");
 
module.exports = {
	Login_Merchant: (data, callBack) => {
		//console.log(data);
    var query = "Select * from merchant where staffID = '" + data.merchantid + "'";
    pool.query(
      query,
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  Point_Payment:(data,insertapi,callBack) =>{
  	var user_token = data.user_token;
  	var merchant_token =data.merchant_token;
  	var amount =data.amount;
    var token = insertapi;
  	//console.log(user_token);
  	var query = "CALL payment_point(?,?,?,?,@p)";
    pool.query(
      query,
      [user_token,merchant_token,amount,token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results);
        return callBack(null, results[0]);
      }
    );
  },

  Type_Payment:(data,callBack)=>{
    var api_token = data.api_token;
    var query = "CALL view_payment_type(?,@p)";
     pool.query(
      query,
      [api_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );

  },

  Voucher_Payment:(data,insertapi,CurrentDate,callBack)=>{
    var vqrcode = data.qrcode;
    var merchantToken = data.merchantToken;
    var amount = data.amount;
    var token = insertapi;
    var CurrentDate = CurrentDate;
    var query = "CALL payment_voucher(?,?,?,?,?,@p)";
     pool.query(
      query,
      [vqrcode,merchantToken,amount,token,CurrentDate],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  History_Payment:(body,callBack)=>{
    var merchant_token = body.api_token;
    var query = "CALL paymenthistory(?,?,?,@p)";
    pool.query(
      query,
      [merchant_token,body.type,body.fkey],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },
  History_Payment_Filter:(body,callBack)=>{
    var merchant_token = body.api_token;
    
    var query = "CALL Filter_Payment_History(?,?,?,@p)";
    pool.query(
      query,
      [merchant_token,body.type,body.fkey],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Historysearch_Payment:(data,callBack)=>{
    var merchant_token = data.api_token;
    var sdate = data.date;
    var query = "CALL paymenthistorysearch(?,?,@p)";
    pool.query(
      query,
      [merchant_token,sdate],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Payment_cancel:(data,callBack)=>{
    var merchant_token = data.api_token;
    var paymentid = data.paymentid;
    var ccomment = data.comment;
    var query = "CALL cancelpayment(?,?,?,@p)";
    pool.query(
      query,
      [merchant_token,paymentid,ccomment],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Merchant_add:(data,insertapi,uppass,callBack)=>{

    var aapi_token=data.api_token;
    var mname = data.name;
    var memail = data.email;
    var mphone = data.phone;
    var mic = data.ic;
    var mstaffID = data.staffID;
    var mpassword = uppass;
    var mpin=data.pin;
    var moutlet=data.outlet;
    var mapi_token=insertapi;
    
    var query = "CALL add_merchant(?,?,?,?,?,?,?,?,?,?,@p)";
    pool.query(
      query,
      [aapi_token,mname,memail,mphone,mic,mstaffID,mpassword,mpin,moutlet,mapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Merchant_view:(data,callBack)=>{
    var aapi_token=data.api_token;
    var query = "CALL view_merchant(?,@p)";
    pool.query(
      query,
      [aapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  getMerchantId_get:(data,callBack)=>{
    var aapi_token=data.api_token;
    var editid = data.editid;
    var query = "CALL get_merchant_id(?,?,@p)";
    pool.query(
      query,
      [aapi_token,editid],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Merchant_edit:(data,callBack)=>{

    var editid = data.editid;
    var aapi_token=data.api_token;
    var mname = data.name;
    var memail = data.email;
    var mphone = data.phone;
    var mic = data.ic;
    var mstaffID = data.staffID;
    var mpassword = data.password;
    var mpin=data.pin;
    var moutlet=data.outlet;

    var query = "CALL edit_merchant(?,?,?,?,?,?,?,?,?,?,@p)";
    pool.query(
      query,
      [editid,aapi_token,mname,memail,mphone,mic,mstaffID,mpassword,mpin,moutlet],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );

  },

  Merchant_statusChange:(data,callBack)=>{
      var aapi_token=data.api_token;
      var mid=data.mid;
      var mstatus=data.status;

      var query = "CALL merchant_change_status(?,?,?,@p)";
      pool.query(
      query,
      [aapi_token,mid,mstatus],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Merchant_delete:(data,callBack)=>{
      var aapi_token=data.api_token;
      var deleteid=data.deleteid;

      var query = "CALL delete_merchant(?,?,@p)";
      pool.query(
      query,
      [aapi_token,deleteid],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Pin_check:(data,callBack)=>{
      var mapi_token=data.api_token;
      var mpin=data.pin;

      var query = "CALL merchant_checkpin(?,?,@p)";
      pool.query(
      query,
      [mapi_token,mpin],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Endsummary_day:(data,callBack)=>{
    var mapi_token=data.api_token;
    var query = "CALL merchant_dayendsummary(?,@p)";
      pool.query(
      query,
      [mapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Endsummary_add:(data,callBack)=>{
    var mapi_token=data.api_token;
    var query = "CALL add_dayend(?,@p)";
    pool.query(
      query,
      [mapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  EndReprot_day:(data,callBack)=>{
    var mapi_token=data.api_token;
    var fkey=data.fkey;
    var query = "CALL merchant_dayendreport(?,?,@p)";
     pool.query(
      query,
      [mapi_token,fkey],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  EndReprotSearch_day:(data,callBack)=>{
    var mapi_token=data.api_token;
    var sdate=data.date;
    var query = "CALL merchant_dayendreport_search(?,?,@p)";
    pool.query(
      query,
      [mapi_token,sdate],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Topup_merchant:(data,callBack)=>{

    var mapi_token=data.api_token;
    var amount=data.amount;
    var qrcode=data.qrcode;

    var query = "CALL merchant_topup(?,?,?,@p)";
    pool.query(
      query,
      [mapi_token,amount,qrcode],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log(results);
        return callBack(null, results[0]);
      }
    );

  },

  Wallet_payment:(data,callBack)=>{
    var mapi_token=data.api_token;
    var amount=data.amount;
    var qrcode=data.qrcode;

    var query = "CALL payment_wallet(?,?,?,@p)";
    pool.query(
      query,
      [mapi_token,amount,qrcode],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  History_topup:(data,callBack)=>{
     var mapi_token=data.api_token;
     var query = "CALL topup_history(?,@p)";
     pool.query(
      query,
      [mapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },//View_Mobile_Merchant_Product_Update_Stock
  View_Mobile_Merchant_Product_Stock: (body, callBack) => {
    let Api_token = body.api_token;
     pool.query(
       "CALL View_Mobile_Merchant_Product_Stock(?,@a);",
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
   View_Mobile_Category_Mobile: (body, callBack) => {
    let Api_token = body.api_token;
     pool.query(
       "CALL View_Category_Mobile(?,@a);",
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
   View_Mobile_Merchant_Product_Update_Stock: (body, callBack) => {
    let Api_token = body.api_token;
     pool.query(
       "CALL View_Mobile_Merchant_Product_Update_Stock(?,?,?,@a);",
       [Api_token,body.productid,body.status],
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
   View_Mobile_Reservation_History: (body, callBack) => {
    let Api_token = body.api_token;
     pool.query(
       "CALL View_Mobile_Reservation_History(?,?,@a);",
       [Api_token,body.type],
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
   Mobile_Merchant_Check_IN: (body,callBack) => {
    let Api_token = body.api_token;
     pool.query(
       "CALL Mobile_Merchant_Check_IN(?,?,@a);",
       [Api_token,body.tableid],
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
   View_Category_Product_Mobile: (body,key,callBack) => {
     
    let Api_token = body.api_token;
     pool.query(
       "CALL View_Category_Product_Mobile(?,?,?,@a);",
       [Api_token,body.cate_ID,key],
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
   View_Merchant_Category_Mobile: (body,callBack) => {
     
    let Api_token = body.api_token;
     pool.query(
       "CALL View_Merchant_Category(?,@a);",
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
   View_Merchant_Product_Mobile: (body,callBack) => {
     
    let Api_token = body.api_token;
     pool.query(
       "CALL View_Merchant_Product(?,@a);",
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
   Verify_User: (body,callBack) => {
     
    pool.query(
      "CALL Verify_User(?,@a);",
      [body.api_token],
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
  Table_Product: (body,callBack) => {
     
    let Api_token = body.api_token;
     pool.query(
       "CALL table_product(?,?,@a);",
       [Api_token,body.bookid],
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
   Delete_Order: (body,callBack) => {
     
    let Api_token = body.api_token;
     pool.query(
       "CALL merchant_delete_order(?,?,@a);",
       [Api_token,body.orderid],
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
   Delete_Product: (body,callBack) => {
     
    let Api_token = body.api_token;
     pool.query(
       "CALL merchant_delete_product(?,?,@a);",
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
   Confirm_Order: (body,callBack) => {
     
    let Api_token = body.api_token;
     pool.query(
       "CALL Confirm_Order(?,?,@a);",
       [Api_token,body.bookingid],
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
   Table_Checkout: (body,callBack) => {
     
    let Api_token = body.api_token;
     pool.query(
       "CALL Table_Checkout(?,?,@a);",
       [Api_token,body.bookingid],
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
   View_Profile: (body,callBack) => {
     
    let Api_token = body.api_token;
     pool.query(
       "CALL View_Profile(?,@a);",
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
   Merchant_Update_Pin: (body,callBack) => {
     
    let Api_token = body.api_token;
     pool.query(
       "CALL Merchant_Update_pin(?,?,@a);",
       [Api_token,body.pin],
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
   Merchant_View_Reservation: (body,callBack) => {
     
    let Api_token = body.api_token;
     pool.query(
       "CALL merchant_view_reservation(?,?,?,@a);",
       [Api_token,body.type,body.fkey],
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
   Merchant_Profile: (body,callBack) => {
     
    let Api_token = body.api_token;
     pool.query(
       "CALL View_Merchant_Profile(?,@a);",
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
   Update_Pin: (body,callBack) => {
     
    let Api_token = body.api_token;
     pool.query(
       "CALL Update_Pin(?,?,?,@a);",
       [Api_token,body.oldpin,body.newpin],
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
   Change_Password_MERCHANT: (body,callBack) => {
     
    let Api_token = body.api_token;
     pool.query(
       "CALL Change_Password(?,?,?,@a);",
       [Api_token,body.oldpassword,body.newpassword],
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
   Reservation_Filter:(body,callBack)=>{
    var merchant_token = body.api_token;   
    var query = "CALL merchant_view_reservation_filter(?,?,?,@p)";
    pool.query(
      query,
      [merchant_token,body.type,body.fkey],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },
  Cancel_Reservation:(body,callBack)=>{
    var merchant_token = body.api_token;
    var ccomment=body.comment;
    var raction= body.action;  
    var query = "CALL Cancel_Merchant_Status(?,?,?,?,@p)";
    pool.query(
      query,
      [merchant_token,body.id,ccomment,raction],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },
  Cancel_Topup_Payment:(body,callBack)=>{

    var merchant_token = body.api_token;
    var paymentid = body.paymentid;
    var ccomment = body.comment;

    var query = "CALL cancel_topup(?,?,?,@p)";
    pool.query(
      query,
      [merchant_token,paymentid,ccomment],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  User_view:(data,callBack)=>{
    var query = "SELECT id,name,phone,referral_code,api_token from users where phone_verified='1' and active='1'"
    if (data.search_by) {
      query=query + " " + "and (name like '%" + data.search_by + "%' or referral_code like '%" + data.search_by + "%' or phone like '%" + data.search_by + "%') " 
    }
    query = query + " " + "order by id ASC";
    pool.query(
      query,
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  Reservation_Add:(data,insertapi,callBack)=>{
    var uapi_token=data.api_token;
    var routID=data.outID;
    var rdate=data.date;
    var rtime=data.time;
    var rpax1=data.pax1;
    var rname=data.name;
    var rphone=data.phone;
    var rdescription=data.description;
    var rdescription=data.description;
    var token=insertapi;
    var query = "CALL add_merchant_reservation(?,?,?,?,?,?,?,?,?,@p)";
    pool.query(
      query,
      [uapi_token,routID,rdate,rtime,rpax1,rname,rphone,rdescription,token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );  
  },
  Outlet_View:(data,callBack)=>{
    var mapi_token=data.api_token;
    var query = "CALL view_outlet_merchant(?,@p)";
    pool.query(
      query,
      [mapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );  
  },
}