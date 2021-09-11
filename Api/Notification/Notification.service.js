const pool = require("../../config/database");

module.exports = {

	NotificationAction_add:(data,cdate,callBack)=>{
    var aapi_token=data.api_token;
    var aname=data.name;
    var CurrentDate = cdate;
    var query = "CALL add_notification_action(?,?,?,@p)";
    pool.query(
      query,
      [aapi_token,aname,CurrentDate],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );
  },

  NotificationAction_update:(data,cdate,callBack)=>{
  	var aapi_token=data.api_token;
    var aname=data.name;
    var editid=data.editid;
    var CurrentDate = cdate;
    var query = "CALL update_notification_action(?,?,?,?,@p)";
    pool.query(
      query,
      [aapi_token,aname,editid,CurrentDate],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );
  },

  NotificationAction_change:(data,cdate,callBack)=>{
  	var aapi_token=data.api_token;
  	var astatus=data.status;
  	var editid=data.editid;
    var CurrentDate = cdate;
    var query = "CALL status_notification_action(?,?,?,?,@p)";
    pool.query(
      query,
      [aapi_token,astatus,editid,CurrentDate],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );
  },

  NotificationAction_delete:(data,cdate,callBack)=>{
  	var aapi_token=data.api_token;
  	var deleteid=data.deleteid;
  	var CurrentDate = cdate;
  	var query = "CALL delete_notification_action(?,?,?,@p)";
  	pool.query(
      query,
      [aapi_token,deleteid,CurrentDate],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );	
  },

  NotificationAction_view:(data,callBack)=>{
  	 var aapi_token=data.api_token;
  	 var query = "CALL view_notification_action(?,@p)";
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

  Notification_add:(data,cdate,imagesarr,callBack)=>{
  	var aapi_token=data.api_token;
  	var ntitle=data.title;
  	var nimage=imagesarr;
  	var nshort_description=data.short_description;
  	var ncontent_title=data.content_title;
  	var ndescription=data.description;
  	var naction_button=data.action_button;
  	var nsend_to=data.send_to;
  	var nsend_value=data.send_value;
  	var nurl=data.url;
  	var npublish_date=data.publish_date;
  	var npublish_time=data.publish_time;
  	var nview_id=data.view_id;
  	var nview_title=data.view_title;
  	var nlearn_more_url=data.learn_more_url;
  	var CurrentDate = cdate;
    var image_type = data.image_type;
    var gallery_id = data.gallery_id;
  	var query = "CALL add_notification(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@p)";
    console.log(aapi_token);
  	pool.query(
      query,
      [aapi_token,ntitle,nimage,nshort_description,ncontent_title,ndescription,naction_button,nsend_to,nsend_value,nurl,npublish_date,npublish_time,nview_id,nview_title,nlearn_more_url,CurrentDate,image_type,gallery_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );	
  },

  Notification_update:(data,cdate,imagesarr,callBack)=>{
  	var aapi_token=data.api_token;
  	var editid=data.editid;
  	var ntitle=data.title;
  	var nimage=imagesarr;
  	var nshort_description=data.short_description;
  	var ncontent_title=data.content_title;
  	var ndescription=data.description;
  	var naction_button=data.action_button;
  	var nsend_to=data.send_to;
  	var nsend_value=data.send_value;
  	var nurl=data.url;
  	var npublish_date=data.publish_date;
  	var npublish_time=data.publish_time;
  	var nview_id=data.view_id;
  	var nview_title=data.view_title;
  	var nlearn_more_url=data.learn_more_url;
  	var CurrentDate = cdate;
  	var query = "CALL edit_notification(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@p)";
  	pool.query(
      query,
      [aapi_token,editid,ntitle,nimage,nshort_description,ncontent_title,ndescription,naction_button,nsend_to,nsend_value,nurl,npublish_date,npublish_time,nview_id,nview_title,nlearn_more_url,CurrentDate],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );
  },

  Notification_delete:(data,cdate,callBack)=>{
  	var aapi_token=data.api_token;
  	var deleteid=data.deleteid;
  	var CurrentDate = cdate;
  	var query = "CALL delete_notification(?,?,?,@p)";
  	pool.query(
      query,
      [aapi_token,deleteid,CurrentDate],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results[0]);
      }
    );
  },

  Notification_view:(data,callBack)=>{
     var query = "SELECT n.*,nc.name,g.image as note_image FROM notification as n INNER JOIN notification_action as nc ON n.action_button=nc.id INNER JOIN tb_gallery as g ON n.image=g.id where n.status = '1'"
     if (data.search_by) {
        query=query + " " + "and (n.notification_id like '%" + data.search_by + "%') " 
      }

      if(data.filter_by){
        query=query + " " + "and n.status= " + data.filter_by
      }

      if(data.sort_by){
        query=query + " " + "order by n.id "+data.sort_by
      }else{
        query = query + " " + "order by n.id DESC";
      }
  	 pool.query(
      query,
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        //console.log(mapi_token);
        return callBack(null, results);
      }
    );
  },
}