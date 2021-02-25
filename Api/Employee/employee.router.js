
const {viewEmployee,addEmployee,getEmployeeById,changeEmployeeStatus,editEmployee,deleteEmployee,viewEmployeeRole,addEmployeeRole,getEmployeeRoleById,editEmployeeRole,deleteEmployeeRole,changeEmployeeRoleStatus} = require("./employee.controller");

const router = require("express").Router();


router.post("/ViewEmployee",viewEmployee);
router.post("/AddEmployee",addEmployee);
router.post("/GetEmployeeByID",getEmployeeById);
router.post("/ChangeEmployeeStatus",changeEmployeeStatus);
router.post("/EditEmployee",editEmployee);
router.post("/DeleteEmployee",deleteEmployee);
router.post("/ViewEmployeeRole",viewEmployeeRole);
router.post("/AddEmployeeRole",addEmployeeRole);
router.post("/GetEmployeeRoleByID",getEmployeeRoleById);
router.post("/ChangeEmployeeRoleStatus",changeEmployeeRoleStatus);
router.post("/EditEmployeeRole",editEmployeeRole);
router.post("/DeleteEmployeeRole",deleteEmployeeRole);

module.exports = router;