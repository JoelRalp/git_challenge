

const{ GetAdmin } = require("../AdminLogin/AdminLogin.service");
const { json } = require("body-parser");

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
     
     var passfromuser = JSON.stringify(body.password);
     var passintable = JSON.stringify(body.password);
    
     
    //   if(passfromuser == passintable){
    //     results.password = undefined;
       
    //     const jsontoken = sign({ result: results }, "qwe1234", {     
    //     });
    //     ADD_JS_TOKEN(jsontoken, (err, results) => {
    //       if (err) {
        
    //         console.log(err);
    //       }
    //       else{
    //         return res.json({
    //           success: 1,
    //           message: "login successfully",
    //           data:{
    //             AuthToken:jsontoken
    //           } 
    //         });
    //       }

    //     });
      
    //   }
    //   else {
    //     return res.json({
    //       success: 0,
    //       data: "Invalid email or password"
    //     });
    //   }
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
  

};