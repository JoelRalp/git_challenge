
const {viewReservation,addReservation,deleteReservation} = require("./reservation.controller");

const router = require("express").Router();


router.post("/ViewReservation",viewReservation);
router.post("/AddReservation",addReservation);
router.post("/DeleteReservation",deleteReservation);


module.exports = router;