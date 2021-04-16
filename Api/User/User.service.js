const pool = require("../../config/database");

module.exports = {

	Phone_login:(data,insertapi,otp,callBack)=>{
    var uphone=data.phone;
    var uotp=otp;
    var uapi_token = insertapi;
    var query = "CALL user_loginphone(?,?,?,@p)";
    pool.query(
      query,
      [uphone,uotp,uapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );
  },

  Verified_otp:(data,callBack)=>{
  	var uphone=data.phone;
  	var uotp=data.otp;
  	var uapi_token=data.api_token;
  	var query = "CALL otpverified_reg(?,?,?,@p)";
  	pool.query(
      query,
      [uphone,uotp,uapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Otpverified_login:(data,callBack)=>{
  	var uphone=data.phone;
  	var uotp=data.otp;
  	var uapi_token=data.api_token;
  	var query = "CALL login_otp_verified(?,?,?,@p)";
  	pool.query(
      query,
      [uphone,uotp,uapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Resend_otp:(data,otp,callBack)=>{
  	var uphone=data.phone;
  	var uotp=otp;
  	var uapi_token=data.api_token;
  	var query = "CALL resend_otp(?,?,?,@p)";
  	pool.query(
      query,
      [uphone,uapi_token,uotp],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Update_name:(data,callBack)=>{
  	var uname=data.name;
  	var uapi_token=data.api_token;
  	var query = "CALL user_update_name(?,?,@p)";
  	pool.query(
      query,
      [uname,uapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );

  },

  Login_facebook:(data,insertapi,callBack)=>{
  	var ufb_id=data.fb_id;
  	var uname=data.name;
  	var uemail=data.email;
  	var udob=data.dob;
  	var uapi_token=insertapi;
  	var query = "CALL user_login_facebook(?,?,?,?,?,@p)";
  	pool.query(
      query,
      [ufb_id,uname,uemail,udob,uapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Login_google:(data,insertapi,callBack)=>{
  	var ugoogle_id=data.google_id;
  	var uname=data.name;
  	var uemail=data.email;
  	var udob=data.dob;
  	var uapi_token=insertapi;
  	var query = "CALL user_login_google(?,?,?,?,?,@p)";
  	pool.query(
      query,
      [ugoogle_id,uname,uemail,udob,uapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );	
  },

  Login_apple:(data,insertapi,callBack)=>{
  	var uapple_id=data.apple_id;
  	var uname=data.name;
  	var uemail=data.email;
  	var udob=data.dob;
  	var uapi_token=insertapi;
  	var query = "CALL user_login_apple(?,?,?,?,?,@p)";
  	pool.query(
      query,
      [uapple_id,uname,uemail,udob,uapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log(results[0]);
        return callBack(null, results[0]);
      }
    );	
  },

  Get_usedata:(data,callBack)=>{
  	var uapi_token=data.api_token;
  	var query = "CALL get_user_data(?,@p)";
  	pool.query(
      query,
      [uapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log(results[0]);
        return callBack(null, results[0]);
      }
    );	
  },

  Firebase_add:(data,callBack)=>{
  	var uapi_token=data.api_token;
  	var udevice_token=data.device_token;
  	var udevice_type=data.device_type;
  	var ulogin_type=data.login_type;
  	var query = "CALL firebase(?,?,?,?,@p)";
  	pool.query(
      query,
      [uapi_token,udevice_token,udevice_type,ulogin_type],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log(results[0]);
        return callBack(null, results[0]);
      }
    );	
  },

  Referral_check:(data,callBack)=>{

  	var uapi_token=data.api_token;
  	var ureferral_code=data.referral_code;
  	var query = "CALL check_referral(?,?,@p)";
  	pool.query(
      query,
      [ureferral_code,uapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log(results[0]);
        return callBack(null, results[0]);
      }
    );	
  },

  List_Referral:(data,callBack)=>{
  	var uapi_token=data.api_token;
  	var query = "CALL view_referrallist(?,@p)";
  	pool.query(
      query,
      [uapi_token],
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
    var uapi_token=data.api_token;
    var query = "CALL view_outlet_user(?,@p)";
    pool.query(
      query,
      [uapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );  
  },

  Reservation_Add:(data,callBack)=>{

    var uapi_token=data.api_token;
    var routID=data.outID;
    var rdate=data.date;
    var rtime=data.time;
    var rpax1=data.pax1;
    var rpax2=data.pax2;
    var rname=data.name;
    var remail=data.email;
    var rphone=data.phone;
    var rdescription=data.description;
    var rout_area=data.out_area;

    var query = "CALL add_user_reservation(?,?,?,?,?,?,?,?,?,?,?,@p)";
    pool.query(
      query,
      [uapi_token,routID,rdate,rtime,rpax1,rpax2,rname,remail,rphone,rdescription,rout_area],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );  
  },

  Reservation_View:(data,callBack)=>{
    var uapi_token=data.api_token;
    var ctype=data.type;
    var query = "CALL view_user_reservation(?,?,@p)";
    pool.query(
      query,
      [uapi_token,ctype],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );  
  },

  Reservation_Cancel:(data,callBack)=>{
    var uapi_token=data.api_token;
    var cancelid=data.id;
    var ccomment=data.comment;
    var query = "CALL cancel_user_reservation(?,?,?,@p)";
    pool.query(
      query,
      [uapi_token,cancelid,ccomment],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  voucher_View:(data,callBack)=>{
    var uapi_token=data.api_token;
    var ctype=data.type;
    var query = "CALL view_user_voucher(?,?,@p)";
    pool.query(
      query,
      [uapi_token,ctype],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  voucherfavourite_Add:(data,callBack)=>{
    var uapi_token=data.api_token;
    var voucherid = data.voucherID;
    var query = "CALL add_voucher_favourite(?,?,@p)";
    pool.query(
      query,
      [uapi_token,voucherid],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  voucherfavourite_View:(data,callBack)=>{
      var uapi_token=data.api_token;
      var query = "CALL user_view_favourite_voucher(?,@p)";
      pool.query(
      query,
      [uapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Redeem_Add:(data,insertapi,CurrentDate,callBack)=>{
    var uapi_token=data.api_token;
    var avoucherID=data.voucherID;
    var CurrentDate=CurrentDate;
    var v_token=insertapi;
    var query = "CALL add_voucher_redeem(?,?,?,?,@p)";
    pool.query(
      query,
      [uapi_token,avoucherID,CurrentDate,v_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Redeem_Check:(data,CurrentDate,callBack)=>{

      var uapi_token=data.api_token;
      var avoucherID=data.voucherID;
      var CurrentDate=CurrentDate;

      var query = "CALL check_redeem_voucher(?,?,?,@p)";
      pool.query(
      query,
      [uapi_token,avoucherID,CurrentDate],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Category_View:(data,callBack)=>{

    var query = "CALL view_user_category(@p)";
    pool.query(
      query,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Subcategory_View:(data,callBack)=>{
    var ccateid=data.cateid;
    var query = "CALL view_user_subcategory(?,@p)";
    pool.query(
      query,
      [ccateid],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Product_View:(data,callBack)=>{
    var ccateid=data.cateid;
    var csubid=data.subcateid;
    var query = "CALL view_user_product(?,?,@p)";
    pool.query(
      query,
      [ccateid,csubid],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },
  
  COMMON:(data,callBack)=>{
    pool.query(
      data.query,
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Newpost_View:(data,callBack)=>{
     var query = "CALL view_user_newpost(@p)";
    pool.query(
      query,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Profile_Update:(data,callBack)=>{
    var uapi_token=data.api_token;
    var uname=data.name;
    var uphone=data.phone;
    var uemail=data.email;
    var udob=data.dob;
    var query = "CALL update_user_profile(?,?,?,?,?,@p)";
      pool.query(
      query,
      [uapi_token,uname,uphone,uemail,udob],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  History_Transaction:(data,callBack)=>{
    var uapi_token=data.api_token;
    var ttype=data.type;
    var fkey=data.fkey;
    var sdate=data.sdate;
    var edate=data.edate;
    var query = "CALL user_transaction_history(?,?,?,?,?,@p)";
     pool.query(
      query,
      [uapi_token,ttype,fkey,sdate,edate],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Feedback_Add:(data,CurrentDate,callBack)=>{
    var uapi_token=data.api_token;
    var ftitle=data.title;
    var fdescription=data.description;
    var femail=data.email;
    var CurrentDate=CurrentDate;
    var query = "CALL user_feedback(?,?,?,?,?,@p)";
    pool.query(
      query,
      [uapi_token,ftitle,fdescription,femail,CurrentDate],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Terms_View:(data,callBack)=>{
     var query = "CALL user_view_terms(@p)";
    pool.query(
      query,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Privacy_View:(data,callBack)=>{
     var query = "CALL user_view_privacy(@p)";
    pool.query(
      query,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Logout_User:(data,callBack)=>{
    var uapi_token=data.api_token;
    var ulogin_type=data.login_type;
    var query = "CALL logout(?,?,@p)";
    pool.query(
      query,
      [uapi_token,ulogin_type],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Level_Current:(data,callBack)=>{
    var uapi_token=data.api_token;
    var query = "CALL view_user_current_level(?,@p)";
    pool.query(
      query,
      [uapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  TierBenefits_View:(data,callBack)=>{
    var uapi_token=data.api_token;
    var query = "CALL view_tier_benefits(?,@p)";
    pool.query(
      query,
      [uapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Tier_View:(data,callBack)=>{
    var uapi_token=data.api_token;
    var query = "CALL view_user_tier(?,@p)";
    pool.query(
      query,
      [uapi_token],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

  Notification_View:(data,CurrentDate,callBack)=>{
    var uapi_token=data.api_token;
    var CurrentDate=CurrentDate;
    var query = "CALL view_user_notification(?,?,@p)";
    pool.query(
      query,
      [uapi_token,CurrentDate],
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