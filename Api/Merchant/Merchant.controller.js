const{ Login_Merchant } = require("./Merchant.service");
const{ Point_Payment } = require("./Merchant.service");
const{ Type_Payment } = require("./Merchant.service");
const{ Voucher_Payment } = require("./Merchant.service");
const{ History_Payment } = require("./Merchant.service");
const{ Historysearch_Payment } = require("./Merchant.service");
const{ Payment_cancel } = require("./Merchant.service");
const{ Merchant_add } = require("./Merchant.service");
const { makeid, refresh } = require("../Mqtt/server");
const{ Merchant_view } = require("./Merchant.service");
const{ getMerchantId_get } = require("./Merchant.service");
const{ Merchant_edit } = require("./Merchant.service");
const{ Merchant_statusChange } = require("./Merchant.service");
const{ Merchant_delete } = require("./Merchant.service");
const{ Pin_check } = require("./Merchant.service");
const{ Endsummary_day } = require("./Merchant.service");
const {Endsummary_add} = require("./Merchant.service");
const {EndReprot_day} = require("./Merchant.service");
const {EndReprotSearch_day} = require("./Merchant.service");
const {Topup_merchant} = require("./Merchant.service");
const { Wallet_payment } = require("./Merchant.service");
const {History_topup,View_Mobile_Merchant_Product_Stock,View_Mobile_Category_Mobile,View_Mobile_Merchant_Product_Update_Stock,View_Mobile_Reservation_History,Mobile_Merchant_Check_IN}=require("./Merchant.service");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")

module.exports = {

	Merchant_login:(req,res) => {
		const body = req.body;
		//console.log("in");
		Login_Merchant(body,(err,result) => { 
			//console.log(body.password);

			 if (err) {
	          return res.status(500).json({
		            status_code: 0,
		            status_msg:"Request failed,kindly ckeck your request.",            
		            data:err
	          });
            }
            else{
            	if(result[0]){
            		if(result[0].password == body.password){
            			if(result[0].status == '1'){
            				var data = {"status":"success",'statuscode':'1',"data":result};
            			}else{
            				var data = {"status":"failure",'statuscode':'3',"data":'Account Deactivated,Contact Admin'};
            			}
            		}else{
            			var data = {"status":"failure",'statuscode':'2',"data":'Incorrect password!'};
            		}	
            	}else{
            		var data = {"status":"failure",'statuscode':'4',"data":'Merchant not found. Incorrect merchant id!'};
            	}
         }     
         	return res.status(200).json(data);
		});
	},

	 Payment_Point:(req,res) => {

	 	if(req.body.user_token == '' || req.body.merchant_token == '' || req.body.amount == ''){
	 		return res.status(200).json({status:"failure",statuscode:"3",msg:"Required All Field"})
	 	}
	 	//console.log(req);
		const body = req.body;

		Point_Payment(body,(err,result) => {
			//console.log(result[0].rescode);
			if(result[0].rescode=='1'){
				var data = {"status":"success",'statuscode':'1',"data":'Payment added successfully'};
			}else if(result[0].rescode == '2'){
				var data = {"status":"failure",'statuscode':'3',"data":'Invalid user token'};
			}else if(result[0].rescode == '3'){
				var data = {"status":"failure",'statuscode':'4',"data":'Invalid merchant token'};
			}else{
				var data = {"status":"success",'statuscode':'1',"msg":'Payment added successfully',"data":result[0].rescode};
			}
			return res.status(200).json(data);
			});
		//return res.status(200).json(data);
	},

	Payment_Type:(req,res)=>{
		if(req.body.api_token == ''){
	 		return res.status(200).json({status:"failure",statuscode:"3",data:"Required All Field"})
	 	}
		const body = req.body;

			Type_Payment(body,(err,result)=>{

			if(result[0].rescode=='2'){
				var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
			}else{
				var data = {"status":"success",'statuscode':'1',"data":result};
			}
			return res.status(200).json(data);	
		});

	},

	Payment_Voucher:(req,res)=>{

		if(req.body.qrcode == '' || req.body.merchantToken == '' || req.body.amount == ''){
	 		return res.status(200).json({status:"failure",statuscode:"3",msg:"Required all field"})
	 	}

		const body = req.body;
		Voucher_Payment(body,(err,result)=>{

			if(result[0].rescode=='1'){
				var data = {"status":"success",'statuscode':'1',"data":'Voucher redeemed successfully..'};
			}else if(result[0].rescode=='2'){
				var data = {"status":"failure",'statuscode':'2',"data":'Invalid merchant api token'};
			}else if(result[0].rescode=='3'){
				var data = {"status":"failure",'statuscode':'3',"data":'This qrcode already used, please try another qrcode'};
			}else if(result[0].rescode=='4'){
				var data = {"status":"failure",'statuscode':'4',"data":'Invalid voucher code'};
			}else if(result[0].rescode=='5'){
				var data = {"status":"failure",'statuscode':'5',"data":'Voucher already expired'};
			}else if(result[0].rescode=='6'){
				var data = {"status":"failure",'statuscode':'6',"data":'Voucher limit exceeded'};
			}
			return res.status(200).json(data);

		});	
	},

	Payment_History:(req,res)=>{
		if(req.body.api_token == ''){
	 		return res.status(200).json({status:"failure",statuscode:"3",data:"Required all field"})
	 	}
		const body = req.body;
		History_Payment(body,(err,result)=>{
			 if(result[0].rescode=='2'){
				var data = {"status":"failure",'statuscode':'2',"data":'Invalid merchant api token'};
			}else if(result[0].rescode=='4'){
				var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
			}else{
				var data = {"status":"success",'statuscode':'1',"data":result};
			}
			return res.status(200).json(data);
		});
	},

	Payment_Historysearch:(req,res)=>{
		if(req.body.api_token == '' || req.body.date == ''){
	 		return res.status(200).json({status:"failure",statuscode:"3",data:"Required all field"})
	 	}
		const body = req.body;
		Historysearch_Payment(body,(err,result)=>{
			 if(result[0].rescode=='2'){
				var data = {"status":"failure",'statuscode':'2',"data":'Invalid merchant api token'};
			}else if(result[0].rescode=='4'){
				var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
			} else {
				var data = {"status":"success",'statuscode':'1',"data":result};
			}
			return res.status(200).json(data);
		});
	},
	cancel_Payment:(req,res)=>{

		if(req.body.api_token == '' || req.body.paymentid == ''){
	 		return res.status(200).json({status:"failure",statuscode:"4",data:"Required all field"})
	 	}

		const body = req.body;
		Payment_cancel(body,(err,result)=>{
			 if(result[0].rescode=='1'){
				var data = {"status":"success",'statuscode':'1',"data":'Payment cancelled successfully'};
			} else if(result[0].rescode=='2'){
				var data = {"status":"failure",'statuscode':'2',"data":'Invalid merchant code'};
			} else if(result[0].rescode=='3'){
				var data = {"status":"failure",'statuscode':'3',"data":'Invalid payment id'};
			}
			return res.status(200).json(data);
		});
	},

	add_Merchant:(req,res)=>{

		if(req.body.api_token == '' || req.body.name == '' || req.body.email == '' || req.body.phone == '' || req.body.ic == '' || req.body.staffID == '' || req.body.password == '' || req.body.pin == '' || req.body.outlet == ''){
	 		return res.status(200).json({status:"failure",statuscode:"3",msg:"Required all field"})
	 	}

		const body = req.body;
		var insertapi = makeid(80);
		Merchant_add(body,insertapi,(err,result)=>{
			if(result[0].rescode=='1'){
				var data = {"status":"success",'statuscode':'1',"data":'Merchant added successfully'};
			} else if(result[0].rescode=='2'){
				var data = {"status":"failure",'statuscode':'2',"data":'Invalid admin api token'};
			} else if(result[0].rescode=='3'){
				var data = {"status":"failure",'statuscode':'3',"data":'Merchant email already exists'};
			} else if(result[0].rescode=='4'){
				var data = {"status":"failure",'statuscode':'4',"data":'Merchant phone already exists'};
			} else if(result[0].rescode=='5'){
				var data = {"status":"failure",'statuscode':'5',"data":'Merchant ic already exists'};
			} else if(result[0].rescode=='6') {
				var data = {"status":"failure",'statuscode':'6',"data":'Merchant staffid already exists'};
			}
			return res.status(200).json(data);
		});
	},

	view_Merchant:(req,res)=>{
console.log("in");
		if(req.body.api_token == ''){
	 		return res.status(200).json({status:"failure",statuscode:"3",msg:"Required all field"})
	 	}

		const body = req.body;
		Merchant_view(body,(err,result)=>{

			if(result[0].rescode=='2'){
				var data = {"status":"failure",'statuscode':'2',"data":'Invalid admin api token'};
			}else if(result[0].rescode=='4'){
				var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
			} else {
				var data = {"status":"success",'statuscode':'1',"data":result};
			}
			return res.status(200).json(data);

		});
	},

	get_getMerchantId:(req,res)=>{

		if(req.body.api_token == '' || req.body.editid == ''){
	 		return res.status(200).json({status:"failure",statuscode:"3",msg:"Required all field"})
	 	}

		const body = req.body;
		getMerchantId_get(body,(err,result)=>{
			if(result[0].rescode=='2'){
				var data = {"status":"failure",'statuscode':'2',"data":'Invalid admin api token'};
			} else if(result[0].rescode=='4'){
				var data = {"status":"failure",'statuscode':'4',"data":'Invalid edit id'};
			} else {
				var data = {"status":"success",'statuscode':'1',"data":result};
			}
			return res.status(200).json(data);
		});
	},

	edit_Merchant:(req,res)=>{
		if(!req.body.editid  || !req.body.api_token || !req.body.name  || !req.body.email  ||  !req.body.phone || !req.body.phone || !req.body.ic || !req.body.staffID || !req.body.password  ||! req.body.pin ||! req.body.outlet ){
	 		return res.status(200).json({status:"failure",statuscode:"3",msg:"Required all field"})
	 	}
		const body = req.body;
		console.log(body);
		Merchant_edit(body,(err,result)=>{
console.log(result);
			if(result[0].rescode=='1'){
				var data = {"status":"success",'statuscode':'1',"data":'Merchant updated successfully'};
			} else if(result[0].rescode=='2'){
				var data = {"status":"failure",'statuscode':'2',"data":'Invalid admin api token'};
			} else if(result[0].rescode=='3'){
				var data = {"status":"failure",'statuscode':'3',"data":'Merchant email already exists'};
			} else if(result[0].rescode=='4'){
				var data = {"status":"failure",'statuscode':'4',"data":'Merchant phone already exists'};
			} else if(result[0].rescode=='5'){
				var data = {"status":"failure",'statuscode':'5',"data":'Merchant ic already exists'};
			} else if(result[0].rescode=='6') {
				var data = {"status":"failure",'statuscode':'6',"data":'Merchant staffid already exists'};
			}
			return res.status(200).json(data);
		});
	},

	statusChange_Merchant:(req,res)=>{

		if(req.body.api_token == '' || req.body.mid == '' || req.body.status == ''){
	 		return res.status(200).json({status:"failure",statuscode:"4",msg:"Required all field"})
	 	}

		const body = req.body;
		Merchant_statusChange(body,(err,result)=>{

			if(result[0].rescode=='1'){
				var data = {"status":"success",'statuscode':'1',"data":'Merchant status changed successfully'};
			} else if(result[0].rescode=='2'){
				var data = {"status":"failure",'statuscode':'2',"data":'Invalid admin api token'};
			} else if(result[0].rescode=='3'){
				var data = {"status":"failure",'statuscode':'3',"data":'Invalid Merchant id'};
			} 
			return res.status(200).json(data);
		});
	},

	delete_Merchant:(req,res)=>{

		if(req.body.api_token == '' || req.body.deleteid == ''){
	 		return res.status(200).json({status:"failure",statuscode:"4",msg:"Required all field"})
	 	}

		const body = req.body;
		console.log(body);
		Merchant_delete(body,(err,result)=>{

			if(result[0].rescode=='1'){
				var data = {"status":"success",'statuscode':'1',"data":'Merchant deleted successfully'};
			} else if(result[0].rescode=='2'){
				var data = {"status":"failure",'statuscode':'2',"data":'Invalid admin api token'};
			} else if(result[0].rescode=='3'){
				var data = {"status":"failure",'statuscode':'3',"data":'Invalid Merchant id'};
			} 
			return res.status(200).json(data);

		});
	},

	check_Pin:(req,res)=>{

		if(req.body.api_token == '' || req.body.pin == ''){
	 		return res.status(200).json({status:"failure",statuscode:"2",msg:"Required all field"})
	 	}

		const body = req.body;
		Pin_check(body,(err,result)=>{

			if(result[0].rescode=='2'){
				var data = {"status":"failure",'statuscode':'3',"data":'Invalid merchant pin'};
			}else{
				var data = {"status":"success",'statuscode':'1',"data":result};
			}
			return res.status(200).json(data);

		});
	},

	day_EndSummary:(req,res)=>{

		if(req.body.api_token == ''){
	 		return res.status(200).json({status:"failure",statuscode:"2",msg:"Required all field"})
	 	}

		const body = req.body;
		Endsummary_day(body,(err,result)=>{

			if(result[0].rescode=='2'){
				var data = {"status":"failure",'statuscode':'3',"data":'Invalid merchant pin'};
			}else{
				var data = {"status":"success",'statuscode':'1',"data":result};
			}
			return res.status(200).json(data);
		});
	},

	add_EndSummary:(req,res)=>{
		if(req.body.api_token == ''){
	 		return res.status(200).json({status:"failure",statuscode:"2",msg:"Required all field"})
	 	}
		const body = req.body;
		Endsummary_add(body,(err,result)=>{

			if(result[0].rescode=='3'){
				var data = {"status":"failure",'statuscode':'3',"data":'Invalid merchant pin'};
			}else if(result[0].rescode=='4'){
				var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
			}else{
				var data = {"status":"success",'statuscode':'1',"data":result};
			}
			return res.status(200).json(data);

		});
	},

	day_EndReprot:(req,res)=>{
		if(req.body.api_token == ''){
	 		return res.status(200).json({status:"failure",statuscode:"2",msg:"Required all field"})
	 	}
		const body = req.body;
		EndReprot_day(body,(err,result)=>{

			if(result[0].rescode=='3'){
				var data = {"status":"failure",'statuscode':'3',"data":'Invalid merchant pin'};
			}else if(result[0].rescode=='4'){
				var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
			}else{
				var data = {"status":"success",'statuscode':'1',"data":result};
			}
			return res.status(200).json(data);
	
		});
	},

	day_EndReprotSearch:(req,res)=>{

		if(req.body.api_token == '' || req.body.date == ''){
	 		return res.status(200).json({status:"failure",statuscode:"2",msg:"Required all field"})
	 	}

		const body = req.body;
		EndReprotSearch_day(body,(err,result)=>{

			if(result[0].rescode=='3'){
				var data = {"status":"failure",'statuscode':'3',"data":'Invalid merchant pin'};
			}else if(result[0].rescode=='4'){
				var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
			}else{
				var data = {"status":"success",'statuscode':'1',"data":result};
			}
			return res.status(200).json(data);
	
		});
	},

	merchant_Topup:(req,res)=>{

		if(req.body.api_token == '' || req.body.amount == '' || req.body.qrcode == ''){
	 		return res.status(200).json({status:"failure",statuscode:"2",msg:"Required all field"})
	 	}

		const body = req.body;
		Topup_merchant(body,(err,result)=>{

			if(result[0].rescode=='3'){
				var data = {"status":"failure",'statuscode':'3',"data":'Invalid merchant pin'};
			}else if(result[0].rescode=='4'){
				var data = {"status":"failure",'statuscode':'4',"data":'Invalid qrcode...'};
			}else{
				var data = {"status":"success",'statuscode':'1',"msg":'Topup added successfully',"data":result};
			}
			return res.status(200).json(data);

		});
	},

	payment_Wallet:(req,res)=>{
		
		if(req.body.api_token == '' || req.body.amount == '' || req.body.qrcode == ''){
	 		return res.status(200).json({status:"failure",statuscode:"2",msg:"Required all field"})
	 	}
	 	const body = req.body;
	 	Wallet_payment(body,(err,result)=>{

	 		if(result[0].rescode=='3'){
				var data = {"status":"failure",'statuscode':'3',"data":'Invalid merchant api token'};
			}else if(result[0].rescode=='4'){
				var data = {"status":"failure",'statuscode':'4',"data":'Invalid qrcode...'};
			}else if(result[0].rescode=='5'){
				var data = {"status":"failure",'statuscode':'5',"data":'Customer has insufficient balance'};
			}else{
				var data = {"status":"success",'statuscode':'1',"msg":'Wallet payment successfully',"data":result};
			}
			return res.status(200).json(data);
	});

	},

	topup_History:(req,res)=>{

		const body = req.body;	
		History_topup(body,(err,result)=>{

			if(result[0].rescode=='3'){
				var data = {"status":"failure",'statuscode':'3',"data":'Invalid merchant api token'};
			}else if(result[0].rescode=='4'){
				var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
			}else{
				var data = {"status":"success",'statuscode':'1',"data":result};
			}
			return res.status(200).json(data);

		});

	},
	viewMobileMerchantProductStock: (req, res) => {
		const body = req.body;
		if (!req.body.api_token) { reqallfeild }
		View_Mobile_Merchant_Product_Stock(body, (err, results) => {
		  if (err) { fatal_error.data = err; return res.json(fatal_error); }
		  else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
		  else { sucess.data = results; return res.json(sucess); }
		});
	  },
	  viewMobileCategory: (req, res) => {
		const body = req.body;
		if (!req.body.api_token) { apierrmsg }
		View_Mobile_Category_Mobile(body, (err, results) => {
		  if (err) { fatal_error.data = err; return res.json(fatal_error); }
		  else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
		  else { sucess.data = results; return res.json(sucess); }
		});
	  },
	  viewMobileMerchantProductStockStatus: (req, res) => {
		const body = req.body;
		if (!req.body.api_token || !req.body.productid || !req.body.status) { reqallfeild }
		View_Mobile_Merchant_Product_Update_Stock(body, (err, results) => {
		  if (err) { fatal_error.data = err; return res.json(fatal_error); }
		  else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
		  else if (results[0].err_id == "-2") { return res.json(nodatafound); }
		  else if (results[0].err_id == "1") { inssucess.msg = "Stock Updated.";return res.json(inssucess); }
		  else { sucess.data = results; return res.json(sucess); }
		});
	  },
	  viewMobileMerchantReservationHistory: (req, res) => {
		const body = req.body;
		
		if (!req.body.api_token) {  return res.json(reqallfeild) }
		else if (!req.body.type) { return res.json(reqallfeild) }; 
		View_Mobile_Reservation_History(body, (err, results) => {
			
		  if (err) { fatal_error.data = err; return res.json(fatal_error); }
		  if(results.length > 0){ 
			 if (results[0].err_id == "-1") { return res.json(apierrmsg); }
			else if (results[0].err_id == "-2") { return res.json(nodatafound); }
			else { sucess.data = results; return res.json(sucess); }
		   }
		  else
		  {
			return res.json(nodatafound); 
		  }
		});
	  },
	  mobileMerchantCheckin: (req, res) => {
		const body = req.body;
		
		if (!req.body.api_token) {  return res.json(reqallfeild) }
		else if (!req.body.tableid) { return res.json(reqallfeild) }; 
		Mobile_Merchant_Check_IN(body, (err, results) => {
			
		  if (err) { fatal_error.data = err; return res.json(fatal_error); }
		  if(results.length > 0){ 
			 if (results[0].err_id == "-1") { return res.json(apierrmsg); }
			else if (results[0].err_id == "-2") { return res.json(nodatafound); }
			else { results[0].err_id == "1"; inssucess.msg = "Updated.";return res.json(inssucess); }
		   }
		  else
		  {return res.json(nodatafound);}
		});
	  },
};