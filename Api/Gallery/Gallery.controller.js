const fs = require("fs");
const s3w = require("../Aws.s3");
const { makeid, refresh } = require("../Mqtt/server");
const{ COMMON } = require("./Gallery.service");
const{Gallery_View}=require("./Gallery.service");
const{Gallery_delete}=require("./Gallery.service");
var moment = require('moment-timezone');
var CurrentDate  = moment().tz("Asia/Kuala_Lumpur").format("YYYY-MM-DD HH:mm:ss");
module.exports = {

	add_Gallery: (req, res) => {

		if(!req.body.api_token || !req.files.image){
	 		return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
	 	}

		const body = req.body;
		let cdate = CurrentDate;
		
		if (req.files) { 
		var fileKeys = Object.keys(req.files);
		console.log(fileKeys);
			fileKeys.forEach(element => {
				var imgname = makeid(5);
				 s3w.uploadFile(req.files[element].data, imgname, (results, err) => {
				 	if (err) {return res.json(fatal_error);}
					let query = "INSERT INTO tb_gallery(image ,status ,created_at,updated_at) VALUES ('" + results + "'," +
                      "'" + "1" + "',"+"'"+cdate+"',"+"'"+cdate+"');";
                      body.query = query;
                      console.log(query);
                      COMMON(body, (err, results) => {
                      		if(err){
							var data = {'status': "fatal_error",'statuscode': "500",'data': err};
							}else{
								if (results) {
                          			if (results.affectedRows == 1) { var data = {"status":"success",'statuscode':'1',"data":'Gallery image added successfully!'}; }
                        		}
							}
							return res.status(200).json(data);
                      });
				 });	
			});	
		}
	},

	view_Gallery:(req, res)=>{
		if(!req.body.api_token){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}
		const body = req.body;
		Gallery_View(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}
			else if(result.length > 0){

				if(result[0].rescode=='4'){
					var data = {"status":"failure",'statuscode':'4',"data":'Invalid api token'};
				} else {
					var data = {"status":"success",'statuscode':'1',"data":result};
				}
			} else {
				var data = {"status":"failure",'statuscode':'3',"data":'No data found'};
			}
			return res.status(200).json(data);
		});
	},

	delete_Gallery:(req,res)=>{
		if(!req.body.api_token || !req.body.deleteid){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}
		const body = req.body;
		Gallery_delete(body,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}else if(result.length > 0){
				if(result[0].rescode=='1'){
					var data = {"status":"success",'statuscode':'1',"data":'Gallery image deleted successfully'};
				} else if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'4',"data":'Invalid api token'};
				}
			}else{
				var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
			}
			return res.status(200).json(data);
		});
	},
}
