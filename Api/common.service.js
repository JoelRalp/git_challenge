
 var apierrmsg = {
    status: "failure",
    statuscode: "4",
    data: "Invalid Api"
  }
  var reqallfeild = {
    status: "failure",
    statuscode: "2",
    data: "Required all feilds."
  }
  var  fatal_error = {
    status: "fatal_error",
    statuscode: "500",
    data: "" 
  }
  var sucess = {
    status: "success",
    statuscode: "1",
    data: ""
  }
  var inssucess = {
    status: "success",
    statuscode: "1",
    msg: ""
  }
  var insfailure = {
    status: "failure",
    statuscode: "2",
    msg: ""
  }
  var resfailure = {
    status: "failure",
    statuscode: "420",
    msg: ""
  }
  var nodatafound = {
    status: "failure",
    statuscode: "3",
    data: "No data found"
  }
module.exports = {
    apierrmsg,
    fatal_error,
    sucess,
    reqallfeild,
    inssucess,
    insfailure,
    resfailure,
    nodatafound
}