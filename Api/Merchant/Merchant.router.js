const {Merchant_login} = require("./Merchant.controller");
const {Payment_Point} = require("./Merchant.controller");
const {Payment_Type} = require("./Merchant.controller");
const {Payment_Voucher} = require("./Merchant.controller");
const {Payment_History} = require("./Merchant.controller");
const {Payment_Historysearch} = require("./Merchant.controller");
const {cancel_Payment} = require("./Merchant.controller");
const {add_Merchant} = require("./Merchant.controller");
const {view_Merchant} = require("./Merchant.controller");
const {get_getMerchantId}=require("./Merchant.controller");
const {edit_Merchant}=require("./Merchant.controller");
const {statusChange_Merchant}=require("./Merchant.controller");
const {delete_Merchant}=require("./Merchant.controller");
const {Cancel_Topup}=require("./Merchant.controller");
const {check_Pin,UpdatePin} = require("./Merchant.controller");
const {day_EndSummary,ChangeMerPassword} = require("./Merchant.controller");
const {add_EndSummary,TableCheckout,ViewMerchantProfile,Cancelreservation} = require("./Merchant.controller");
const {day_EndReprot,ConfirmOrder,Fiter_Reservation} = require("./Merchant.controller");
const {day_EndReprotSearch,DeleteOrder,DeleteProduct,ViewMerchantReservation,Fiter_History} = require("./Merchant.controller");
const {merchant_Topup,Table,TableProduct} = require("./Merchant.controller");
const {payment_Wallet,webCategoryProductMobile,MerchantCategory,MerchantProduct,add_Reservation} = require("./Merchant.controller");
const {topup_History,viewMobileMerchantProductStock,viewMobileCategory,viewMobileMerchantProductStockStatus,viewMobileMerchantReservationHistory,mobileMerchantCheckin,view_User,View_outlet} = require("./Merchant.controller");


const router = require("express").Router();
router.post('/login',Merchant_login);
router.post('/paymentpoint',Payment_Point);
router.post('/paymentType',Payment_Type);
router.post('/paymentVoucher',Payment_Voucher);
router.post('/paymentHistory',Payment_History);
router.post('/paymentHistorysearch',Payment_Historysearch);
router.post('/cancelPayment',cancel_Payment);
router.post('/addMerchant',add_Merchant);
router.post('/viewMerchant',view_Merchant);
router.post('/getMerchantId',get_getMerchantId);
router.post('/editMerchant',edit_Merchant);
router.post('/statusChangeMerchant',statusChange_Merchant);
router.post('/deleteMerchant',delete_Merchant);
router.post('/checkPin',check_Pin);
router.post('/dayEndSummary',day_EndSummary);
router.post('/addEndSummary',add_EndSummary);
router.post('/dayEndReprot',day_EndReprot);
router.post('/dayEndReprotSearch',day_EndReprotSearch);
router.post('/topup',merchant_Topup);
router.post('/paymentWallet',payment_Wallet);
router.post('/topupHistory',topup_History);
router.post("/ViewProductStock",viewMobileMerchantProductStock);
router.post("/ViewMobilecategory",viewMobileCategory);
router.post("/ViewProductStockStatus",viewMobileMerchantProductStockStatus);
router.post("/ViewProductStockHistory",viewMobileMerchantReservationHistory);
router.post("/MerchantCheckin",mobileMerchantCheckin);
router.post("/WebCategoryProductMobile",webCategoryProductMobile);
router.post("/MerchantCategory",MerchantCategory);
router.post("/Merchantproduct",MerchantProduct);
router.post("/Merchantable",Table);
router.post("/TableProduct",TableProduct);
router.post("/DeleteOrder",DeleteOrder);
router.post("/DeleteProduct",DeleteProduct);
router.post("/ConfirmOrder",ConfirmOrder);
router.post("/TableCheckout",TableCheckout);
router.post("/ViewProfile",ViewProfile);
router.post("/UpdatePin",UpdatePin);
router.post("/ViewMerchantReservation",ViewMerchantReservation);
router.post("/ViewMerchantProfile",ViewMerchantProfile);
router.post("/UpdatePinCode",UpdatePinCode);
router.post("/ChangeMerPassword",ChangeMerPassword);
router.post("/Fiter_History",Fiter_History);
router.post("/Fiter_Reservation",Fiter_Reservation);
router.post("/reservationAction",Cancelreservation);
router.post("/cancelTopup",Cancel_Topup);
router.post("/viewUser",view_User);
router.post("/addReservation",add_Reservation);
router.post('/viewOutlet',View_outlet);
module.exports = router;