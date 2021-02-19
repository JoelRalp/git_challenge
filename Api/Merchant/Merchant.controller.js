const{ Login_Merchant } = require("./Merchant.service");
const{ Point_Payment } = require("./Merchant.service");


var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:4000')
var topic = "trigger";
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
            				var data = {"status":"failure",'statuscode':'3',"data":'Account Deactivated, Contact Admin'};
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

};