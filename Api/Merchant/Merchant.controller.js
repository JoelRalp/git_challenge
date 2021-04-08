const { Login_Merchant } = require("./Merchant.service");
var admin = require("firebase-admin");
const FCM = require('fcm-node')
// const firebase = require('firebase');
const { Point_Payment } = require("./Merchant.service");
const { Type_Payment } = require("./Merchant.service");
const { Voucher_Payment } = require("./Merchant.service");
const { History_Payment } = require("./Merchant.service");
const { Historysearch_Payment,Change_Password_MERCHANT } = require("./Merchant.service");
const { Payment_cancel } = require("./Merchant.service");
const { Merchant_add } = require("./Merchant.service");
const { makeid, refresh } = require("../Mqtt/server");
const { Merchant_view,Table_Product ,Table_Checkout,Merchant_Update_Pin} = require("./Merchant.service");
const { getMerchantId_get } = require("./Merchant.service");
const { Merchant_edit } = require("./Merchant.service");
const { Merchant_statusChange } = require("./Merchant.service");
const { Merchant_delete } = require("./Merchant.service");
const { Pin_check } = require("./Merchant.service");
const { Endsummary_day,Merchant_Profile } = require("./Merchant.service");
const { Endsummary_add,Merchant_View_Reservation } = require("./Merchant.service");
const { EndReprot_day,Update_Pin } = require("./Merchant.service");
const { EndReprotSearch_day ,Delete_Product,Confirm_Order} = require("./Merchant.service");
const pool = require("../../config/database");
const { Topup_merchant, COMMON,Verify_User,Delete_Order,View_Profile } = require("./Merchant.service");
const ASYNC = require('async');
const { Wallet_payment, View_Merchant_Category_Mobile, View_Merchant_Product_Mobile } = require("./Merchant.service");
const { History_topup, View_Mobile_Merchant_Product_Stock, View_Mobile_Category_Mobile, View_Mobile_Merchant_Product_Update_Stock, View_Mobile_Reservation_History, View_Category_Product_Mobile } = require("./Merchant.service");
var { apierrmsg, sucess, fatal_error, reqallfeild, inssucess, insfailure, resfailure, nodatafound } = require("../common.service")


Merchant_login = (req, res) => {
	const body = req.body;
	//console.log("in");
	Login_Merchant(body, (err, result) => {
		//console.log(body.password);

		if (err) {
			return res.status(500).json({
				status_code: 0,
				status_msg: "Request failed,kindly ckeck your request.",
				data: err
			});
		}
		else {
			if (result[0]) {
				if (result[0].password == body.password) {
					if (result[0].status == '1') {
						var data = { "status": "success", 'statuscode': '1', "data": result };
					} else {
						var data = { "status": "failure", 'statuscode': '3', "data": 'Account Deactivated,Contact Admin' };
					}
				} else {
					var data = { "status": "failure", 'statuscode': '2', "data": 'Incorrect password!' };
				}
			} else {
				var data = { "status": "failure", 'statuscode': '4', "data": 'Merchant not found. Incorrect merchant id!' };
			}
		}
		return res.status(200).json(data);
	});
};

Payment_Point = (req, res) => {

	if (req.body.user_token == '' || req.body.merchant_token == '' || req.body.amount == '') {
		return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required All Field" })
	}
	//console.log(req);
	const body = req.body;

	Point_Payment(body, (err, result) => {
		//console.log(result[0].rescode);
		if (result[0].rescode == '1') {
			var data = { "status": "success", 'statuscode': '1', "data": 'Payment added successfully' };
		} else if (result[0].rescode == '2') {
			var data = { "status": "failure", 'statuscode': '3', "data": 'Invalid user token' };
		} else if (result[0].rescode == '3') {
			var data = { "status": "failure", 'statuscode': '4', "data": 'Invalid merchant token' };
		} else {
			var data = { "status": "success", 'statuscode': '1', "msg": 'Payment added successfully', "data": result[0].rescode };
		}
		return res.status(200).json(data);
	});
	//return res.status(200).json(data);
};

Payment_Type = (req, res) => {
	if (req.body.api_token == '') {
		return res.status(200).json({ status: "failure", statuscode: "3", data: "Required All Field" })
	}
	const body = req.body;

	Type_Payment(body, (err, result) => {

		if (result[0].rescode == '2') {
			var data = { "status": "failure", 'statuscode': '3', "data": 'Invalid api token' };
		} else {
			var data = { "status": "success", 'statuscode': '1', "data": result };
		}
		return res.status(200).json(data);
	});

};

Payment_Voucher = (req, res) => {

	if (req.body.qrcode == '' || req.body.merchantToken == '' || req.body.amount == '') {
		return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required all field" })
	}

	const body = req.body;
	Voucher_Payment(body, (err, result) => {

		if (result[0].rescode == '1') {
			var data = { "status": "success", 'statuscode': '1', "data": 'Voucher redeemed successfully..' };
		} else if (result[0].rescode == '2') {
			var data = { "status": "failure", 'statuscode': '2', "data": 'Invalid merchant api token' };
		} else if (result[0].rescode == '3') {
			var data = { "status": "failure", 'statuscode': '3', "data": 'This qrcode already used, please try another qrcode' };
		} else if (result[0].rescode == '4') {
			var data = { "status": "failure", 'statuscode': '4', "data": 'Invalid voucher code' };
		} else if (result[0].rescode == '5') {
			var data = { "status": "failure", 'statuscode': '5', "data": 'Voucher already expired' };
		} else if (result[0].rescode == '6') {
			var data = { "status": "failure", 'statuscode': '6', "data": 'Voucher limit exceeded' };
		}
		return res.status(200).json(data);

	});
};

Payment_History = (req, res) => {
	if (req.body.api_token == '') {
		return res.status(200).json({ status: "failure", statuscode: "3", data: "Required all field" })
	}
	const body = req.body;
	History_Payment(body, (err, result) => {
		if (result[0].rescode == '2') {
			var data = { "status": "failure", 'statuscode': '2', "data": 'Invalid merchant api token' };
		} else if (result[0].rescode == '4') {
			var data = { "status": "failure", 'statuscode': '4', "data": 'No data found' };
		} else {
			var data = { "status": "success", 'statuscode': '1', "data": result };
		}
		return res.status(200).json(data);
	});
};

Payment_Historysearch = (req, res) => {
	if (req.body.api_token == '' || req.body.date == '') {
		return res.status(200).json({ status: "failure", statuscode: "3", data: "Required all field" })
	}
	const body = req.body;
	Historysearch_Payment(body, (err, result) => {
		if (result[0].rescode == '2') {
			var data = { "status": "failure", 'statuscode': '2', "data": 'Invalid merchant api token' };
		} else if (result[0].rescode == '4') {
			var data = { "status": "failure", 'statuscode': '4', "data": 'No data found' };
		} else {
			var data = { "status": "success", 'statuscode': '1', "data": result };
		}
		return res.status(200).json(data);
	});
};
cancel_Payment = (req, res) => {

	if (req.body.api_token == '' || req.body.paymentid == '') {
		return res.status(200).json({ status: "failure", statuscode: "4", data: "Required all field" })
	}

	const body = req.body;
	Payment_cancel(body, (err, result) => {
		if (result[0].rescode == '1') {
			var data = { "status": "success", 'statuscode': '1', "data": 'Payment cancelled successfully' };
		} else if (result[0].rescode == '2') {
			var data = { "status": "failure", 'statuscode': '2', "data": 'Invalid merchant code' };
		} else if (result[0].rescode == '3') {
			var data = { "status": "failure", 'statuscode': '3', "data": 'Invalid payment id' };
		}
		return res.status(200).json(data);
	});
};

add_Merchant = (req, res) => {

	if (req.body.api_token == '' || req.body.name == '' || req.body.email == '' || req.body.phone == '' || req.body.ic == '' || req.body.staffID == '' || req.body.password == '' || req.body.pin == '' || req.body.outlet == '') {
		return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required all field" })
	}

	const body = req.body;
	var insertapi = makeid(80);
	Merchant_add(body, insertapi, (err, result) => {
		if (result[0].rescode == '1') {
			var data = { "status": "success", 'statuscode': '1', "data": 'Merchant added successfully' };
		} else if (result[0].rescode == '2') {
			var data = { "status": "failure", 'statuscode': '2', "data": 'Invalid admin api token' };
		} else if (result[0].rescode == '3') {
			var data = { "status": "failure", 'statuscode': '3', "data": 'Merchant email already exists' };
		} else if (result[0].rescode == '4') {
			var data = { "status": "failure", 'statuscode': '4', "data": 'Merchant phone already exists' };
		} else if (result[0].rescode == '5') {
			var data = { "status": "failure", 'statuscode': '5', "data": 'Merchant ic already exists' };
		} else if (result[0].rescode == '6') {
			var data = { "status": "failure", 'statuscode': '6', "data": 'Merchant staffid already exists' };
		}
		return res.status(200).json(data);
	});
};

view_Merchant = (req, res) => {
	console.log("in");
	if (req.body.api_token == '') {
		return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required all field" })
	}

	const body = req.body;
	Merchant_view(body, (err, result) => {

		if (result[0].rescode == '2') {
			var data = { "status": "failure", 'statuscode': '2', "data": 'Invalid admin api token' };
		} else if (result[0].rescode == '4') {
			var data = { "status": "failure", 'statuscode': '4', "data": 'No data found' };
		} else {
			var data = { "status": "success", 'statuscode': '1', "data": result };
		}
		return res.status(200).json(data);

	});
};

get_getMerchantId = (req, res) => {

	if (req.body.api_token == '' || req.body.editid == '') {
		return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required all field" })
	}

	const body = req.body;
	getMerchantId_get(body, (err, result) => {
		if (result[0].rescode == '2') {
			var data = { "status": "failure", 'statuscode': '2', "data": 'Invalid admin api token' };
		} else if (result[0].rescode == '4') {
			var data = { "status": "failure", 'statuscode': '4', "data": 'Invalid edit id' };
		} else {
			var data = { "status": "success", 'statuscode': '1', "data": result };
		}
		return res.status(200).json(data);
	});
};

edit_Merchant = (req, res) => {
	if (!req.body.editid || !req.body.api_token || !req.body.name || !req.body.email || !req.body.phone || !req.body.phone || !req.body.ic || !req.body.staffID || !req.body.password || !req.body.pin || !req.body.outlet) {
		return res.status(200).json({ status: "failure", statuscode: "3", msg: "Required all field" })
	}
	const body = req.body;
	console.log(body);
	Merchant_edit(body, (err, result) => {
		console.log(result);
		if (result[0].rescode == '1') {
			var data = { "status": "success", 'statuscode': '1', "data": 'Merchant updated successfully' };
		} else if (result[0].rescode == '2') {
			var data = { "status": "failure", 'statuscode': '2', "data": 'Invalid admin api token' };
		} else if (result[0].rescode == '3') {
			var data = { "status": "failure", 'statuscode': '3', "data": 'Merchant email already exists' };
		} else if (result[0].rescode == '4') {
			var data = { "status": "failure", 'statuscode': '4', "data": 'Merchant phone already exists' };
		} else if (result[0].rescode == '5') {
			var data = { "status": "failure", 'statuscode': '5', "data": 'Merchant ic already exists' };
		} else if (result[0].rescode == '6') {
			var data = { "status": "failure", 'statuscode': '6', "data": 'Merchant staffid already exists' };
		}
		return res.status(200).json(data);
	});
};

statusChange_Merchant = (req, res) => {

	if (req.body.api_token == '' || req.body.mid == '' || req.body.status == '') {
		return res.status(200).json({ status: "failure", statuscode: "4", msg: "Required all field" })
	}

	const body = req.body;
	Merchant_statusChange(body, (err, result) => {

		if (result[0].rescode == '1') {
			var data = { "status": "success", 'statuscode': '1', "data": 'Merchant status changed successfully' };
		} else if (result[0].rescode == '2') {
			var data = { "status": "failure", 'statuscode': '2', "data": 'Invalid admin api token' };
		} else if (result[0].rescode == '3') {
			var data = { "status": "failure", 'statuscode': '3', "data": 'Invalid Merchant id' };
		}
		return res.status(200).json(data);
	});
};

delete_Merchant = (req, res) => {

	if (req.body.api_token == '' || req.body.deleteid == '') {
		return res.status(200).json({ status: "failure", statuscode: "4", msg: "Required all field" })
	}

	const body = req.body;
	console.log(body);
	Merchant_delete(body, (err, result) => {

		if (result[0].rescode == '1') {
			var data = { "status": "success", 'statuscode': '1', "data": 'Merchant deleted successfully' };
		} else if (result[0].rescode == '2') {
			var data = { "status": "failure", 'statuscode': '2', "data": 'Invalid admin api token' };
		} else if (result[0].rescode == '3') {
			var data = { "status": "failure", 'statuscode': '3', "data": 'Invalid Merchant id' };
		}
		return res.status(200).json(data);

	});
};

check_Pin = (req, res) => {

	if (req.body.api_token == '' || req.body.pin == '') {
		return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required all field" })
	}

	const body = req.body;
	Pin_check(body, (err, result) => {

		if (result[0].rescode == '2') {
			var data = { "status": "failure", 'statuscode': '3', "data": 'Invalid merchant pin' };
		} else {
			var data = { "status": "success", 'statuscode': '1', "data": result };
		}
		return res.status(200).json(data);

	});
};

day_EndSummary = (req, res) => {

	if (req.body.api_token == '') {
		return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required all field" })
	}

	const body = req.body;
	Endsummary_day(body, (err, result) => {

		if (result[0].rescode == '2') {
			var data = { "status": "failure", 'statuscode': '3', "data": 'Invalid merchant pin' };
		} else {
			var data = { "status": "success", 'statuscode': '1', "data": result };
		}
		return res.status(200).json(data);
	});
};

add_EndSummary = (req, res) => {
	if (req.body.api_token == '') {
		return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required all field" })
	}
	const body = req.body;
	Endsummary_add(body, (err, result) => {

		if (result[0].rescode == '3') {
			var data = { "status": "failure", 'statuscode': '3', "data": 'Invalid merchant pin' };
		} else if (result[0].rescode == '4') {
			var data = { "status": "failure", 'statuscode': '4', "data": 'No data found' };
		} else {
			var data = { "status": "success", 'statuscode': '1', "data": result };
		}
		return res.status(200).json(data);

	});
};

day_EndReprot = (req, res) => {
	if (req.body.api_token == '') {
		return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required all field" })
	}
	const body = req.body;
	EndReprot_day(body, (err, result) => {

		if (result[0].rescode == '3') {
			var data = { "status": "failure", 'statuscode': '3', "data": 'Invalid merchant pin' };
		} else if (result[0].rescode == '4') {
			var data = { "status": "failure", 'statuscode': '4', "data": 'No data found' };
		} else {
			var data = { "status": "success", 'statuscode': '1', "data": result };
		}
		return res.status(200).json(data);

	});
};

day_EndReprotSearch = (req, res) => {

	if (req.body.api_token == '' || req.body.date == '') {
		return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required all field" })
	}

	const body = req.body;
	EndReprotSearch_day(body, (err, result) => {

		if (result[0].rescode == '3') {
			var data = { "status": "failure", 'statuscode': '3', "data": 'Invalid merchant pin' };
		} else if (result[0].rescode == '4') {
			var data = { "status": "failure", 'statuscode': '4', "data": 'No data found' };
		} else {
			var data = { "status": "success", 'statuscode': '1', "data": result };
		}
		return res.status(200).json(data);

	});
};

merchant_Topup = (req, res) => {

	if (req.body.api_token == '' || req.body.amount == '' || req.body.qrcode == '') {
		return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required all field" })
	}

	const body = req.body;
	Topup_merchant(body, (err, result) => {

		if (result[0].rescode == '3') {
			var data = { "status": "failure", 'statuscode': '3', "data": 'Invalid merchant pin' };
		} else if (result[0].rescode == '4') {
			var data = { "status": "failure", 'statuscode': '4', "data": 'Invalid qrcode...' };
		} else {
			var data = { "status": "success", 'statuscode': '1', "msg": 'Topup added successfully', "data": result };
		}
		return res.status(200).json(data);

	});
};

payment_Wallet = (req, res) => {

	if (req.body.api_token == '' || req.body.amount == '' || req.body.qrcode == '') {
		return res.status(200).json({ status: "failure", statuscode: "2", msg: "Required all field" })
	}
	const body = req.body;
	Wallet_payment(body, (err, result) => {

		if (result[0].rescode == '3') {
			var data = { "status": "failure", 'statuscode': '3', "data": 'Invalid merchant api token' };
		} else if (result[0].rescode == '4') {
			var data = { "status": "failure", 'statuscode': '4', "data": 'Invalid qrcode...' };
		} else if (result[0].rescode == '5') {
			var data = { "status": "failure", 'statuscode': '5', "data": 'Customer has insufficient balance' };
		} else {
			var data = { "status": "success", 'statuscode': '1', "msg": 'Wallet payment successfully', "data": result };
		}
		return res.status(200).json(data);
	});

};

topup_History = (req, res) => {

	const body = req.body;
	History_topup(body, (err, result) => {

		if (result[0].rescode == '3') {
			var data = { "status": "failure", 'statuscode': '3', "data": 'Invalid merchant api token' };
		} else if (result[0].rescode == '4') {
			var data = { "status": "failure", 'statuscode': '4', "data": 'No data found' };
		} else {
			var data = { "status": "success", 'statuscode': '1', "data": result };
		}
		return res.status(200).json(data);

	});

};
viewMobileMerchantProductStock = (req, res) => {
	const body = req.body;
	if (!req.body.api_token) { reqallfeild }
	View_Mobile_Merchant_Product_Stock(body, (err, results) => {
		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
		else { sucess.data = results; return res.json(sucess); }
	});
};
viewMobileCategory = (req, res) => {
	const body = req.body;
	if (!req.body.api_token) { apierrmsg }
	View_Mobile_Category_Mobile(body, (err, results) => {
		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
		else { sucess.data = results; return res.json(sucess); }
	});
};
viewMobileMerchantProductStockStatus = (req, res) => {
	const body = req.body;
	if (!req.body.api_token || !req.body.productid || !req.body.status) { reqallfeild }
	View_Mobile_Merchant_Product_Update_Stock(body, (err, results) => {
		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		else if (results[0].err_id == "-1") { return res.json(apierrmsg); }
		else if (results[0].err_id == "-2") { return res.json(nodatafound); }
		else if (results[0].err_id == "1") { inssucess.msg = "Stock Updated."; return res.json(inssucess); }
		else { sucess.data = results; return res.json(sucess); }
	});
};
viewMobileMerchantReservationHistory = (req, res) => {
	const body = req.body;

	if (!req.body.api_token) { return res.json(reqallfeild) }
	else if (!req.body.type) { return res.json(reqallfeild) };
	View_Mobile_Reservation_History(body, (err, results) => {

		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		if (results.length > 0) {
			if (results[0].err_id == "-1") { return res.json(apierrmsg); }
			else if (results[0].err_id == "-2") { return res.json(nodatafound); }
			else { sucess.data = results; return res.json(sucess); }
		}
		else {
			return res.json(nodatafound);
		}
	});
};

webCategoryProductMobile = async (req, res) => {
	const body = req.body;
	let Merchant;
	let WebOrderProduct;
	let Webstatus;
	let WebOrderVariation;
	let Category;
	let i = 0;
	var keyvalue = ["Merchant", "WebOrderProduct", "Webstatus", "WebOrderVariation", "Category"]
	if (!req.body.api_token) { return res.json(reqallfeild) }
	else if (!req.body.cate_id) { return res.json(reqallfeild) };
	try {
		return new Promise(resolve => {
			keyvalue.forEach(element => {

				View_Category_Product_Mobile(body, keyvalue[j], (err, results) => {

					if (err) { fatal_error.data = err; return res.json(fatal_error); }
					if (results) {


						if (element == "Merchant") {
							Merchant = results;
							resolve(Merchant);
						}
						if (element == "WebOrderProduct") {
							WebOrderProduct = results;
							resolve(WebOrderProduct);
						}
						if (element == "Webstatus") {
							Webstatus == results;
							resolve(Webstatus);
						}
						if (element == "WebOrderVariation") {
							WebOrderVariation = results;
							resolve(WebOrderVariation);
						}
						if (element == "Category") {
							Category = results;
							resolve(Category);
						}




					}
				});

			});
		});

	}
	catch (e) {


	}

};
mobileMerchantCheckin = (req, res) => {
	const body = req.body;

	if (!req.body.api_token) { return res.json(reqallfeild) }
	else if (!req.body.tableid) { return res.json(reqallfeild) };
	Mobile_Merchant_Check_IN(body, (err, results) => {

		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		if (results.length > 0) {
			if (results[0].err_id == "-1") { return res.json(apierrmsg); }
			else if (results[0].err_id == "-2") { return res.json(nodatafound); }
			else { results[0].err_id == "1"; inssucess.msg = "Updated."; return res.json(inssucess); }
		}
		else { return res.json(nodatafound); }
	});
};
MerchantCategory = (req, res) => {
	const body = req.body;

	if (!req.body.api_token) { return res.json(reqallfeild) }

	View_Merchant_Category_Mobile(body, (err, results) => {

		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		if (results.length > 0) {
			if (results[0].err_id == "-1") { return res.json(apierrmsg); }
			else if (results[0].err_id == "-2") { return res.json(nodatafound); }
			else { sucess.data = results; return res.json(sucess); }
		}//insfailure
		else { return res.json(nodatafound); }
	});
};
MerchantProduct = (req, res) => {
	const body = req.body;
	let amount = "";
	let status = "";
	
	let catename = "";
	let total_json = [];
	if (!req.body.api_token) { return res.json(reqallfeild) }
	
	View_Merchant_Product_Mobile(body, (err, results) => {

		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		if (results.length > 0) {
			if (results[0].err_id == "-1") { return res.json(apierrmsg); }
			else if (results[0].err_id == "-2") { return res.json(nodatafound); }
			else {
				
				ASYNC.each(results, function(element, callback) {

					let query_1 = "Select * from web_product_available where merchantid = " + "'" + element.merchant_id + "'" + " "
					+ "and" + " " + "productid = " + "'" + element.id + "'" + " and outletid = " + "'" + element.merchant_outlet + "'"
				let query_2 = "Select * from web_order_product_category_list where webID = " + "'" + element.id + "'" + "order by price ASC";
				let query_3 = "Select * from new_category where id =" + "'" + element.id + "' " + "and " + "status = " + "'" + element.status + "'";
				body.query = query_1;
			
					COMMON(body, (err, results) => {

						if (err) { fatal_error.data = err; return res.json(fatal_error); }
						else {
							if (results.length > 1) {
								status = "Available";
							}
							else {
								status = "Out of Stock"
							}

							body.query = query_2;
							COMMON(body, (err, results) => {
							
								if (err) { fatal_error.data = err; return res.json(fatal_error); }
								
								else {
									
									if (results.length > 1) 
									{
										console.log(results[0].price);
										amount = results[0].price;
									}
									if (results.length == 1) 
									{
										amount = results.price;
									}
									else {
										amount = "0.00"
									}
									body.query = query_3;
									
									
											COMMON(body, (err, results) => {

												if (err) { fatal_error.data = err; return res.json(fatal_error); }
		
												else {
													if (results) {
														if (results.length > 1) {
															
															catename = results[0].name;
														}
														if (results.length == 1) {
															
															catename = results[0].name;
														}
														else {
															catename = ""
														}
													}
													let json = {
														id:element.id,
														name : element.name,
														image : element.image,
														description : element.description,
														cateID: element.cateID,
														catename:catename,
														amount: amount,
														stock_status:status,
														created_at:element.created_at
													}
													total_json.push(json);
													
												}
												callback();
											});

								}
							
							});
							
						}

					}

					)


				 }, function(err) {
					// if any of the file processing produced an error, err would equal that error
					if (err) { fatal_error.data = err; return res.json(fatal_error); }
					else { sucess.data = total_json; return res.json(sucess); }
				});
				
			}
		}
		else { return res.json(nodatafound); }
	});
};
Table = (req, res) => {
	const body = req.body;
	let json = {};
	
	
	
	if (!req.body.api_token) { return res.json(reqallfeild) }
	
	Verify_User(body, (err, results) => {
		
		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		if (results.length > 0) {
			let value = results[0];
			if (results[0].err_id == "-1") { return res.json(apierrmsg); }
			else if (results[0].err_id == "-2") { return res.json(nodatafound); }
			else { 
				console.log(value[0].outlet);
				// value[0].outlet
				let query1 = "select * from table_menu where outlet = " + "'" + value[0].outlet + "' " + "and status = '1' order by id ASC" ;
				body.query = query1;
				
				COMMON(body, (err, results) => {
					let total_json = [];
					if (err) { fatal_error.data = err; return res.json(fatal_error); }
					else { 
						ASYNC.each(results, function(element, callback) { 
							let d = new Date();
							month = '' + (d.getMonth() + 1),
								day = '' + d.getDate(),
								year = d.getFullYear();
							if (month.length < 2)
								month = '0' + month;
							if (day.length < 2)
								day = '0' + day;
								let date = [year, month, day].join('-');
								console.log(date);
							let query1 = "select * from booking_table where table_id = " + "'" + element.id + "' " + "and status = 'checkin' and DATE(checkin_date) = " +"'" + date +"'" + " order by id ASC" ;
							body.query = query1;
						
							COMMON(body, (err, results) => {
							
								if (err) { fatal_error.data = err; return res.json(fatal_error); }
								if(results){
									if(results.length > 0){
										 json = {
											id:element.id,
											name:element.table_no,
											max_per:element.max_per,
											nstatus:'checkin',
											cdate: results[0].checkin_date,
											bookingid:results[0].id,
											qrcode:results[0].qrcode,
									
										}
									
										total_json.push(json);
									}
									else{
										 json = {
											id:element.id,
											name:element.table_no,
											max_per:element.max_per,
											nstatus:'',
											cdate: '0000-00-00 00:00:00',
											bookingid:'',
											qrcode:''
										
										}
										total_json.push(json);
									}
									callback();
								}
								
							});
							
						}, function(err) {
							console.log(total_json);
							if (err) { fatal_error.data = err; return res.json(fatal_error); }
							if(total_json){
								if(total_json.length == 0){ return res.json(nodatafound);}
								else { 
									sucess.data = total_json;
									 return res.json(sucess); 
									}
							}
							
						});
						
					 }
				});

			 }
		}
		else { return res.json(nodatafound); }
	});
};
TableProduct = (req, res) => {
	const body = req.body;
	
	if (!req.body.api_token) { return res.json(reqallfeild) }
	if (!req.body.bookid) { return res.json(reqallfeild) }
	
	Table_Product(body,(err, results) => {
		
		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		if(results){
			 if (results[0].err_id == "-2") { return res.json(nodatafound); }
			else if (results.length > 0) {
				var output = [];
				ASYNC.eachSeries(results, function (data,callback){ 
					let json = {
						'id':data.id,
						'orderid':data.orderid,
						'bookid' : data.book_id,
						'tablename':data.table_name,
						'amount' : data.amount,
						'created_at' :data.created_at,
						'status':data.status,
						'product':""
					}
					get_order_product(body.bookid,data.id,(err, results) => {
						json.product= results;
						if (err) { fatal_error.data = err; return res.json(fatal_error); }
			        	else{sucess.data = json; return res.json(sucess);}
						
					});
			
					
					
					
			}, function(err, results) {
				if (err) { fatal_error.data = err; return res.json(fatal_error); }
				else{sucess.data = output; return res.json(sucess);}
			});
			}
			else { return res.json(nodatafound); }
		}
		
	});

};
DeleteOrder = (req,res) => {
	const body = req.body;

	if (!req.body.api_token) { return res.json(reqallfeild) }
	else if (!req.body.orderid) { return res.json(reqallfeild) };
	Delete_Order(body, (err, results) => {

		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		if (results.length > 0) {
			if (results[0].err_id == "-1") { return res.json(apierrmsg); }
			else if (results[0].err_id == "-2") { return res.json(nodatafound); }
			else { results[0].err_id == "1"; inssucess.msg = "Order Deleted Sucessfully!!!"; return res.json(inssucess); }
		}
		else { return res.json(nodatafound); }
	});

};
DeleteProduct = (req,res) => {
	const body = req.body;

	if (!req.body.api_token) { return res.json(reqallfeild) }
	else if (!req.body.deleteid) { return res.json(reqallfeild) };
	Delete_Product(body, (err, results) => {

		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		if (results[0].length > 0) {
			if (results[0].err_id == "-1") { return res.json(apierrmsg); }
			else if (results[0].err_id == "-2") { return res.json(nodatafound); }
			else { results[0].err_id == "1"; inssucess.msg = "Product Deleted Sucessfully!!!"; return res.json(inssucess); }
		}
		else { return res.json(nodatafound); }
	});

};//Confirm_Order
ConfirmOrder = (req,res) => {
	const body = req.body;

	if (!req.body.api_token) { return res.json(reqallfeild) }
	else if (!req.body.bookingid) { return res.json(reqallfeild) };
	Confirm_Order(body, (err, results) => {

		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		if (results.length > 0) {
			if (results[0].err_id == "-1") { return res.json(apierrmsg); }
			else if (results[0].err_id == "-2") { return res.json(nodatafound); }
			else { results[0].err_id == "1"; inssucess.msg = "Order Confirmed Sucessfully!!!"; return res.json(inssucess); }
		}
		else { return res.json(nodatafound); }
	});

};
TableCheckout = (req,res) => {
	const body = req.body;

	if (!req.body.api_token) { return res.json(reqallfeild) }
	else if (!req.body.bookingid) { return res.json(reqallfeild) };
	Table_Checkout(body, (err, results) => {
console.log(results);
		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		else if (results.length > 0) {
			
			if (results[0].err_id == "-1") { return res.json(apierrmsg); }
			else if (results[0].err_id == "-2") { console.log(results[0].err_id);insfailure.msg = "Invalid booking id"; return res.json(insfailure); }
			else if (results[0].err_id =="-3") {insfailure.msg = "There are still  unconfirmed  orders in the table.Cancel order to checkout this table"; return res.json(insfailure); }
			else { results[0].err_id == "1"; inssucess.msg = "Table Checked out Sucessfully!!!"; return res.json(inssucess); }
		}
		else { return res.json(nodatafound); }
	});

};
ViewProfile = (req,res) => {
	const body = req.body;

	if (!req.body.api_token) { return res.json(reqallfeild) }
	View_Profile(body, (err, results) => {
console.log(results);
		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		else if (results.length > 0) {
			
			if (results[0].err_id == "-1") { return res.json(apierrmsg); }
			else if (results[0].err_id == "-2") { console.log(results[0].err_id);insfailure.msg = "Invalid booking id"; return res.json(insfailure); }
			else {  sucess.data = results; return res.json(sucess); }
		}
		else { return res.json(nodatafound); }
	});

};
UpdatePin = (req,res) => {
	const body = req.body;

	if (!req.body.api_token) { return res.json(reqallfeild) }
	if (!req.body.pin) { return res.json(reqallfeild) }
	Merchant_Update_Pin(body, (err, results) => {
		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		else if (results.length > 0) {	
			if (results[0].err_id == "-1") { return res.json(apierrmsg); }
			else if (results[0].err_id == "-2") { console.log(results[0].err_id);insfailure.msg = "Invalid booking id"; return res.json(insfailure); }
			else if(results[0].err_id == "1") { console.log(results[0].err_id);inssucess.msg = "Pin Updated Sucessfully"; return res.json(inssucess); }
		}
		else { return res.json(nodatafound); }
	});

};
PushNotification = (req,res) => {
	const body = req.body;
	var serverKey =  require('../Mqtt/sos-app-c54bc-firebase-adminsdk-ouhzu-fe1b7614e7.json'); //put the generated private key path here    
    
    var fcm = new FCM(serverKey)

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: body.token, 
        collapse_key: process.env.Firebasekey,
        
        data: {  //you can send only notification or only data(or include both)
            message: {
				title: body.title,
				body: body.message,
				icon: 'myIcon',
				sound: 'mySound'
			},
            moredata: 'dd'
        }
    }
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!")
        } else {
            console.log("Successfully sent with response: ", response)
        }
    })

};
ViewMerchantReservation = (req,res) => {
	const body = req.body;

	if (!req.body.api_token) { return res.json(apierrmsg) }
	if (!req.body.type) { return res.json(reqallfeild) }
	Merchant_View_Reservation(body, (err, results) => {
console.log(results);
		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		else if (results.length > 0) {
			
			if (results[0].rescode == "4") { return res.json(apierrmsg); }
			else if (results[0].rescode == "3") {  return res.json(nodatafound); }
			else {  sucess.data = results; return res.json(sucess); }
		}
		else { return res.json(nodatafound); }
	});

};
ViewMerchantProfile = (req,res) => {
	const body = req.body;

	if (!req.body.api_token) { return res.json(apierrmsg) }
	Merchant_Profile(body, (err, results) => {

		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		else if (results.length > 0) {
			
			if (results[0].err_id == "-1") { return res.json(apierrmsg); }
			else if (results[0].err_id == "-2") {  return res.json(nodatafound); }
			else {  sucess.data = results; return res.json(sucess); }
		}
		else { return res.json(nodatafound); }
	});

};
UpdatePinCode = (req,res) => {
	const body = req.body;

	if (!req.body.api_token) { return res.json(apierrmsg) }
	if (!req.body.oldpin) { return res.json(reqallfeild) }
	if (!req.body.newpin) { return res.json(reqallfeild) }
	Update_Pin(body, (err, results) => {
console.log(results);
		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		else if (results.length > 0) {
			
			if (results[0].err_id == "-1") { return res.json(apierrmsg); }
			else if (results[0].err_id == "-2") {  insfailure.msg = "Invalid Pin"; return res.json(insfailure); }
			else {  inssucess.msg = "Pin changes sucessfully!!!!"; return res.json(inssucess); }
		}
		else { return res.json(nodatafound); }
	});//Change_Password_MERCHANT

};
ChangeMerPassword = (req,res) => {
	const body = req.body;

	if (!req.body.api_token) { return res.json(apierrmsg) }
	if (!req.body.oldpassword) { return res.json(reqallfeild) }
	if (!req.body.newpassword) { return res.json(reqallfeild) }
	Change_Password_MERCHANT(body, (err, results) => {
console.log(results);
		if (err) { fatal_error.data = err; return res.json(fatal_error); }
		else if (results.length > 0) {
			
			if (results[0].err_id == "-1") { return res.json(apierrmsg); }
			else if (results[0].err_id == "-2") {  insfailure.msg = "Invalid Pin"; return res.json(insfailure); }
			else {  inssucess.msg = "Password changed sucessfully!!!!"; return res.json(inssucess); }
		}
		else { return res.json(nodatafound); }
	});//

};
function get_order_product(bookid, orderid,callBack) {
	let query = "Select * from web_order_placed_addon where bookid = '" + bookid + "'" + "and weborderplaceID = '" + orderid + "'" + "and type = 'product' and status = '2' or status = '3';"
	pool.query(query, function (error, results, filelds) {
		if (error) { console.log(error); }
		else {
			
			var output = [];
			ASYNC.eachSeries(results, function (data, callback) {
				let query1 = "Select addon from web_order_placed_addon where bookid = '" + bookid + "'" + "and weborderplaceID = '" + orderid + "'" + "and type = 'variation' and " + 'productid = ' + "'" + data.productid + "' " + "and status = '2' or status = '3';"
				let query2 = "Select addon from web_order_placed_addon where bookid = '" + bookid + "'" + "and weborderplaceID = '" + orderid + "'" + "and type = 'addon' and " + 'productid = ' + "'" + data.productid + "' " + "and status = '2' or status = '3';"
				
				pool.query(query1, function (error, resul, filelds) {
					if (error) { console.log(error); }
					pool.query(query2, function (error, result, filelds) {
						if (error) { console.log(error); }

						else {
							let json = {
								'orderid': data.id,
								'product_name': data.addon,
								'qty': data.qty,
								'remark': data.remark,
								'status': data.status,
								'variation': resul,
								'addon': result
							}
							output.push(json);
							callback();
						
						}		
						
					});


				});

			},	function(err, results) {
				
				if (err) { fatal_error.data = err; return res.json(fatal_error); }
				else{callBack(null,output);}
				
			});
			
		}
	});

}
module.exports = {

	Merchant_login,
	Payment_Point,
	Payment_Type,
	Payment_Voucher,
	Payment_History,
	Payment_Historysearch,
	cancel_Payment,
	add_Merchant,
	view_Merchant,
	get_getMerchantId,
	edit_Merchant,
	statusChange_Merchant,
	statusChange_Merchant,
	delete_Merchant,
	check_Pin,
	day_EndSummary,
	add_EndSummary,
	day_EndReprot,
	day_EndReprotSearch,
	merchant_Topup,
	payment_Wallet,
	topup_History,
	viewMobileMerchantProductStock,
	viewMobileCategory,
	viewMobileMerchantProductStockStatus,
	viewMobileMerchantReservationHistory,
	webCategoryProductMobile,
	mobileMerchantCheckin,
	MerchantCategory,
	MerchantProduct,
	Table,
	TableProduct,
	DeleteOrder,
	DeleteProduct,
	ConfirmOrder,
	TableCheckout,
	UpdatePin,
	PushNotification,
	ViewMerchantReservation,
	ViewMerchantProfile,
	UpdatePinCode,
	ChangeMerPassword

};