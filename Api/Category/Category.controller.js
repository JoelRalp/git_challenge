

const{ VIEW_CATEGORY } = require("../Category/Category.service");
const{ ADD_CATEGORY } = require("../Category/Category.service");
const{ GET_CATEGORY_BY_ID } = require("../Category/Category.service");
const{ EDIT_CATEGORY } = require("../Category/Category.service");
const{CHANGE_CATEGORY_STATUS } = require("../Category/Category.service");
const fs = require("fs");
const { Console } = require("console");


module.exports = {
 
  View_Category: (req,res) => { 
    const body = req.body;
  
 
    VIEW_CATEGORY(body, (err, results) => {
      
      if (err) {
        
        return res.json({
            status: "fatal_error",
            statuscode: "500",
            data: err
          });
      }
     
     else if(results[0].err_id == "-1"){
          return res.json({
              status: "failure",
              statuscode: "4",
              msg: "Incorrect Api."
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
  Add_Category: (req,res) => { 

    if(!req.body.categoryname){return res.status(200).json({status:"failure",statuscode:"3",msg:"Required All Field"})}
    else if(!req.files.imagename){return res.status(200).json({status:"failure",statuscode:"3",msg:"Required All Field"})}
var bodyex = {
Category_name : req.body.categoryname,
Img_name : req.files.imagename
 } 
    ADD_CATEGORY(bodyex, (err, results) => {
      if (err) {
        
        return res.json({
            status: "fatal_error",
            statuscode: "500",
            data: err
          });
      }
     
     else if(results[0].err_id == 1){
    var imgname=   makeid(5);
      fs.writeFileSync("Api\\Images\\CategoryImages" + imgname +".png", req.files.imagename.data);
          return res.json({
              status: "success",
              statuscode: "1",
              msg: "Category Insert Successfully..."             
            });
        }
 
        else if(results[0].err_id == -1)
        {
          return res.json({
              status: "failure",
              statuscode: "2",
              msg:"Category Name Already Inserted"
            });
        }
        else{
          return res.json({
            status: "failure",
            statuscode: "420",
            data: results
          });
        }
     
    
    });
  },
  Get_Category_By_Id: (req,res) => { 
  let body = req.body;
    if(!req.body.api_token){return res.status(200).json({status:"failure",statuscode:"3",msg:"Invalid admin api token"})}
    else if(!req.body.editid){return res.status(200).json({status:"failure",statuscode:"2",msg:"Required All Field"})}

    GET_CATEGORY_BY_ID(body, (err, results) => {
   console.log(results);
      if (err) {
        
        return res.json({
            status: "fatal_error",
            statuscode: "500",
            data: err
          });
      }
      else{
        if(results[0].err_id == -1)
        {
          return res.json({
              status: "failure",
              statuscode: "3",
              msg:"Invalid admin api token"
            });
        }
        else if(results[0].err_id == -2)
        {
 return res.json({
            status: "failure",
            statuscode: "3",
            data: "No data found"
          });
        }
        else{
          return res.json({
            status: "success",
            statuscode: "1",
            data: results
          });
        }
      }
     
    });
  },
  Change_Category_Status: (req,res) => { 
    let body = req.body;
      if(!req.body.api_token){return res.status(200).json({status:"failure",statuscode:"3",msg:"Invalid admin api token"})}
      else if(!req.body.cateid){return res.status(200).json({status:"failure",statuscode:"3",msg:"Required All Field"})}
      else if(!req.body.status){return res.status(200).json({status:"failure",statuscode:"3",msg:"Required All Field"})}
  
      CHANGE_CATEGORY_STATUS(body, (err, results) => {
     console.log(results);
        if (err) {
          
          return res.json({
              status: "fatal_error",
              statuscode: "500",
              data: err
            });
        }
        else if(results[0].err_id == '-2')
        {
          return res.json({
            status: "failure",
            statuscode: "3",
            data: "Invalid category id"
          });
        }
      
        else  if(results[0].err_id == '-1')
          {
            return res.json({
                status: "failure",
                statuscode: "3",
                msg:"Invalid admin api token"
              });
          }     
          else if(results[0].err_id == '1'){
            return res.json({
              status: "success",
              statuscode: "1",
              data: "Category status changed successfully"
            });
          }
      
       
      });
    },
    Edit_Category: (req,res) => { 

      if(!req.body.categoryname){return res.status(200).json({status:"failure",statuscode:"3",msg:"Required All Field"})}
      else if(!req.files.imagename){return res.status(200).json({status:"failure",statuscode:"3",msg:"Required All Field"})}
      else if(!req.body.id){return res.status(200).json({status:"failure",statuscode:"3",msg:"Required All Field"})}
      else if(!req.body.api_token){return res.status(200).json({status:"failure",statuscode:"3",msg:"Required All Field"})}
  var bodyex = {
  Category_name : req.body.categoryname,
  Img_name : req.files.imagename,
  id :req.body.id,
  api_token1:req.body.api_token
   } 
      EDIT_CATEGORY(bodyex, (err, results) => {
     console.log(results);
        if (err) {
          
          return res.json({
              status: "fatal_error",
              statuscode: "500",
              data: err
            });
        }
       
       else if(results[0].err_id == 1){
      var imgname=   makeid(5);
        fs.writeFileSync("Api\\Images\\CategoryImages" + imgname +".png", req.files.imagename.data);
            return res.json({
                status: "success",
                statuscode: "1",
                msg: "Category Updated Successfully..."             
              });
          }
   
          else if(results[0].err_id == -1)
          {
            return res.json({
                status: "failure",
                statuscode: "2",
                msg:"Incorrect Api token"
              });
          }
          else if(results[0].err_id == -2)
          {
            return res.json({
                status: "failure",
                statuscode: "5",
                msg:"Category Id not found"
              });
          }
          else{
            return res.json({
              status: "failure",
              statuscode: "420",
              data: results
            });
          }
       
      
      });
    },

};
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}