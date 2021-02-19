
const {viewOutlet} = require("./outlet.controller");
const {addOutlet} = require("./outlet.controller");
const {getOutletById} = require("./outlet.controller");
const {changeOutletStatus} = require("./outlet.controller");
const {editOutlet} = require("./outlet.controller");
const {deleteOutlet} = require("./outlet.controller");
const router = require("express").Router();

// Routes
/**
 * @swagger
 * /customers:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post("/ViewOutlet",viewOutlet);
router.post("/AddOutlet",addOutlet);
router.post("/ViewOutletById",getOutletById);
router.post("/ChangeStatusOutlet",changeOutletStatus);
router.post("/EditOutlet",editOutlet);
router.post("/DeleteOutlet",deleteOutlet);




module.exports = router;