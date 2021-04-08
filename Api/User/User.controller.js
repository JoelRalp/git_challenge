
const sendSms = require("../Mqtt/twilio");
var moment = require('moment-timezone');
var async = require('async');
const { makeid, refresh } = require("../Mqtt/server");
const{ Phone_login } = require("./User.service");
const{ Verified_otp } = require("./User.service");
const{ Otpverified_login } = require("./User.service");
const{ Resend_otp } =  require("./User.service");
const{ Update_name } = require("./User.service");
const{ Login_facebook } = require("./User.service");
const{ Login_google } = require("./User.service");
const{ Login_apple } = require("./User.service");
const{ Get_usedata } =  require("./User.service");
const{ Firebase_add } = require("./User.service");
const{ Referral_check } = require("./User.service");
const{ List_Referral } = require("./User.service");
const{ Outlet_View } = require("./User.service");
const{ Reservation_Add } = require("./User.service");
const{ Reservation_View }= require("./User.service");
const{ Reservation_Cancel }=require("./User.service");
const{ voucher_View }=require("./User.service");
const { voucherfavourite_Add } = require("./User.service");
const { voucherfavourite_View } = require("./User.service");
const { Redeem_Add } = require("./User.service");
const { Redeem_Check }= require("./User.service");
const { Category_View } = require("./User.service");
const { Subcategory_View } = require("./User.service");
const { Product_View } = require("./User.service");
const { COMMON } = require("./User.service");


const { sign } = require("jsonwebtoken");
const { json } = require("body-parser");

module.exports = {

	Login_phone:(req,res)=>{
		if(!req.body.phone){
	 		return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
	 	}
		const body = req.body;
		var insertapi = makeid(80);
		var otp=Math.floor(1000 + Math.random() * 9000);
		var sphone=req.body.phone;
		Phone_login(body,insertapi,otp,(err,result)=>{
			
		if(err){
			var data = {'status': "fatal_error",'statuscode': "500",'data': err};
		}else{
			
			var json = JSON.parse(result[0].rescode);
			if(!json.name){
				sendSms(sphone,otp);
				var data = {"status":"failure",'statuscode':'3',"msg":'Phone number not registered',"data":JSON.parse(result[0].rescode)};
  			}else{
  				sendSms(sphone,otp);
  				var data = {"status":"sucess",'statuscode':'1',"msg":'Otp send sucessfully!',"data":JSON.parse(result[0].rescode)};
  			}
		}
			return res.status(200).json(data);
		});
	},

	Otp_verified:(req,res)=>{

		if(!req.body.api_token  || !req.body.otp  || !req.body.phone ){
	 		return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
	 	}

		const body = req.body;
		Verified_otp(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Invalid otp'};
				}else{
					var data = {"status":"success",'statuscode':'1',"msg":'Otp verified successfully!',"data":result[0]};
				}
			}
			return res.status(200).json(data);
		});
	},

	Login_otpverified:(req,res)=>{

		if(!req.body.api_token  || !req.body.otp  || !req.body.phone ){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}
		const body = req.body;
		Otpverified_login(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Invalid otp'};
				}else if(result[0].rescode=='4'){
					var data = {"status":"failure",'statuscode':'4',"data":'Invalid api token'};
				}else{
					var data = {"status":"success",'statuscode':'1',"msg":'Otp verified successfully!',"data":result[0]};
				}
			}
			return res.status(200).json(data);
		});
	},

	Otp_resend:(req,res)=>{

		if(!req.body.api_token  || !req.body.phone ){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}
		const body = req.body;
		var otp=Math.floor(1000 + Math.random() * 9000);
		var sphone=req.body.phone;
		Resend_otp(body,otp,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='1'){
					sendSms(sphone,otp);
					var data = {"status":"success",'statuscode':'1',"data":'Otp send successfully!'};
				}else if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
				}else if(result[0].rescode=='4'){
					var data = {"status":"failure",'statuscode':'4',"data":'Phone number already exist'};
				}
			}
			return res.status(200).json(data);
		});
	},

	Name_update:(req,res)=>{

		if(!req.body.api_token  || !req.body.name ){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}

		const body = req.body;
		Update_name(body,(err,result)=>{
			//console.log(result);
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Invalid api_token'};
				}else{
					var data = {"status":"success",'statuscode':'1',"msg":'Name updated successfully',"data":result[0]};
				}
			}
			return res.status(200).json(data);	
		});
	},

	Facebook_login:(req,res)=>{

		if(!req.body.fb_id  || !req.body.name){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}

		const body = req.body;
		var insertapi = makeid(80);
		Login_facebook(body,insertapi,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				var data = {"status":"success",'statuscode':'1',"data":result[0]};
			}
			return res.status(200).json(data);
		});
	},

	Google_login:(req,res)=>{

		if(!req.body.google_id  || !req.body.name || !req.body.email){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}

		const body = req.body;
		var insertapi = makeid(80);
		Login_google(body,insertapi,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				var data = {"status":"success",'statuscode':'1',"data":result[0]};
			}
			return res.status(200).json(data);
		});
	},

	Apple_login:(req,res)=>{

		if(!req.body.apple_id  || !req.body.name){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}

		const body = req.body;
		var insertapi = makeid(80);

		Login_apple(body,insertapi,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				var data = {"status":"success",'statuscode':'1',"data":result[0]};
			}
			return res.status(200).json(data);
		});
	},

	UseData_get:(req,res)=>{

		if(!req.body.api_token ){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}

		const body = req.body;
		Get_usedata(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
				}else{
					var data = {"status":"success",'statuscode':'1',"data":result[0]};
				}
			}
			return res.status(200).json(data);
		});	
	},

	Add_firebase:(req,res)=>{

		if(!req.body.api_token  || !req.body.device_token || !req.body.device_type || !req.body.login_type){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}

		const body = req.body;
		Firebase_add(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='1'){
					var data = {"status":"success",'statuscode':'1',"data":'Firebase token insert successfully'};
				}else if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
				}
			}
			return res.status(200).json(data);
		});		
	},

	Check_referral:(req,res)=>{

		if(!req.body.api_token  || !req.body.referral_code){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}

		const body = req.body;
		Referral_check(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Invalid Referral Code'};
				}else {
					var data = {"status":"success",'statuscode':'1',"data":result[0]};
				}
			}
			return res.status(200).json(data);
		});
	},

	Referral_list:(req,res)=>{
		
		if(!req.body.api_token ){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}
		const body = req.body;
		List_Referral(body,(err,result)=>{
			//console.log(result);
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'No data found'};
				}else if(result[0].rescode=='4'){
					var data = {"status":"failure",'statuscode':'4',"data":'Invalid api token'};
				}else {
					var data = {"status":"success",'statuscode':'1',"data":result};
				}
			}
			return res.status(200).json(data);
		});
	},

	View_outlet:(req,res)=>{
		if(!req.body.api_token ){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}
		const body = req.body;
		Outlet_View(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'No data found'};
				}else if(result[0].rescode=='4'){
					var data = {"status":"failure",'statuscode':'4',"data":'Invalid api token'};
				}else {
					var data = {"status":"success",'statuscode':'1',"data":result};
				}
			}
			return res.status(200).json(data);
		});
	},

	Add_reservation:(req,res)=>{

		if(!req.body.api_token || !req.body.outID || !req.body.date || !req.body.time || !req.body.pax1 || !req.body.pax2 || !req.body.name || !req.body.email || !req.body.phone || !req.body.description || !req.body.out_area){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}
		const body = req.body;
		Reservation_Add(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='1'){
					var data = {"status":"success",'statuscode':'1',"data":'Reservation insert successfully'};
				}else if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
				}
			}
			return res.status(200).json(data);
		});
	},

	View_reservation:(req,res)=>{
		if(!req.body.api_token || !req.body.type){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}
		const body = req.body;
		Reservation_View(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'No data found'};
				}else if(result[0].rescode=='4'){
					var data = {"status":"failure",'statuscode':'4',"data":'Invalid api token'};
				}else {
					var data = {"status":"success",'statuscode':'1',"data":result};
				}
			}
			return res.status(200).json(data);
		});
	},

	Cancel_reservation:(req,res)=>{
		if(!req.body.api_token || !req.body.id || !req.body.comment){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}
		const body = req.body;
		Reservation_Cancel(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='1'){
					var data = {"status":"success",'statuscode':'1',"data":'Cancel reservation successfully...'};
				}else if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Invailed reservation id'};
				}else if(result[0].rescode=='4'){
					var data = {"status":"failure",'statuscode':'4',"data":'Invalid api token'};
				}
			}
			return res.status(200).json(data);
		});
	},

	View_voucher:(req,res)=>{

		if(!req.body.api_token){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}

		const body = req.body;
		voucher_View(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'No data found'};
				}else if(result[0].rescode=='4'){
					var data = {"status":"failure",'statuscode':'4',"data":'Invalid api token'};
				}else {
					var data = {"status":"success",'statuscode':'1',"data":result};
				}
			}
			return res.status(200).json(data);
		});
	},

	Add_voucherfavourite:(req,res)=>{

		if(!req.body.api_token || !req.body.voucherID){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}
		
		const body = req.body;
		voucherfavourite_Add(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='1'){
					var data = {"status":"success",'statuscode':'1',"data":'Favourite insert successfully'};
				}else if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Voucher already favourite'};
				}else if(result[0].rescode=='4'){
					var data = {"status":"failure",'statuscode':'4',"data":'Invalid voucher'};
				}else if(result[0].rescode=='5'){
					var data = {"status":"failure",'statuscode':'5',"data":'Invalid api token'};
				}
			}
			return res.status(200).json(data);
		});
	},

	View_voucherfavourite:(req,res)=>{

		if(!req.body.api_token ){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}

		const body = req.body;
		voucherfavourite_View(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'No data found'};
				}else if(result[0].rescode=='4'){
					var data = {"status":"failure",'statuscode':'4',"data":'Invalid api token'};
				}else {
					var data = {"status":"success",'statuscode':'1',"data":result};
				}
			}
			return res.status(200).json(data);
		});
	},

	add_Redeem:(req,res)=>{

		if(!req.body.api_token || !req.body.voucherID){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}
		const body = req.body;
		var insertapi = makeid(80);
		var CurrentDate  = moment().tz("Asia/Kuala_Lumpur").format("YYYY-MM-DD HH:mm:ss");

		Redeem_Add(body,insertapi,CurrentDate,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='1'){
					var data = {"status":"success",'statuscode':'1',"data":'Redeem insert successfully'};
				}else if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Already processing in voucher'};
				}else if(result[0].rescode=='4'){
					var data = {"status":"failure",'statuscode':'4',"data":'Invalid api token'};
				}
			}
			return res.status(200).json(data);
		});
	},

	check_Redeem:(req,res)=>{
		if(!req.body.api_token || !req.body.voucherID){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}
		const body = req.body;
		var CurrentDate  = moment().tz("Asia/Kuala_Lumpur").format("YYYY-MM-DD HH:mm:ss");
		Redeem_Check(body,CurrentDate,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Timeout please try again later'};
				}else {
					var data = {"status":"success",'statuscode':'1',"data":result,"DateTime":CurrentDate};
				}
			}
			return res.status(200).json(data);
		});
	},

	view_Category:(req,res)=>{
		const body = req.body;
		Category_View(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='2'){
					var data = {"status":"failure",'statuscode':'2',"data":'No data found'};
				} else {
					var data = {"status":"success",'statuscode':'1',"data":result};
				}
			}
			return res.status(200).json(data);
		});
	},

	view_Subcategory:(req,res)=>{
		if(!req.body.cateid){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}
		const body = req.body;
		Subcategory_View(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='2'){
					var data = {"status":"failure",'statuscode':'2',"data":'No data found'};
				} else {
					var data = {"status":"success",'statuscode':'1',"data":result};
				}
			}
			return res.status(200).json(data);
		});
	},

	view_Product: (req,res)=>{

	let total_json = [];
	let vimage=[];
		if(!req.body.cateid || !req.body.subcateid){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}
		const body = req.body;

	async=>Product_View(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='2'){
					var data = {"status":"failure",'statuscode':'2',"data":'No data found'};
				} else {
						result.forEach(element => { 

						let query1 = "select * from new_product_image where productId = " + "'" + element.id + "' " + "and status = '1' order by id ASC" ;
						body.query = query1;
						//var vimage = [];
						COMMON(body, (err, results) => {
							if(results){
								 vimage=results;
							}else{
								 vimage=[];
							}
							console.log(vimage);	
						});
						console.log(vimage);
						let	json = {
								id:element.id,
								cateName:element.cateName,
								subcateName:element.subcateName,
								productName:element.productName,
								sku:element.sku,
								cost:element.cost,
								sellingPrice:element.sellingPrice,
								type:element.type,
								status:element.status,
								image:newimgae,
							}
							total_json.push(json);
						
						});
						//console.log(newArr);
					var data = {"status":"success",'statuscode':'1',"data":total_json};
				}
			}
			return res.status(200).json(data);
		});
	},

};