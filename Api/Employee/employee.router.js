
const {viewEmployee,addEmployee,getEmployeeById,changeEmployeeStatus,editEmployee,deleteOutlet} = require("./employee.controller");

const router = require("express").Router();


router.post("/ViewEmployee",viewEmployee);
router.post("/AddEmployee",addEmployee);
router.post("/GetEmployeeByID",getEmployeeById);
router.post("/ChangeEmployeeStatus",changeEmployeeStatus);
router.post("/EditEmployee",editEmployee);
router.post("/DeleteEmployee",deleteOutlet);

module.exports = router;