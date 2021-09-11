

const{ VIEW_VOUCHER_CATEGORY, ADD_VOUCHER_CATEGORY,EDIT_VOUCHER_CATEGORY,GET_VOUCHER_CATEGORY,CHANGE_VOUCHER_CATEGORY_STATUS,DELETE_VOUCHER_CATEGORY,Category_View} = require("../VoucherCategory/Vouchercategory.service");
const{ refresh} = require("../Mqtt/server");


module.exports = {
 
  viewVoucherCategory: (req, res) => {
    const body = req.body;
    let Api_token = body.api_token;
    if (!Api_token) {
      return res.json({
        status: "failure",
        statuscode: "2",
        data: "Required all Fields"
      });
    }

    VIEW_VOUCHER_CATEGORY(body, (err, results, callback) => {
      if (err) {
        return res.json({
          status: "fatal_error",
          statuscode: "500",
          data: err
        });
      }
if(results){
  if (results[0].err_id == "-1") {
    return res.json({
      status: "failure",
      statuscode: "4",
      msg: "Invalid admin api token."
    });
  }
  else {
    return res.json({
      status: "success",
      statuscode: "1",
      data: results
    });
  }
 
}
   else{
    return res.json({
      status: "failure",
      statuscode: "3",
      msg: "NO data found."
    });
   }  


    });
  },
  addVoucherCategory: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) {
      return res.json({
        status: "failure",
        statuscode: "2",
        data: "Required all Fields"
      });
    }
    else if (!req.body.cateName) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.cateStatus) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.cateType) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }

    ADD_VOUCHER_CATEGORY(body, (err, results) => {
      if (err) {

        return res.json({
          status: "fatal_error",
          statuscode: "500",
          data: err
        });
      }

      else if (results[0].err_id == 1) {

        refresh();
        return res.json({
          status: "success",
          statuscode: "1",
          msg: "Category Inserted Successfully..."
        });
      }

      else if (results[0].err_id == -1) {
        return res.json({
          status: "failure",
          statuscode: "4",
          msg: "Invalid Api Token"
        });
      }

      else if (results[0].err_id == -2) {
        return res.json({
          status: "failure",
          statuscode: "2",
          msg: "Category Name Already Inserted"
        });
      }
      else {
        return res.json({
          status: "failure",
          statuscode: "420",
          data: results
        });
      }


    });
  },
  editVoucherCategory: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.id) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.cateName) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.cateStatus) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }
    else if (!req.body.cateType) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" }) }

    EDIT_VOUCHER_CATEGORY(body, (err, results) => {

      if (err) {

        return res.json({
          status: "fatal_error",
          statuscode: "500",
          data: err
        });
      }
      else if (results[0].err_id == '-2') {
        return res.json({
          status: "failure",
          statuscode: "3",
          data: "Category Name Already Exists"
        });
      }

      else if (results[0].err_id == '-1') {
        return res.json({
          status: "failure",
          statuscode: "3",
          msg: "Invalid admin api token"
        });
      }
      else if (results[0].err_id == '1') {

        refresh();
        return res.json({
          status: "success",
          statuscode: "1",
          data: "Category name updated changed successfully"
        });
      }


    });
  },
  getVoucherCategoryById: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "3", msg: "Invalid admin api token" }) }
    else if (!req.body.editid) { return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required All Field" }) }

    GET_VOUCHER_CATEGORY(body, (err, results) => {

      if (err) {

        return res.json({
          status: "fatal_error",
          statuscode: "500",
          data: err
        });
      }

      else if (results[0].err_id == "-1") {
        return res.json({
          status: "failure",
          statuscode: "3",
          msg: "Invalid admin api token"
        });
      }
      else if (results[0].err_id == "-2") {
        return res.json({
          status: "failure",
          statuscode: "3",
          data: "No data found"
        });
      }
      else {
        return res.json({
          status: "success",
          statuscode: "1",
          data: results
        });
      }


    });
  },
  changeVoucherCategoryStatus: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "2", msg: "Invalid admin api token" }) }
    else if (!req.body.cateid) { return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required All Field" }) }
    else if (!req.body.status) { return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required All Field" }) }

    CHANGE_VOUCHER_CATEGORY_STATUS(body, (err, results) => {

      if (err) {

        return res.json({
          status: "fatal_error",
          statuscode: "500",
          data: err
        });
      }
      else if (results[0].err_id == '-2') {
        return res.json({
          status: "failure",
          statuscode: "4",
          data: "Invalid Category id"
        });
      }

      else if (results[0].err_id == '-1') {
        return res.json({
          status: "failure",
          statuscode: "3",
          msg: "Invalid admin api token"
        });
      }
      else if (results[0].err_id == '1') {
        return res.json({
          status: "success",
          statuscode: "1",
          data: "Category status changed successfully"
        });
      }


    });
  },
  deleteVoucherCategory: (req, res) => {
    let body = req.body;

    if (!req.body.api_token) { return res.status(200).json({ status: "failure", statuscode: "2", msg: "Invalid admin api token" }) }
    else if (!req.body.id) { return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required All Field" }) }

    DELETE_VOUCHER_CATEGORY(body, (err, results) => {

      if (err) {

        return res.json({
          status: "fatal_error",
          statuscode: "500",
          data: err
        });
      }
      else if (results[0].err_id == '-2') {
        return res.json({
          status: "failure",
          statuscode: "3",
          data: "Invalid category id"
        });
      }

      else if (results[0].err_id == '-1') {
        return res.json({
          status: "failure",
          statuscode: "4",
          msg: "Invalid admin api token"
        });
      }
      else if (results[0].err_id == '1') {
        refresh();
        return res.json({
          status: "success",
          statuscode: "1",
          data: "category deleted successfully"
        });
      }
    });
  },
  view_Category:(req, res) => {

    if(!req.body.api_token || !req.body.type){
      return res.status(200).json({status:"failure",statuscode:"2",data:"Required all field"})
    }
    const body = req.body;
    Category_View(body,(err,result)=>{
      if(err){
        var data = {'status': "fatal_error",'statuscode': "500",'data': err};
      }
      else if(result.length > 0){

        if(result[0].rescode=='4'){
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

