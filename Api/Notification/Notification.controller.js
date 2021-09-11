var moment = require('moment-timezone');
const { makeid, refresh } = require("../Mqtt/server");
var s3w = require("../Aws.s3")
const{NotificationAction_add} = require("./Notification.service");
const{NotificationAction_update} = require("./Notification.service");
const{NotificationAction_change} = require("./Notification.service");
const{NotificationAction_delete} = require("./Notification.service");
const{NotificationAction_view}= require("./Notification.service");
const{Notification_add}=require("./Notification.service");
const{Notification_update}=require("./Notification.service");
const{Notification_delete}=require("./Notification.service");
const{Notification_view}=require("./Notification.service");

const { json } = require("body-parser");
var CurrentDate  = moment().tz("Asia/Kuala_Lumpur").format("YYYY-MM-DD HH:mm:ss");

module.exports = {

	add_NotificationAction:(req,res)=>{

		if(!req.body.api_token || !req.body.name){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}

		const body = req.body;
		let cdate = CurrentDate;
		NotificationAction_add(body,cdate,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}
			else if(result.length > 0){

				if(result[0].rescode=='1'){
					var data = {"status":"success",'statuscode':'1',"data":'Notification action add successfully'};
				} else if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Name already exists'};
				}else if(result[0].rescode=='4'){
					var data = {"status":"failure",'statuscode':'4',"data":'Invalid api token'};
				}
			} else {
				var data = {"status":"failure",'statuscode':'5',"data":'No data found'};
			}
			return res.status(200).json(data);
		});
	},

	update_NotificationAction:(req,res)=>{

		if(!req.body.api_token || !req.body.name || !req.body.editid){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
		}
		const body = req.body;
		let cdate = CurrentDate;
		NotificationAction_update(body,cdate,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}
			else if(result.length > 0){

				if(result[0].rescode=='1'){
					var data = {"status":"success",'statuscode':'1',"data":'Notification action updated successfully'};
				} else if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Name already exists'};
				}else if(result[0].rescode=='4'){
					var data = {"status":"failure",'statuscode':'4',"data":'Invalid api token'};
				}
			} else {
				var data = {"status":"failure",'statuscode':'5',"data":'No data found'};
			}
			return res.status(200).json(data);
		});
	},

	change_NotificationAction:(req,res)=>{

		if(!req.body.api_token || !req.body.status || !req.body.editid){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})	
		}
		const body = req.body;
		let cdate = CurrentDate;
		NotificationAction_change(body,cdate,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}
			else if(result.length > 0){

				if(result[0].rescode=='1'){
					var data = {"status":"success",'statuscode':'1',"data":'Notification action status change successfully'};
				} else if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
				}
			} else {
				var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
			}
			return res.status(200).json(data);
		});
	},

	delete_NotificationAction:(req,res)=>{
		if(!req.body.api_token || !req.body.deleteid){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})	
		}
		const body = req.body;
		let cdate = CurrentDate;
		NotificationAction_delete(body,cdate,(err,result)=>{
			if(err){
				var data = {'status': "fatal_error",'statuscode': "500",'data': err};
			}
			else if(result.length > 0){

				if(result[0].rescode=='1'){
					var data = {"status":"success",'statuscode':'1',"data":'Notification action deleted successfully'};
				} else if(result[0].rescode=='3'){
					var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
				}
			} else {
				var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
			}
			return res.status(200).json(data);
		});
	},

	view_NotificationAction:(req,res)=>{
		if(!req.body.api_token){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})	
		}
		const body = req.body;
		NotificationAction_view(body,(err,result)=>{
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

	add_Notification:(req,res)=>{

		if(!req.body.api_token || !req.body.title  || !req.body.short_description || !req.body.content_title || !req.body.description || !req.body.action_button || !req.body.send_to || !req.body.send_value || !req.body.url || !req.body.publish_date || !req.body.publish_time || !req.body.image_type){
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

					Notification_add(body,cdate,imagesarr,(err,result)=>{

					if(err){
						var data = {'status': "fatal_error",'statuscode': "500",'data': err};
					}
					else if(result.length > 0){

						if(result[0].rescode=='1'){
							var data = {"status":"success",'statuscode':'1',"data":'Notification inserted successfully'};
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
    		Notification_add(body,cdate,imagesarr,(err,result)=>{

					if(err){
						var data = {'status': "fatal_error",'statuscode': "500",'data': err};
					}
					else if(result.length > 0){

						if(result[0].rescode=='1'){
							var data = {"status":"success",'statuscode':'1',"data":'Notification inserted successfully'};
						} else if(result[0].rescode=='3'){
							var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
						}
					} else {
						var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
					}
					return res.status(200).json(data);
				});
    	}
    	//console.log(imagesarr);
	},

	update_Notification:(req,res)=>{
		if(!req.body.api_token || !req.body.editid || !req.body.title || !req.body.short_description || !req.body.content_title || !req.body.description || !req.body.action_button || !req.body.send_to || !req.body.send_value || !req.body.url || !req.body.publish_date || !req.body.publish_time){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})	
		}
		const body = req.body;
		let cdate = CurrentDate;
		let imagesarr = '';	
		if(req.files && req.files.image){
    		var imgname = makeid(5);
			s3w.uploadFile(req.files.image.data, imgname, (results, err) => {
			if(results){
	  				imagesarr=results;	
				}else{
	  				throw err;
			  }
			 Notification_update(body,cdate,imagesarr,(err,result)=>{
					if(err){
						var data = {'status': "fatal_error",'statuscode': "500",'data': err};
					}
					else if(result.length > 0){

						if(result[0].rescode=='1'){
							var data = {"status":"success",'statuscode':'1',"data":'Notification updated successfully'};
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
			Notification_update(body,cdate,imagesarr,(err,result)=>{
					if(err){
						var data = {'status': "fatal_error",'statuscode': "500",'data': err};
					}
					else if(result.length > 0){

						if(result[0].rescode=='1'){
							var data = {"status":"success",'statuscode':'1',"data":'Notification updated successfully'};
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

	delete_Notification:(req,res)=>{

		if(!req.body.api_token || !req.body.deleteid){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})	
		}
		const body = req.body;
		let cdate = CurrentDate;
		Notification_delete(body,cdate,(err,result)=>{
					if(err){
						var data = {'status': "fatal_error",'statuscode': "500",'data': err};
					}
					else if(result.length > 0){

						if(result[0].rescode=='1'){
							var data = {"status":"success",'statuscode':'1',"data":'Notification deleted successfully'};
						} else if(result[0].rescode=='3'){
							var data = {"status":"failure",'statuscode':'3',"data":'Invalid api token'};
						}
					} else {
						var data = {"status":"failure",'statuscode':'4',"data":'No data found'};
					}
					return res.status(200).json(data);
				});
	},

	view_Notification:(req,res)=>{

		if(!req.body.api_token){
			return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})	
		}
		const body = req.body;
		Notification_view(body,(err,result)=>{
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

};