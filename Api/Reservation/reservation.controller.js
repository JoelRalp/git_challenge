const fs = require("fs");
const { Console } = require("console");
const { ADD_RESERVATION_TABLE,VIEW_RESERVATION_TABLE,DELETE_RESERVATION} = require("./reservation.service.");
const { makeid, refresh } = require("../Mqtt/server");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")


module.exports = {
  viewReservation: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    VIEW_RESERVATION_TABLE(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  addReservation: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.outID) { return res.status(200).json(reqallfeild) }
    else if (!req.body.date) { return res.status(200).json(reqallfeild) }
    else if (!req.body.time) { return res.status(200).json(reqallfeild) }
    else if (!req.body.pax1) { return res.status(200).json(reqallfeild) }
    else if (!req.body.pax2) { return res.status(200).json(reqallfeild) } 
    else if (!req.body.name) { return res.status(200).json(reqallfeild) }
    else if (!req.body.phone) { return res.status(200).json(reqallfeild) }
    else if (!req.body.description) { return res.status(200).json(reqallfeild) }
    else if (!req.body.out_area) { return res.status(200).json(reqallfeild) }
   
    ADD_RESERVATION_TABLE(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
      
        refresh();
        inssucess.msg = "Reservation added sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Reservation name already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
  deleteReservation: (req, res) => {
    let body = req.body;
    if (!req.body.api_token) { return res.status(200).json(apierrmsg); }
    else if (!req.body.deleteid) { return res.status(200).json(reqallfeild); }
    DELETE_RESERVATION(body,(err, results) => {
      fatal_error.data = err;
      if (err) { return res.json(fatal_error); }
      else if (results[0].err_id == '-2') { insfailure.msg = "Invalid Id"; return res.json(insfailure); }
      else if (results[0].err_id == '-1') { return res.json(apierrmsg); }
      else if (results[0].err_id == '1') {
        refresh(); sucess.data = "Reservation deleted sucessfully"; return res.json(sucess);
      }
    });
  }
}

