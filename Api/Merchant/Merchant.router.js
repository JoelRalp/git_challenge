const {Merchant_login} = require("./Merchant.controller");
const {Payment_Point} = require("./Merchant.controller");

const router = require("express").Router();

router.post('/login',Merchant_login);
router.post('/paymentpoint',Payment_Point);

module.exports = router;