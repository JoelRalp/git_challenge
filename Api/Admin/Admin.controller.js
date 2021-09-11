const { json } = require("body-parser");
const bcrypt = require('bcrypt');
const { encrypt,verifyPassword} = require("../Mqtt/crypto");
const{ Admin_login,Password_reset,COMMON} = require("./Admin.service");

module.exports = {

	Login_Admin:(req,res)=>{
		if(!req.body.email || !req.body.password){
	 		return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
	 	}
	 	const body = req.body;
		Admin_login(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(result[0].rescode=='5'){
					var data = {"status":"failure",'statuscode':'5',"data":'Invalid email id'};
				}else if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Account Deactivated,Contact Admin'};
				}else{
					const check = verifyPassword(req.body.password,result[0].employee_password);
					if(check){
						var data = {"status":"success",'statuscode':'1',"msg":'Login successfully!',"data":result};
					}else{
						var data = {"status":"failure",'statuscode':'4',"data":'Invalid password'};
					}	
				}
			}
			return res.status(200).json(data);
		});
	},

	reset_Password:(req,res)=>{
		if(!req.body.api_token || !req.body.old_password || !req.body.new_password || !req.body.confirm_password){
	 		return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
	 	}
	 	const body = req.body;
	 	Password_reset(body,(err,result)=>{
	 		if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else{
				if(req.body.new_password != req.body.confirm_password){
					var data = {"status":"failure",'statuscode':'4',"data":'Your new password and confirmation password do not match'};
				}else if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
				}else{
					const check = verifyPassword(req.body.old_password,result[0].employee_password);
					if(check){
						const uppass =encrypt(req.body.new_password);
						let query1 = "UPDATE employee SET employee_password ='" + uppass + "' WHERE api_token='"+result[0].api_token+"'";
						//console.log(query1);
						body.query = query1;
						COMMON(body, (err, results) => {
						});
						var data = {"status":"success",'statuscode':'1',"data":'Your password reset successfully'};
					}else{
						var data = {"status":"failure",'statuscode':'5',"data":'Your old password was entered incorrectly'};
					}	
				}
			}
			return res.status(200).json(data);
	 	});
	},

};