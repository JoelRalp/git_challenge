const ASYNC = require('async');

function VIEW_VOUCHER(data, callback){

  return(null, null);
}

function COMMON(data, callback){


let sampleJSON = {
    "status": "success",
    "statuscode": "1",
    "data": [
        {
            "id": 1,
            "cateID": 1,
            "discount_type": "Default",
            "voucher_code": "QSVZOKFIA00BXN0SAF2SL",
            "title": "dfs",
            "description": "<p>Download</p>",
            "photo": "https://nodeapirepos.s3.ap-southeast-1.amazonaws.com/OutletImages/o8oWb.jpg",
            "addDate": null,
            "color_code": "",
            "types": "",
            "types_value": "",
            "apply_to": "",
            "apply_to_value": "",
            "country": "",
            "country_value": null,
            "ship_rate": "",
            "ship_rate_value": "",
            "cust_buy": "",
            "cust_buy_value1": "",
            "cust_buy_value2": "",
            "cust_get": "",
            "cust_get_value1": "",
            "cust_get_value2": "",
            "at_discount": "",
            "at_discount_value": "",
            "set_min_order": "",
            "set_min_order_value": 0,
            "min_req": "",
            "min_req_value": "",
            "cus_elg": "None",
            "cus_elg_value": "0",
            "usage_limit": "Limit",
            "usage_limit_value": 85,
            "total_vou_count": null,
            "limt_per": null,
            "limit_per_value": "5",
            "start_date": "2021-03-29T18:30:00.000Z",
            "start_time": "10:00",
            "end_date": "2021-03-31T18:30:00.000Z",
            "end_time": "09:00",
            "expired_date": "2021-04-29T18:30:00.000Z",
            "expired_time": "03:00",
            "redeem_name": null,
            "redeem_value": null,
            "link": "Download",
            "vStatus": 1,
            "qrcode": "",
            "barcode": "",
            "created_at": "2021-03-29T23:37:40.000Z",
            "updated_at": "2021-03-29T23:37:40.000Z",
            "categoryname": "xsca"
        },
        {
            "id": 2,
            "cateID": 2,
            "discount_type": "Default",
            "voucher_code": "0WVY7CCN6XBFH4K7KGOMF",
            "title": "Tesing Pcode 30",
            "description": "<p>Testing Pcode 30</p>",
            "photo": "https://nodeapirepos.s3.amazonaws.com/OutletImages/IICCE.jpg",
            "addDate": null,
            "color_code": "#d77c14",
            "types": "",
            "types_value": "",
            "apply_to": "",
            "apply_to_value": "",
            "country": "",
            "country_value": null,
            "ship_rate": "",
            "ship_rate_value": "",
            "cust_buy": "",
            "cust_buy_value1": "",
            "cust_buy_value2": "",
            "cust_get": "",
            "cust_get_value1": "",
            "cust_get_value2": "",
            "at_discount": "",
            "at_discount_value": "",
            "set_min_order": "",
            "set_min_order_value": 0,
            "min_req": "",
            "min_req_value": "",
            "cus_elg": "Specific_customers",
            "cus_elg_value": "19,1",
            "usage_limit": "Limit",
            "usage_limit_value": 75,
            "total_vou_count": null,
            "limt_per": null,
            "limit_per_value": "5",
            "start_date": "2021-03-28T18:30:00.000Z",
            "start_time": "10:00",
            "end_date": "2021-04-21T18:30:00.000Z",
            "end_time": "09:00",
            "expired_date": "2021-04-29T18:30:00.000Z",
            "expired_time": "11:00",
            "redeem_name": null,
            "redeem_value": null,
            "link": "do",
            "vStatus": 1,
            "qrcode": "",
            "barcode": "",
            "created_at": "2021-03-30T00:31:40.000Z",
            "updated_at": "2021-03-30T00:31:40.000Z",
            "categoryname": "Testing Pcode"
        },
        {
            "id": 3,
            "cateID": 2,
            "discount_type": "Default",
            "voucher_code": "8VDZKJ1QSQOJKWB08T9VN",
            "title": "demo",
            "description": "<p>hi </p>",
            "photo": "https://nodeapirepos.s3.amazonaws.com/OutletImages/iQfXj.jpg",
            "addDate": null,
            "color_code": "#ac1616",
            "types": "",
            "types_value": "",
            "apply_to": "",
            "apply_to_value": "",
            "country": "",
            "country_value": null,
            "ship_rate": "",
            "ship_rate_value": "",
            "cust_buy": "",
            "cust_buy_value1": "",
            "cust_buy_value2": "",
            "cust_get": "",
            "cust_get_value1": "",
            "cust_get_value2": "",
            "at_discount": "",
            "at_discount_value": "",
            "set_min_order": "",
            "set_min_order_value": 0,
            "min_req": "",
            "min_req_value": "",
            "cus_elg": "specific_group",
            "cus_elg_value": "1,2,3",
            "usage_limit": "Limit",
            "usage_limit_value": 95,
            "total_vou_count": null,
            "limt_per": null,
            "limit_per_value": "5",
            "start_date": "2021-03-31T18:30:00.000Z",
            "start_time": "00:00",
            "end_date": "2021-04-22T18:30:00.000Z",
            "end_time": "00:00",
            "expired_date": "2021-04-23T18:30:00.000Z",
            "expired_time": "00:00",
            "redeem_name": null,
            "redeem_value": null,
            "link": "hi",
            "vStatus": 1,
            "qrcode": "",
            "barcode": "",
            "created_at": "2021-04-01T00:38:43.000Z",
            "updated_at": "2021-04-01T00:38:43.000Z",
            "categoryname": "Testing Pcode"
        }
    ]
}

let sampleJSON2 = [{
"id" : "1",
"cateName" : "1",
"cateStatus" : "1"
}]

 if(data == 1){
  setTimeout(function(){
    callback(null, sampleJSON);
  },2000 )

}else{
  setTimeout(function(){
    callback(null, sampleJSON2);
  },2000 )  
}

}

// const { COMMON } = require("../Voucher/Voucher.service");
  let viewVoucher =  (req, res) => {
    const body = req.body;
    let Api_token = req.api_token;
    let d = new Date();
    let cate = "";
    let total_json = []; 
    if (!Api_token) {
      // return res.json({
      //   status: "failure",
      //   statuscode: "2",
      //   data: "Required all Fields"
      // });
    }
    // if (!body.flag) { { return res.status(200).json("Req all fields") } }
    // if (body.flag) {
      // if (body.flag == 'all') {
      //   VIEW_VOUCHER(body, (err, results) => {
      //     if (err) {
      //       return res.json({
      //         status: "fatal_error",
      //         statuscode: "500",
      //         data: err
      //       });
      //     }
      //     else if (results[0].err_id == "-1") {
      //       return res.json({
      //         status: "failure",
      //         statuscode: "4",
      //         msg: "Invalid admin api token."
      //       });
      //     }
      //     else {
      //       return res.json({
      //         status: "success",
      //         statuscode: "1",
      //         data: results
      //       });
      //     }
      //   });
       
      // }
      if (body.flag == 'active') {
        let query = "select * from tb_voucher where vStatus = '1' or vStatus = '0' and discount_type = 'Default' and  cateID != '1' order by id DESC"
        body.query = query;
        COMMON(1, (err, results) => {

          // console.log(results); return;

          if (err) {  return res.json("fatal_error"); }
          
          if (results) {
            if (results.data.length > 0) {
               // Promise.all(results.map(async (element) => {
                // console.log("length", results.data.length);
              // console.log("result of query", results);

                   // if (results.data[resultIndex].start_date <= d && results.data[resultIndex].end_date >= d) {
                            
                            // console.log(resultIndex);
                            
                            // let query = "select * from tb_voucher_category where id = " + "'" + element.cateID + "'";
                            // body.query = query;

                              let responseJSON = [];

                            // assuming openFiles is an array of file names
                                ASYNC.each(results.data, function(file, callback) {
                                    COMMON(2, (err, results) => {
                                      if (err) {  return res.json("fatal_error"); }
                                      if (results) {
                                        if (results.length > 0) {
                  
                                          cate = results[0].cateName;
                                        }
                                        else {
                                          cate = "";
                                        }
                                        let json = {
                                          id: file.id,
                                          catename: cate,
                                          title: file.title,
                                          description: file.description,
                                          expired_date: file.expired_date,
                                          expired_time: file.expired_time,
                                          vStatus: file.vStatus
                  
                                        }
                                        responseJSON.push(json);
                                        // resolve(json);
                                      }
                                      callback();            
                              });
                                }, function(err) {
                                    // if any of the file processing produced an error, err would equal that error
                                    if( err ) {
                                      // One of the iterations produced an error.
                                      // All processing will now stop.
                                      console.log('A file failed to process');
                                    } else {
                                      res(null, responseJSON);
                                      console.log('All files have been processed successfully');
                                    }
                                });


                                
                            
                          
                            // return (responseJSON);

                            // new Promise((resolve, reject) => {

                            // });
                            // Promise.all(total_json).then(res=>{
                            //   console.log(res)//
                            // })
                    // }
               
              // }));             
            
            }
            else { return res.json("nodatafound"); }
          }
        });

      }
    // }
   
  };

let reqObj = {
body:{  api_token : "123456789",
  flag : "active"}
}


viewVoucher(reqObj, function(err, data){
if(err) {console.log("error", err);}
else{
  console.log(data);
}
});

  

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}