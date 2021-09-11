const fs = require("fs");
var moment = require('moment-timezone');
var s3w = require("../Aws.s3")

const { Console } = require("console");
const ASYNC = require('async');
const {ADD_PRIVACY,VIEW_PRIVACY,ADD_TERMS,VIEW_TERMS,VIEW_POS,EDIT_POS,VIEW_MEMBERCARD,GET_MEMBERCARD_ID,EDIT_MEMBERCARD,GET_POINTS_ID,VIEW_POINTS,ADD_POINTS,EDIT_POINTS,Appcontent_add,Appcontent_update,Appcontent_delete,Appcontent_view,MembershipTitle_view,MembershipTitle_update,TierBenefits_add,TierBenefits_update,TierBenefits_delete,TierBenefits_view,Aboutas_view,Aboutas_update,Topuplimit_view,Topuplimit_update,Points_delete,VoucherBrand_add,VoucherBrand_view,VoucherBrand_edit,VoucherBrand_delete} = require("./settings.service.");
const { makeid, refresh } = require("../Mqtt/server");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service");

var CurrentDate  = moment().tz("Asia/Kuala_Lumpur").format("YYYY-MM-DD HH:mm:ss");

module.exports = {
  viewPrivacy: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    VIEW_PRIVACY(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  addPrivacy: (req, res) => {
    const body = req.body;
         if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
         else if (!req.body.description) { return res.status(200).json(reqallfeild) }
       
         ADD_PRIVACY(body, (err, results) => {
           console.log(results);
          if (err) { fatal_error.data = err; return res.json(fatal_error); }
          else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
          else { sucess.data = results; return res.json(sucess); }
        });
  },
  viewTerms: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    VIEW_TERMS(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  addTerms: (req, res) => {
    const body = req.body;
         if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
         else if (!req.body.description) { return res.status(200).json(reqallfeild) }
       
         ADD_TERMS(body, (err, results) => {
          if (err) { fatal_error.data = err; return res.json(fatal_error); }
          else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
          else { sucess.data = results; return res.json(sucess); }
        });
  },
  viewPos: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    if (!req.body.id) { reqallfeild }
    VIEW_POS(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else if (results[0].err_id == "-2") { return res.json(nodatafound); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  editPos: (req, res) => {
    console.log("in");
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }//
    else if (!req.body.companyname) { return res.status(200).json(reqallfeild ) }//
    else if (!req.body.phone) { return res.status(200).json(reqallfeild )  }//
    else if (!req.body.currency) { return res.status(200).json(reqallfeild )  }//
    else if (!req.body.receiptheader) { return res.status(200).json(reqallfeild ) }//
    else if (!req.body.receiptfooter) { return res.status(200).json(reqallfeild ) }//
    else if (!req.body.default_tax) { return res.status(200).json(reqallfeild ) }//
    else if (!req.body.service_tax) { return res.status(200).json(reqallfeild ) }//
    else if (!req.body.discount) { return res.status(200).json(reqallfeild ) }//
    else if (!req.body.decimals) { return res.status(200).json(reqallfeild ) }//
    else if (!req.body.editid) { return res.status(200).json(reqallfeild ) }//
    EDIT_POS(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
        refresh();
        inssucess.msg = "Category updated sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Category name already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
  viewMemberCard: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    if (!req.body.id) { reqallfeild }
    VIEW_MEMBERCARD(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else if (results[0].err_id == "-2") { return res.json(nodatafound); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  getMemberCardId: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    GET_MEMBERCARD_ID(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else if (results[0].err_id == "-2") { return res.json(nodatafound); }
      else { sucess.data = results[0]; return res.json(sucess); }
    });
  },
  editMembercard: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    else if (!(req.files && req.files.mImage)) { return res.status(200).json(reqallfeild) }
    else if (!req.body.status) { return res.status(200).json(reqallfeild) }
    var imgname = makeid(5);
    EDIT_MEMBERCARD(body, imgname, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
        fs.writeFileSync("Api\\Images\\Logo\\" + imgname + ".png", req.files.mImage.data);
        refresh();
        inssucess.msg = "Member card updated sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Member card already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
  viewPoints: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    VIEW_POINTS(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  addPoints: (req, res) => {
    const body = req.body;
         if (!req.body.api_token || !req.body.name || !req.body.no_rm || !req.body.rate_others || !req.body.rate_ewallet || !req.body.points || !req.files.member_icon || !req.files.member_card){ 
          return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"}) 
        }
     if (req.files) {
        var fileKeys = Object.keys(req.files);
        let tump_path = "";
        let photo_path = "";
        ASYNC.each(fileKeys, function(element, callback){
          let imgname = makeid(5);
          s3w.uploadFile(req.files[element].data, imgname, (results, err) => {
          if (err) {return res.json(fatal_error);}
          if(res){if(element === "member_icon"){tump_path = results};
          if(element === "member_card"){photo_path = results};}
          callback();
        });
        },function(err)
        {      
        ADD_POINTS(body,tump_path,photo_path,(err, result) => {
          if(err){
            var data = {'status': "fatal_error",'statuscode': "500",'data': err};
          }else if(result.length > 0){
            if(result[0].rescode=='1'){
              var data = {"status":"success",'statuscode':'1',"data":'Member type inserted successfully'};
            } else if(result[0].rescode=='3'){
              var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
            } else if(result[0].rescode=='4'){
              var data = {"status":"failure",'statuscode':'4',"data":'Name already exists'};
            } else if(result[0].rescode=='5'){
              var data = {"status":"failure",'statuscode':'5',"data":'Point already exists'};
            }
          }else{
            var data = {"status":"failure",'statuscode':'6',"data":'No data found'};
          }
          return res.status(200).json(data);
        });
        });
    }
  },
  getPointsId: (req, res) => {
    let body = req.body;
         if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
         else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    GET_POINTS_ID(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else if (results[0].err_id == "-2") { return res.json(nodatafound); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  
  editPoints: (req, res) => {
    if (!req.body.api_token || !req.body.name || !req.body.no_rm || !req.body.rate_others || !req.body.rate_ewallet || !req.body.points || !req.body.editid){ 
          return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"}) 
        }
    const body = req.body;
    let tump_path = "";
    let photo_path = "";
    if (req.files) {
      var fileKeys = Object.keys(req.files);
      ASYNC.each(fileKeys, function(element, callback){
        let imgname = makeid(5);
          s3w.uploadFile(req.files[element].data, imgname, (results, err) => {
          if (err) {return res.json(fatal_error);}
          if(res){if(element === "member_icon"){tump_path = results};
          if(element === "member_card"){photo_path = results};}
          callback();
        });
      },function(err)
    {      
    EDIT_POINTS(body,tump_path,photo_path,(err, result) => {
      
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      if(err){
            var data = {'status': "fatal_error",'statuscode': "500",'data': err};
          }else if(result.length > 0){
            if(result[0].rescode=='1'){
              var data = {"status":"success",'statuscode':'1',"data":'Member type updated successfully'};
            } else if(result[0].rescode=='3'){
              var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
            } else if(result[0].rescode=='4'){
              var data = {"status":"failure",'statuscode':'4',"data":'Name already exists'};
            } else if(result[0].rescode=='5'){
              var data = {"status":"failure",'statuscode':'5',"data":'Point already exists'};
            }
          }else{
            var data = {"status":"failure",'statuscode':'6',"data":'No data found'};
          }
          return res.status(200).json(data);
    });
  });
  }else{
    EDIT_POINTS(body,tump_path,photo_path,(err, result) => {
      
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      if(err){
            var data = {'status': "fatal_error",'statuscode': "500",'data': err};
          }else if(result.length > 0){
            if(result[0].rescode=='1'){
              var data = {"status":"success",'statuscode':'1',"data":'Member type updated successfully'};
            } else if(result[0].rescode=='3'){
              var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
            } else if(result[0].rescode=='4'){
              var data = {"status":"failure",'statuscode':'4',"data":'Name already exists'};
            } else if(result[0].rescode=='5'){
              var data = {"status":"failure",'statuscode':'5',"data":'Point already exists'};
            }
          }else{
            var data = {"status":"failure",'statuscode':'6',"data":'No data found'};
          }
          return res.status(200).json(data);
    });
  }
  },

  delete_Points:(req, res) => {
    if(!req.body.api_token || !req.body.delete_id){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }
    const body = req.body;
    Points_delete(body,(err,result)=>{
            ///console.log(result);
            if(err){
              var data = {'status': "fatal_error",'statuscode': "500",'data': err};
            }
            else if(result.length > 0){

              if(result[0].rescode=='1'){
                var data = {"status":"success",'statuscode':'1',"data":'Member type deleted successfully'};
              } else if(result[0].rescode=='3'){
                var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
              }
            } else {
              var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
            }
            return res.status(200).json(data);
          });
  },

  add_Appcontent:(req, res) => {

    if(!req.body.api_token || !req.body.type_id || !req.files.image || !req.body.title || !req.body.description){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }

    const body = req.body;
    let cdate = CurrentDate;
    let imagesarr = '';

    if(req.files.image){
      var imgname = makeid(5);
      s3w.uploadFile(req.files.image.data,imgname, (results, err) => {
        if(results){
            imagesarr=results;  
        }else{
            throw err;
        }
          Appcontent_add(body,cdate,imagesarr,(err,result)=>{
            ///console.log(result);
            if(err){
              var data = {'status': "fatal_error",'statuscode': "500",'data': err};
            }
            else if(result.length > 0){

              if(result[0].rescode=='1'){
                var data = {"status":"success",'statuscode':'1',"data":'About membership add successfully'};
              } else if(result[0].rescode=='3'){
                var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
              }
            } else {
              var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
            }
            return res.status(200).json(data);
          });
     });
  }
  },

  update_Appcontent:(req, res) => {
    if(!req.body.api_token || !req.body.type_id || !req.body.editid || !req.body.title || !req.body.description){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }
      const body = req.body;
      let cdate = CurrentDate;
      let imagesarr = '';

      if(req.files && req.files.image){
          var imgname = makeid(5);
          s3w.uploadFile(req.files.image.data,imgname, (results, err) => {
            if(results){
                imagesarr=results;  
            }else{
                throw err;
            }
              Appcontent_update(body,cdate,imagesarr,(err,result)=>{
                //console.log(result);
                if(err){
                  var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                }
                else if(result.length > 0){

                  if(result[0].rescode=='1'){
                    var data = {"status":"success",'statuscode':'1',"data":'About membership update successfully'};
                  } else if(result[0].rescode=='3'){
                    var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                  }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
              });
        });
      }else{
        Appcontent_update(body,cdate,imagesarr,(err,result)=>{
                //console.log(result);
                if(err){
                  var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                }
                else if(result.length > 0){

                  if(result[0].rescode=='1'){
                    var data = {"status":"success",'statuscode':'1',"data":'About membership update successfully'};
                  } else if(result[0].rescode=='3'){
                    var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                  }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
              });
      }
  },

  delete_Appcontent:(req, res) => {
    if(!req.body.api_token || !req.body.deleteid){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }
    const body = req.body;
    Appcontent_delete(body,(err,result)=>{
                //console.log(result);
                if(err){
                  var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                }
                else if(result.length > 0){

                  if(result[0].rescode=='1'){
                    var data = {"status":"success",'statuscode':'1',"data":'About membership delete successfully'};
                  } else if(result[0].rescode=='3'){
                    var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                  }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
        });
  },

  view_Appcontent:(req, res) => {

    if(!req.body.api_token ){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }
      const body = req.body;
     Appcontent_view(body,(err,result)=>{
                //console.log(result);
                if(err){
                  var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                }
                else if(result.length > 0){

                  if(result[0].rescode=='3'){
                    var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                  } else {
                    var data = {"status":"success",'statuscode':'1',"data":result};
                  }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
        });
  },

  view_MembershipTitle:(req, res) => {
    if(!req.body.api_token ){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }
    const body = req.body;
    MembershipTitle_view(body,(err,result)=>{
                //console.log(result);
                if(err){
                  var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                }
                else if(result.length > 0){

                  if(result[0].rescode=='3'){
                    var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                  } else {
                    var data = {"status":"success",'statuscode':'1',"data":result};
                  }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
        });  
  },
  update_MembershipTitle:(req, res)=>{
    if(!req.body.api_token || !req.body.editid || !req.body.title){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }
    const body = req.body;
    MembershipTitle_update(body,(err,result)=>{
                //console.log(result);
                if(err){
                  var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                }
                else if(result.length > 0){

                  if(result[0].rescode=='1'){
                    var data = {"status":"success",'statuscode':'1',"data":'Membership title update successfully'};
                  } else if(result[0].rescode=='3'){
                    var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                  }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
              });
  },
  add_TierBenefits:(req, res)=>{
    if(!req.body.api_token || !req.body.type_id || !req.files.image || !req.body.title || !req.body.description){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }

    const body = req.body;
    let cdate = CurrentDate;
    let imagesarr = '';

    if(req.files.image){
      var imgname = makeid(5);
      s3w.uploadFile(req.files.image.data,imgname, (results, err) => {
        if(results){
            imagesarr=results;  
        }else{
            throw err;
        }
          TierBenefits_add(body,cdate,imagesarr,(err,result)=>{
            ///console.log(result);
            if(err){
              var data = {'status': "fatal_error",'statuscode': "500",'data': err};
            }
            else if(result.length > 0){

              if(result[0].rescode=='1'){
                var data = {"status":"success",'statuscode':'1',"data":'Tier benefits add successfully'};
              } else if(result[0].rescode=='3'){
                var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
              }
            } else {
              var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
            }
            return res.status(200).json(data);
          });
     });
  }
  },

  update_TierBenefits:(req, res) => {
    if(!req.body.api_token || !req.body.type_id || !req.body.editid || !req.body.title || !req.body.description){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }
      const body = req.body;
      let cdate = CurrentDate;
      let imagesarr = '';

      if(req.files && req.files.image){
          var imgname = makeid(5);
          s3w.uploadFile(req.files.image.data,imgname, (results, err) => {
            if(results){
                imagesarr=results;  
            }else{
                throw err;
            }
              TierBenefits_update(body,cdate,imagesarr,(err,result)=>{
                //console.log(result);
                if(err){
                  var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                }
                else if(result.length > 0){

                  if(result[0].rescode=='1'){
                    var data = {"status":"success",'statuscode':'1',"data":'Tier benefits update successfully'};
                  } else if(result[0].rescode=='3'){
                    var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                  }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
              });
        });
      }else{
        TierBenefits_update(body,cdate,imagesarr,(err,result)=>{
                //console.log(result);
                if(err){
                  var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                }
                else if(result.length > 0){

                  if(result[0].rescode=='1'){
                    var data = {"status":"success",'statuscode':'1',"data":'Tier benefits update successfully'};
                  } else if(result[0].rescode=='3'){
                    var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                  }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
              });
      }
  },

  delete_TierBenefits:(req, res) => {
    if(!req.body.api_token || !req.body.deleteid){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }
    const body = req.body;
    TierBenefits_delete(body,(err,result)=>{
                //console.log(result);
                if(err){
                  var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                }
                else if(result.length > 0){

                  if(result[0].rescode=='1'){
                    var data = {"status":"success",'statuscode':'1',"data":'Tier benefits delete successfully'};
                  } else if(result[0].rescode=='3'){
                    var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                  }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
        });
  },
  view_TierBenefits:(req, res) => {

    if(!req.body.api_token ){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }
      const body = req.body;
     TierBenefits_view(body,(err,result)=>{
                //console.log(result);
                if(err){
                  var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                }
                else if(result.length > 0){

                  if(result[0].rescode=='3'){
                    var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                  } else {
                    var data = {"status":"success",'statuscode':'1',"data":result};
                  }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
        });
  },

  view_Aboutas:(req, res)=>{
    if(!req.body.api_token ){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }
    const body = req.body;
    Aboutas_view(body,(err,result)=>{
                //console.log(result);
                if(err){
                  var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                }
                else if(result.length > 0){

                  if(result[0].rescode=='3'){
                    var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                  } else {
                    var data = {"status":"success",'statuscode':'1',"data":result};
                  }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
        });
  },
  update_Aboutas:(req, res)=>{
      if(!req.body.api_token || !req.body.editid || !req.body.title || !req.body.description){
        return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
      }
      const body = req.body;
      Aboutas_update(body,(err,result)=>{
                //console.log(result);
                if(err){
                  var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                }
                else if(result.length > 0){

                  if(result[0].rescode=='1'){
                    var data = {"status":"success",'statuscode':'1',"data":'About as update successfully'};
                  } else if(result[0].rescode=='3'){
                    var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                  }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
              });
  },

  view_Topuplimit:(req, res)=>{
    if(!req.body.api_token ){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }
    const body = req.body;
    Topuplimit_view(body,(err,result)=>{
                //console.log(result);
                if(err){
                  var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                }
                else if(result.length > 0){

                  if(result[0].rescode=='3'){
                    var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                  } else {
                    var data = {"status":"success",'statuscode':'1',"data":result};
                  }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
        });
  },
  update_Topuplimit:(req, res)=>{
    if(!req.body.api_token || !req.body.editid || !req.body.amount){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }
    const body = req.body;
    let cdate = CurrentDate;
    Topuplimit_update(body,cdate,(err,result)=>{
                //console.log(result);
                if(err){
                  var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                }
                else if(result.length > 0){

                  if(result[0].rescode=='1'){
                    var data = {"status":"success",'statuscode':'1',"data":'Topup limit update successfully'};
                  } else if(result[0].rescode=='3'){
                    var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                  }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
              });
  },

  add_VoucherBrand:(req, res)=>{
    if(!req.body.api_token || !req.body.name || !req.body.image_type){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }
    const body = req.body;
    let cdate = CurrentDate;
    let imagesarr = '';
    // image uplod on s3 bucket
    if(req.body.image_type =='local'){
        var imgname = makeid(5);
        s3w.uploadFile(req.files.image.data, imgname, (results, err) => {

        if(results){
            imagesarr=results;  
        }else{
            throw err;
        }
            VoucherBrand_add(body,cdate,imagesarr,(err,result)=>{
                console.log(result);
                if(err){
                  var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                  } else if(result.length > 0){
                        if(result[0].rescode=='1'){
                          var data = {"status":"success",'statuscode':'1',"data":'Voucher brand inserted successfully'};
                        } else if(result[0].rescode=='4'){  
                          var data = {"status":"failure",'statuscode':'4',"data":'Brand name already exists'};
                        } else if(result[0].rescode=='3'){
                          var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                        }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
            });
        });  
    }else{
        VoucherBrand_add(body,cdate,imagesarr,(err,result)=>{
                if(err){
                  var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                  } else if(result.length > 0){
                        if(result[0].rescode=='1'){
                          var data = {"status":"success",'statuscode':'1',"data":'Voucher brand inserted successfully'};
                        }else if(result[0].rescode=='4'){  
                          var data = {"status":"failure",'statuscode':'4',"data":'Brand name already exists'};
                        }else if(result[0].rescode=='3'){
                          var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                        }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
            });
    }
  },

  view_VoucherBrand:(req, res)=>{

    if(!req.body.api_token){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }
    const body = req.body;
    VoucherBrand_view(body,(err,result)=>{
         if(err){
            var data = {'status': "fatal_error",'statuscode': "500",'data': err};
        } else if(result.length > 0){
            if(result[0].rescode=='3'){
                var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
            }else{
                var data = {"status":"success",'statuscode':'1',"data":result};
            }
        } else {
            var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
        }
          return res.status(200).json(data);   
    });
  },

  edit_VoucherBrand:(req,res)=>{

    if(!req.body.api_token || !req.body.name || !req.body.image_type || !req.body.editid){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }
    const body = req.body;
     let cdate = CurrentDate;
     let imagesarr = '';
      if(req.body.image_type =='local'){
          var imgname = makeid(5);
        s3w.uploadFile(req.files.image.data, imgname, (results, err) => {

        if(results){
            imagesarr=results;  
        }else{
            throw err;
        }
            VoucherBrand_edit(body,cdate,imagesarr,(err,result)=>{
                console.log(result);
                if(err){
                  var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                  } else if(result.length > 0){
                        if(result[0].rescode=='1'){
                          var data = {"status":"success",'statuscode':'1',"data":'Voucher brand updated successfully'};
                        } else if(result[0].rescode=='4'){  
                          var data = {"status":"failure",'statuscode':'4',"data":'Brand name already exists'};
                        } else if(result[0].rescode=='3'){
                          var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                        }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
            });
        });  
      }else{
        VoucherBrand_edit(body,cdate,imagesarr,(err,result)=>{
                if(err){
                    var data = {'status': "fatal_error",'statuscode': "500",'data': err};
                  } else if(result.length > 0){
                        if(result[0].rescode=='1'){
                          var data = {"status":"success",'statuscode':'1',"data":'Voucher brand updated successfully'};
                        } else if(result[0].rescode=='4'){  
                          var data = {"status":"failure",'statuscode':'4',"data":'Brand name already exists'};
                        } else if(result[0].rescode=='3'){
                          var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
                        }
                } else {
                  var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
                }
                return res.status(200).json(data);
            });
      } 
  },

  delete_VoucherBrand:(req,res)=>{
    if(!req.body.api_token || !req.body.deleteid){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }
     const body = req.body;
     VoucherBrand_delete(body,(err,result)=>{
        if(err){
            var data = {'status': "fatal_error",'statuscode': "500",'data': err};
        } else if(result.length > 0){
            if(result[0].rescode=='1'){
              var data = {"status":"success",'statuscode':'1',"data":'Voucher brand deleted successfully'};
            }else if(result[0].rescode=='3'){
              var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
            }
        } else{
          var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
        }
        return res.status(200).json(data);
    });
  },

}
