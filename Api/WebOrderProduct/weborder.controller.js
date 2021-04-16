const fs = require("fs");
const { Console } = require("console");
const { VIEW_WEBORDER,ADD_WEBORDER_PRODUCT,GET_WEBORDER_PRODUCT_ID,DELETE_WEBORDER_PRODUCT,CHANGE_WEBORDER_PRODUCT_STATUS,EDIT_WEBORDER_PRODUCT,VIEW_USER,COMMON} = require("./weborder.service.");
const { makeid, refresh } = require("../Mqtt/server");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")
const s3w = require("../Aws.s3");
const { query, json } = require("express");
const ASYNC = require('async');
const { Verify_Employee } = require("../common.service");
module.exports = {
  viewWebOrder: (req, res) => {

    const body = req.body;
    let keys = "b";
    if (!req.body.api_token) { reqallfeild }

    VIEW_WEBORDER(body, keys, async (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else {

        let product = [];
        Verify_Employee(body, async (err, response) => {
          if (err) { fatal_error.data = err; return res.json(fatal_error); }
          else if (response) {
            if (response.err_id) {
              return response.status(200).json(apierrmsg)
            }
            else {
              let query = "Select * from web_order_product as wo where (wo.status = '1' or wo.status = '0') order by wo.id DESC";
              body.query = query;
              COMMON(body, (err, result) => {
                if (err) { fatal_error.data = err; return res.json(fatal_error); }
                if (result) {
                  let strres = JSON.stringify(result);
                  let jsonres = JSON.parse(strres);

                  if (result.length > 0) {
                    product.push(jsonres);

                  }
                  else { return res.status(200).json(nodatafound) }
                  let total_json = [];
                  ASYNC.each(product[0], function (element, callback) {

                    let resjson = {
                      "id": element.id,
                      "name": element.name,
                      "image": element.image,
                      "description": element.description,
                      "status": element.status

                    };

                    let query = "Select wl.id,wl.price,wc.name from web_order_product_category_list as wl inner join web_order_product_category as wc on wl.webcateID = wc.id where wl.webID  = ' " + element.id + "'";
                    let query2 = "Select * from add_on_list where addonID = ' " + element.id + "'";
                    let query3 = "Select categoryname from category where id = ' " + element.id + "'";
                    let loop_key = ['WebOrderVariation', 'WebOrderAddon', 'Category']
                    loop_key.forEach(element1 => {
                      if (element1 == "WebOrderVariation") {
                        body.query = query;
                      }
                      else if (element1 == "WebOrderAddon") {
                        body.query = query2;
                      }
                      else {
                        body.query = query3;
                      }

                      COMMON(body, (err, result) => {
                        let vcate = "";

                        if (err) { fatal_error.data = err; return res.json(fatal_error); }
                        if (result) {

                          if (element1 == "WebOrderVariation") {
                            resjson.category = result;
                          }
                          else if (element1 == "WebOrderAddon") {
                            resjson.addno = result;
                          }
                          else if (element1 == "Category") {
                            if (result.length > 0) {
                              vcate = result[0].categoryname;
                              resjson.cateID = vcate;
                            }
                            else {
                              vcate = "";
                              resjson.cateID = vcate;
                            }
                            total_json.push(resjson);
                            callback();
                          }
                        }
                      });
                    });
                  }, function (err) {
                    if (err) { fatal_error.data = err; return res.json(fatal_error); }
                    else{ sucess.data = total_json;return res.json(sucess);}});

                }


              });
            }
          }

        });

      }
    });

  },
  addWebOrder: (req, res) => {
    let webcatid = [];
    let pri = [];
    let addo = [];
    let addoquan = [];
    let insertId = "";
    let j = -1;
    let k = -1;
    let z =0;
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.name) { return res.status(200).json(reqallfeild) }
    else if (!req.files.image) { return res.status(200).json(reqallfeild) }
    else if (!req.body.description) { return res.status(200).json(reqallfeild) }
    else if (!req.body.cateID) { return res.status(200).json(reqallfeild) }
    else if (!req.body.stock_status) { return res.status(200).json(reqallfeild) } 
    else if (!req.body.webcateid) { return res.status(200).json(reqallfeild) }
    else if (!req.body.price) { return res.status(200).json(reqallfeild) }
    else if (!req.body.addon) { return res.status(200).json(reqallfeild) }
    else if (!req.body.quantity) { return res.status(200).json(reqallfeild) }
    var imgname = makeid(5);
    var webcategory = req.body.webcateid;
    var addon = req.body.addon;
    let price = req.body.price;
    let quan = req.body.quantity;
    if(webcategory.includes(","))
    {
      pri = price.split(",") ;                 
      webcatid = webcategory.split(",");
    }
    else{
      webcatid.push(req.body.webcateid);
      pri.push(price);
    }
    if(addon.includes(","))
    {
      addo = addon.split(",") ;                 
      addoquan = quan.split(",");
    }
    else{
      addo.push(req.body.addon);
      addoquan.push(quan);
    }
   let key = addo.length;
   let key2 = webcatid.length;
    var weborder_product_query = "insert into web_order_product (name,image,description,cateID,stock_status,status,created_at,updated_at) values(" + "'" + req.body.name+ "',"
     + "'" + imgname+ "',"
     + "'" + req.body.description+ "',"
     + "'" + req.body.cateID+ "',"
     + "'" + req.body.stock_status+ "',"
     + "'" + "1" + "',"
     + "now()" + ","
     + "now()" + ");";
     
     body.query = weborder_product_query;
  
    s3w.uploadFile (req.files.image.data,imgname,(results, err) => {
      if (results) {
        ADD_WEBORDER_PRODUCT(body, results,(err, results) => {
          if (err) { fatal_error.data = err; return res.json(fatal_error); }
          if(results){
             if (results.insertId) 
             {
              insertId = results.insertId;

            }
            else { resfailure.msg = results; return res.json(resfailure); }
          }
         

          webcatid.forEach(element => {
            j++;
            let mark = j +1;
            var web_order_product_category_list = "Insert into web_order_product_category_list(webcateID,webID,price,status,created_at,updated_at) values("
             + "'" + element + "'," 
             + "'" + insertId + "'," 
             + "'" + pri[j] + "',"
             + "'" + "1" + "',"
              + "now()" + ","
            + "now()" + ");";
          body.query = web_order_product_category_list;
          ADD_WEBORDER_PRODUCT(body, results,(err, results) => {
            if (err) { fatal_error.data = err; return res.json(fatal_error); }
            if (results.insertId && mark==key2) 
            {
              addo.forEach(element => {
                k++;
                var web_order_product_category_list = "Insert into add_on_list(addonID,addon_name,addon_value,status,created_at,updated_at) values("
                + "'" + insertId + "'," 
                + "'" + element + "',"  
                + "'" + addoquan[k] + "',"
                + "'" + "1" + "',"
                 + "now()" + ","
               + "now()" + ");";
               body.query = web_order_product_category_list
               ADD_WEBORDER_PRODUCT(body, results,(err, results) => {
                 z++;
                 if (err) { fatal_error.data = err; return res.json(fatal_error); }
                 if (results.insertId &&  key == z) 
                 {
                  { sucess.data = "Web order added successfully"; return res.json(sucess); }
                }
                
               });
              });
            

           }
           
          });
         });
        });
      }
      else {
        throw err;
      }
    });
   
  },
  getWebOrderProductId: (req, res) => {
    let body = req.body;
    let weborderproduct = [];
    let addon_array = [];
    let web_order_product_category_list = [];
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    let web_order_product = "Select * from web_order_product where id =" + " '" + req.body.editid + "'";
    body.query = web_order_product;
    COMMON(body,(err, results) => {
      if (err) {
        fatal_error.data = err;
        return res.json(fatal_error);
      }
      else if (results) {
        if (results.length > 0) {
          weborderproduct.push(results);
          let web_category_table = "Select * from web_order_product_category_list where webID =" + " '" + req.body.editid + "'";
          body.query = web_category_table;
          COMMON(body,(err, results) => {
            if (err) {
              fatal_error.data = err;
              return res.json(fatal_error);
            }
            else if (results) {
              if (results.length > 0) {
                web_order_product_category_list.push(results);
                let addon = "select * from add_on_list where addonID =" + " '" + req.body.editid + "'";
                body.query = addon;
                COMMON(body,(err, results) => {
                  if (err) {
                    fatal_error.data = err;
                    return res.json(fatal_error);
                  }
                  else if (results) {
                    if (results.length > 0) {
                      addon_array.push(results);
                    }
                    else{
                      addon_array
                    }
                    let weorderpro = weborderproduct[0];
                    let resjson = {
                    weborder:weorderpro,
                    category:web_order_product_category_list,
                    addons:addon_array
                    }
                    sucess.data = resjson; 
                     return res.json(sucess);
                   
                  }
                });
              }
              else {
                web_order_product_category_list;
              }
             
            }
          });
        }
        else {
          return res.status(200).json(nodatafound)
        }
      }


    });

  },
  deleteWebOrderProduct: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.deleteid) { return res.status(200).json(reqallfeild) }
    DELETE_WEBORDER_PRODUCT(body, (err, results) => {
      fatal_error.data = err;
      if (err) {return res.json(fatal_error);}
      else if (results[0].err_id == '-2') {insfailure.msg = "Invalid Id";return res.json(insfailure);}
      else if (results[0].err_id == '-1') {return res.json(apierrmsg);}
      else if (results[0].err_id == '1') {refresh();sucess.data="Table Product deleted sucessfully";return res.json(sucess);
      }
    });
  },
  changeWebOrderProductTableStatus: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.productid) { return res.status(200).json(reqallfeild) }
    else if (!req.body.status) { return res.status(200).json(reqallfeild) }
    CHANGE_WEBORDER_PRODUCT_STATUS(body, (err, results) => {
      if (err) { return res.json(fatal_error); }
      else if (results[0].err_id == '-2') { nodatafound.data = "Invalid table Id"; return res.json(nodatafound); }
      else if (results[0].err_id == '-1') { return res.json(apierrmsg); }
      else if (results[0].err_id == '1') { sucess.data = "Product status changed successfully"; return res.json(sucess); }
    });
  },
  editWebOrderProduct: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    var imgname = makeid(5);
    EDIT_WEBORDER_PRODUCT(body,imgname, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
        if(req.files){
          fs.writeFileSync("Api\\Images\\Weborder\\" + imgname + ".png", req.files.image.data);
        }
        refresh();
        inssucess.msg = "Web order product updated sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Web order product name already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
  viewUser: (req, res) => {
    console.log("in");
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    VIEW_USER(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
}
