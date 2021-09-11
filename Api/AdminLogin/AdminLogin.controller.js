

const{ GetAdmin,View_Admin,View_User_Admin } = require("../AdminLogin/AdminLogin.service");
const { json } = require("body-parser");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")
module.exports = {
 
  Login_Employee: (req,res) => { 
    const body = req.body;
  
 
    GetAdmin(body, (err, results) => {
       
      
      if (err) {
        
        return res.json({
            status: "fatal_error",
            statuscode: "500",
            data: "Employee not found. Incorrect employee email!"
          });
      }
     
     else if(results[0].rescode == "4"){
          return res.json({
              status: "failure",
              statuscode: "4",
              data: "Employee not found. Incorrect employee email!"
            });
        }
       else if (results[0].rescode == "3") {
          return res.json({
              status: "failure",
              statuscode: "3",
              data: "Account Deactivated, Contact Admin."
            });
        }
        else if (results[0].rescode == "2") {
          return res.json({
              status: "failure",
              statuscode: "2",
              data: "Incorrect password!"
            });
        }
        else
        {
          return res.json({
              status: "success",
              statuscode: "1",
              data: results
            });
        }
     
     
    });
  },
  Logout_Employee: (req, res) => { 
    const body = req.body;
   
    REMOVE_JS_TOKEN(body.Auth_key, (err, results) => {
  
      if (err) {
        
        console.log(err);
      }
      else if(results.affectedRows == 0)
        {
          return res.json({
            success: 0,
            data: "Api token not present.Kindly check your Api key."
          });
        }
    else{

      return res.json({
        success: 0,
        data: "Logout Sucessful"
      });
    }
     
      
    });
  },
  ViewAdmin: (req,res) => { 
    
    const body = req.body;
    let values = [];
    if (!req.body.api_token) { return res.json(apierrmsg) }
    View_Admin(body, (err, results) => {

      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else  {
          values = results[0].err_id.split(",");
         
          let json = {

            "product_count" :values[0],
            "voucher_count" :values[1],
            "outlet_count" :values[2],
            "weborder_count" :values[3],
          }
             sucess.data = json; return res.json(sucess); 
         
      }
    

    });
  },
  ViewAdminUser: (req,res) => { 
    
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    View_User_Admin(body, (err, results) => {

      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results.length > 0) {sucess.data = results[0]; return res.json(sucess);}
      else { return res.json(nodatafound); }

    });
  }

};