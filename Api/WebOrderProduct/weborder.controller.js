const fs = require("fs");
const { Console } = require("console");
const { VIEW_WEBORDER} = require("./weborder.service.");
const { makeid, refresh } = require("../Mqtt/server");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")


module.exports = {
  viewWebOrder: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { reqallfeild }
    VIEW_WEBORDER(body, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
      else { sucess.data = results; return res.json(sucess); }
    });
  },
  addWebOrder: (req, res) => {
    const body = req.body;
    if (!req.body.api_token) { return res.json(apierrmsg) }
    else if (!req.body.name) { return res.status(200).json(reqallfeild) }
    else if (!req.files.image) { return res.status(200).json(reqallfeild) }
    else if (!req.body.description) { return res.status(200).json(reqallfeild) }
    else if (!req.files.cateID) { return res.status(200).json(reqallfeild) }
    else if (!req.body.stock_status) { return res.status(200).json(reqallfeild) }
    else if (!req.body.status) { return res.status(200).json(reqallfeild) }
    var imgname = makeid(5);
    ADD_WEBORDER(body, imgname, (err, results) => {
      if (err) { fatal_error.data = err; return res.json(fatal_error); }
      else if (results[0].err_id == 1) {
        fs.writeFileSync("Api\\Images\\Weborder\\" + imgname + ".png", req.files.employeeImage.data);
        refresh();
        inssucess.msg = "Web order added sucessfully"
        return res.json(inssucess);
      }
      else if (results[0].err_id == -1) { return res.json(apierrmsg); }
      else if (results[0].err_id == -2) { insfailure.msg = "Web order name already inserted"; return res.json(insfailure); }
      else { resfailure.msg = results; return res.json(resfailure); }
    });
  },
}
