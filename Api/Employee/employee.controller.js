const fs = require("fs");
const { Console } = require("console");
const { VIEW_EMPLOYEE, ADD_EMPLOYEE, GET_EMPLOYEE_ID, CHANGE_EMPLOYEE_STATUS,EDIT_EMPLOYEE,DELETE_EMPLOYEE,VIEW_EMPLOYEE_ROLE,ADD_EMPLOYEE_ROLE,EDIT_EMPLOYEE_ROLE,GET_EMPLOYEE_ROLE_ID,DELETE_EMPLOYEE_ROLE,CHANGE_EMPLOYEE_ROLE_STATUS } = require("../Employee/employee.service");
const { makeid, refresh } = require("../Mqtt/server");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")


module.exports = {
  viewEmployee: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    VIEW_EMPLOYEE(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },

  addEmployee: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(reqallfeild) }
    else if (!req.body.employee_name) { return res.status(200).json(reqallfeild) }
    else if (!req.body.eStaffid) { return res.status(200).json(reqallfeild) }
    else if (!req.body.employee_email) { return res.status(200).json(reqallfeild) }
    else if (!req.body.employee_phone) { return res.status(200).json(reqallfeild) }
    else if (!req.body.employee_ic) { return res.status(200).json(reqallfeild) }
    else if (!req.body.employee_password) { return res.status(200).json(reqallfeild) }
    else if (!req.body.employee_role) { return res.status(200).json(reqallfeild) }
    else if (!req.body.gender) { return res.status(200).json(reqallfeild) }
    else if (!req.body.nationality) { return res.status(200).json(reqallfeild) }
    else if (!req.files.employeeImage) { return res.status(200).json(reqallfeild) }
    var imgname = makeid(5);
    ADD_EMPLOYEE(body, imgname, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
        fs.writeFileSync("Api\\Images\\EmployeeImages\\" + imgname + ".png", req.files.employeeImage.data);
        refresh();
        inssucess.msg = "Employee added sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Employee name already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },

  getEmployeeById: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    GET_EMPLOYEE_ID(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else if (results[0].err_id == "-2") { return res.json(nodatafound); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },

  changeEmployeeStatus: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.employeeid) { return res.status(200).json(reqallfeild) }
    else if (!req.body.status) { return res.status(200).json(reqallfeild) }
    CHANGE_EMPLOYEE_STATUS(body, (err, results) => {
      if (err) { return res.json(fatal_error); }
      else if (results[0].err_id == '-2') { nodatafound.data = "Invalid Employee Id"; return res.json(nodatafound); }
      else if (results[0].err_id == '-1') { return res.json(apierrmsg); }
      else if (results[0].err_id == '1') { sucess.data = "Employee status changed successfully"; return res.json(sucess); }
    });
  },
  editEmployee: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(reqallfeild) }
    else if (!req.body.employee_name) { return res.status(200).json(reqallfeild) }
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    else if (!req.body.eStaffid) { return res.status(200).json(reqallfeild) }
    else if (!req.body.employee_email) { return res.status(200).json(reqallfeild) }
    else if (!req.body.employee_phone) { return res.status(200).json(reqallfeild) }
    else if (!req.body.employee_ic) { return res.status(200).json(reqallfeild) }
    else if (!req.body.employee_password) { return res.status(200).json(reqallfeild) }
    else if (!req.body.employee_role) { return res.status(200).json(reqallfeild) }
    else if (!req.body.gender) { return res.status(200).json(reqallfeild) }
    else if (!req.body.nationality) { return res.status(200).json(reqallfeild) }
    else if (!req.files.employeeImage) { return res.status(200).json(reqallfeild) }
    var imgname = makeid(5);
    EDIT_EMPLOYEE(body, imgname, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
        fs.writeFileSync("Api\\Images\\EmployeeImages\\" + imgname + ".png", req.files.employeeImage.data);
        refresh();
        inssucess.msg = "Employee updated sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Employee name already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
  deleteEmployee: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.deleteid) { return res.status(200).json(reqallfeild) }
    DELETE_EMPLOYEE(body, (err, results) => {
      if (err) {return res.json(fatal_error);}
      else if (results[0].err_id == '-2') {insfailure.msg = "Invalid Id";return res.json(insfailure);}
      else if (results[0].err_id == '-1') {return res.json(apierrmsg);}
      else if (results[0].err_id == '1') {refresh();sucess.data="Employee deleted sucessfully";return res.json(sucess);
      }
    });
  },
  viewEmployeeRole: (req, res) => {
    const body = req.body;
    console.log(req.body);
    if (!req.body.api_token) { reqallfeild }
    VIEW_EMPLOYEE_ROLE(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },

  addEmployeeRole: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.roleName) { return res.status(200).json(reqallfeild) }
    else if (!req.body.status) { return res.status(200).json(reqallfeild) }
   
    ADD_EMPLOYEE_ROLE(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
      
        refresh();
        inssucess.msg = "Employee added sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Employee name already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },

  getEmployeeRoleById: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    GET_EMPLOYEE_ROLE_ID(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else if (results[0].err_id == "-2") { return res.json(nodatafound); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },

  changeEmployeeRoleStatus: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.employeeid) { return res.status(200).json(reqallfeild) }
    else if (!req.body.status) { return res.status(200).json(reqallfeild) }
    CHANGE_EMPLOYEE_ROLE_STATUS(body, (err, results) => {
      if (err) { 
        fatal_error.data = err;
        return res.json(fatal_error);
       }
      else if (results[0].err_id == '-2') { nodatafound.data = "Invalid Employee Id"; return res.json(nodatafound); }
      else if (results[0].err_id == '-1') { return res.json(apierrmsg); }
      else if (results[0].err_id == '1') { sucess.data = "Employee status changed successfully"; return res.json(sucess); }
    });
  },
  editEmployeeRole: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.roleName) { return res.status(200).json(reqallfeild) }
    else if (!req.body.status) { return res.status(200).json(reqallfeild) }
    else if (!req.body.editid) { return res.status(200).json(reqallfeild) }
    EDIT_EMPLOYEE_ROLE(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
      
        refresh();
        inssucess.msg = "Employee updated sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Employee name already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
  deleteEmployeeRole: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg) }
    else if (!req.body.deleteid) { return res.status(200).json(reqallfeild) }
    DELETE_EMPLOYEE_ROLE(body, (err, results) => {
      if (err) {return res.json(fatal_error);}
      else if (results[0].err_id == '-2') {insfailure.msg = "Invalid Id";return res.json(insfailure);}
      else if (results[0].err_id == '-1') {return res.json(apierrmsg);}
      else if (results[0].err_id == '1') {refresh();sucess.data="Employee deleted sucessfully";return res.json(sucess);
      }
    });
  }
}
