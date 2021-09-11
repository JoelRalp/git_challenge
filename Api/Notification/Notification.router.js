const {add_NotificationAction} = require("./Notification.controller");
const {update_NotificationAction} = require("./Notification.controller");
const {change_NotificationAction} = require("./Notification.controller");
const {delete_NotificationAction} = require("./Notification.controller");
const {view_NotificationAction}=require("./Notification.controller");
const {add_Notification}=require("./Notification.controller");
const {update_Notification}=require("./Notification.controller");
const {delete_Notification}=require("./Notification.controller");
const {view_Notification}=require("./Notification.controller");

const router = require("express").Router();

router.post('/addNotificationAction',add_NotificationAction);
router.post('/updateNotificationAction',update_NotificationAction);
router.post('/changeNotificationAction',change_NotificationAction);
router.post('/deleteNotificationAction',delete_NotificationAction);
router.post('/viewNotificationAction',view_NotificationAction);
router.post('/addNotification',add_Notification);
router.post('/updateNotification',update_Notification);
router.post('/deleteNotification',delete_Notification);
router.post('/viewNotification',view_Notification);
module.exports = router;