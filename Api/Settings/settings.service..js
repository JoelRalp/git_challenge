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
         body.editid,  
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
     ADD_POINTS: (body,tump_path,photo_path,callBack) => {
      var member_icon = tump_path;
      var member_card = photo_path;
        pool.query(
          "CALL Add_Points(?,?,?,?,?,?,?,?,@a);",
          [body.api_token,
           body.name,
           body.no_rm,
           body.rate_others,
           body.rate_ewallet,
           body.points,
           member_icon,
           member_card
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
      GET_POINTS_ID: (body,callBack) => {
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
     EDIT_POINTS: (body,tump_path,photo_path,callBack) => {
      var pmember_icon = tump_path;
      var pmember_card = photo_path;
      //console.log(member_icon);
      //console.log(member_card);
       pool.query(
         "CALL Edit_Points(?,?,?,?,?,?,?,?,?,@a);",
         [body.api_token,
          body.name,
          body.no_rm,
          body.rate_others,
          body.rate_ewallet,
          body.points,
          body.editid,
          pmember_icon,
          pmember_card
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

     Points_delete:(data,callBack)=>{
        var aapi_token=data.api_token;
        var delete_id=data.delete_id;
        var query = "CALL delete_point_admin(?,?,@p)";
        pool.query(
      query,
      [aapi_token,delete_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );
     },

     Appcontent_add:(data,cdate,imagesarr,callBack)=>{
      var aapi_token=data.api_token;
      var mtype=data.type_id;
      var cimage=imagesarr;
      var ctitle=data.title;
      var cdescription=data.description;
      var CurrentDate=cdate;
      var query = "CALL add_appcontent(?,?,?,?,?,?,@p)";
      pool.query(
      query,
      [aapi_token,mtype,cimage,ctitle,cdescription,CurrentDate],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );
     },

     Appcontent_update:(data,cdate,imagesarr,callBack)=>{
        var aapi_token=data.api_token;
        var editid=data.editid;
        var mtype=data.type_id;
        var cimage=imagesarr;
        var ctitle=data.title;
        var cdescription=data.description;
        var CurrentDate=cdate;
        var query = "CALL edit_appcontent(?,?,?,?,?,?,?,@p)";
        pool.query(
        query,
        [aapi_token,editid,mtype,cimage,ctitle,cdescription,CurrentDate],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );
  },

  Appcontent_delete:(data,callBack)=>{
      var aapi_token=data.api_token;
      var deleteid=data.deleteid;
      var query = "CALL delete_appcontent(?,?,@p)";
      pool.query(
        query,
        [aapi_token,deleteid],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );
  },

  Appcontent_view:(data,callBack)=>{
      var aapi_token=data.api_token;
      var query = "CALL view_appcontent(?,@p)";
      pool.query(
        query,
        [aapi_token],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );
  },
  MembershipTitle_view:(data,callBack)=>{
    var aapi_token=data.api_token;
    var query = "CALL view_membership_title(?,@p)";
    pool.query(
        query,
        [aapi_token],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );
  },
  MembershipTitle_update:(data,callBack)=>{
    var aapi_token=data.api_token;
    var editid=data.editid;
    var mtitle=data.title;
    var query = "CALL edit_membership_title(?,?,?,@p)";
    pool.query(
        query,
        [aapi_token,editid,mtitle],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );
  },
  TierBenefits_add:(data,cdate,imagesarr,callBack)=>{
      var aapi_token=data.api_token;
      var mtype=data.type_id;
      var cimage=imagesarr;
      var ctitle=data.title;
      var cdescription=data.description;
      var CurrentDate=cdate;
      var query = "CALL add_tier_benefits(?,?,?,?,?,?,@p)";
      pool.query(
      query,
      [aapi_token,mtype,cimage,ctitle,cdescription,CurrentDate],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );
  },
  TierBenefits_update:(data,cdate,imagesarr,callBack)=>{
        var aapi_token=data.api_token;
        var editid=data.editid;
        var mtype=data.type_id;
        var cimage=imagesarr;
        var ctitle=data.title;
        var cdescription=data.description;
        var CurrentDate=cdate;
        var query = "CALL edit_tier_benefits(?,?,?,?,?,?,?,@p)";
        pool.query(
        query,
        [aapi_token,editid,mtype,cimage,ctitle,cdescription,CurrentDate],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );
  },
  TierBenefits_delete:(data,callBack)=>{
      var aapi_token=data.api_token;
      var deleteid=data.deleteid;
      var query = "CALL delete_tier_benefits(?,?,@p)";
      pool.query(
        query,
        [aapi_token,deleteid],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );
  },
  TierBenefits_view:(data,callBack)=>{
   var aapi_token=data.api_token;
      var query = "CALL view_tier_benefits_admin(?,@p)";
      pool.query(
        query,
        [aapi_token],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    ); 
  },

  Aboutas_view:(data,callBack)=>{
    var aapi_token=data.api_token;
    var query = "CALL view_aboutas_admin(?,@p)";
     pool.query(
        query,
        [aapi_token],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    ); 
  },
  Aboutas_update:(data,callBack)=>{
    var aapi_token=data.api_token;
    var editid=data.editid;
    var atitle=data.title;
    var adescription=data.description;
    var query = "CALL edit_aboutas_admin(?,?,?,?,@p)";
    pool.query(
        query,
        [aapi_token,editid,atitle,adescription],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    ); 
  },

  Topuplimit_view:(data,callBack)=>{
    var aapi_token=data.api_token;
    var query = "CALL view_topup_limit(?,@p)";
    pool.query(
        query,
        [aapi_token],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    ); 
  },

  Topuplimit_update:(data,cdate,callBack)=>{
    var aapi_token=data.api_token;
    var editid=data.editid;
    var lamount=data.amount;
    var CurrentDate=cdate;
    var query = "CALL edit_topup_limit(?,?,?,?,@p)";
     pool.query(
        query,
        [aapi_token,editid,lamount,CurrentDate],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    ); 
  },

  VoucherBrand_add:(data,cdate,imagesarr,callBack)=>{
    var aapi_token=data.api_token;
    var bname=data.name;
    var bimage=imagesarr;
    var CurrentDate=cdate;
    var image_type=data.image_type;
    var gallery_id=data.gallery_id;
    var query = "CALL add_voucher_brand(?,?,?,?,?,?,@p)";
    pool.query(
        query,
        [aapi_token,bname,bimage,CurrentDate,image_type,gallery_id],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    ); 
  },
  VoucherBrand_view:(data,callBack)=>{
    var aapi_token=data.api_token;
     var query = "CALL view_voucher_brand(?,@p)";
     pool.query(
        query,
        [aapi_token],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    ); 
  },
  VoucherBrand_edit:(data,cdate,imagesarr,callBack)=>{
    var aapi_token=data.api_token;
    var editid=data.editid;
    var bname=data.name;
    var bimage=imagesarr;
    var CurrentDate=cdate;
    var image_type=data.image_type;
    var gallery_id=data.gallery_id;
    var query = "CALL edit_voucher_brand(?,?,?,?,?,?,?,@p)";
    pool.query(
        query,
        [aapi_token,editid,bname,bimage,CurrentDate,image_type,gallery_id],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    ); 
  },
  VoucherBrand_delete:(data,callBack)=>{
    var aapi_token=data.api_token;
    var deleteid=data.deleteid;
    var query = "CALL delete_voucher_brand(?,?,@p)";
    pool.query(
        query,
        [aapi_token,deleteid],
        (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    ); 
  },
}