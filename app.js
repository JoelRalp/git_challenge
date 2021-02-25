
'use strict';

require("dotenv").config();
var express = require("express");
var app = express();
var http = require('http');
const fileUpload = require("express-fileupload");
const mqtt = require('mqtt')
var bodyParser = require("body-parser");
var compression = require('compression');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');


app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)         
  res.setHeader('Access-Control-Allow-Credentials', true); 
  res.setHeader('Access-Control-Allow-Headers', '*');    
//  res.setHeader('Access-Control-Allow-Headers', 'Authorization');    

  // Pass to next layer of middleware
  next();
});
app.use(compression());
app.use(fileUpload());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const AdminLoginRouter = require("./Api/AdminLogin/AdminLogin.router")
const CategoryRouter = require("./Api/Category/Category.router")
const ProductRouter = require("./Api/Product/Product.router")
const MerchantRouter = require("./Api/Merchant/Merchant.router")
const VoucherRouter = require("./Api/Voucher/Voucher.router")
const OutletRouter = require("./Api/Outlet/outlet.router")
const VoucherCategoryRouter = require("./Api/VoucherCategory/Vouchercategory.router")
const VariantRouter = require("./Api/Variant/variant.router")
const EmployeeRouter = require("./Api/Employee/employee.router")
const WebOrderProduct = require("./Api/WebOrderProduct/weborder.router")
const WebOrderTable = require("./Api/Web_Order_Table/webordertable.router")
const Points = require("./Api/Points/points.router")
const PrivacyRouter = require("./Api/PrivacyPolicy/privacy.router")
const TermsRouter = require("./Api/Terms/privacy.router")
const ReservationRouter  = require("./Api/Reservation/reservation.router")


 
 app.use("/api/adminlogin",AdminLoginRouter);
 app.use("/api/category",CategoryRouter);
 app.use("/api/product",ProductRouter);
 app.use("/api/merchant",MerchantRouter)
 app.use("/api/voucher",VoucherRouter)
 app.use("/api/outlet",OutletRouter)
 app.use("/api/vouchercategory",VoucherCategoryRouter)
 app.use("/api/variant",VariantRouter)
 app.use("/api/employee",EmployeeRouter)
 app.use("/api/weborderproduct",WebOrderProduct)
 app.use("/api/webordertable",WebOrderTable)
 app.use("/api/points",Points)
 app.use("/api/privacy",PrivacyRouter)
 app.use("/api/terms",TermsRouter)
 app.use("/api/reservation",ReservationRouter)

 

// runing on port
app.set("port", 4000);
app.set("host", process.env.HOST);
app.listen(app.get("port"), "0.0.0.0", function () {
  console.log(
    "Express server listening on port " +
      app.get("host") +
      ":" +
      app.get("port")
  );
});
