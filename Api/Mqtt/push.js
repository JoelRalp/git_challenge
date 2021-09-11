
const FCM = require('fcm-node')

const PushNotification = (token,title,message) => {
    
    var serverKey =  require('../Mqtt/sos-app-c54bc-firebase-adminsdk-ouhzu-fe1b7614e7.json');  
  
    var fcm = new FCM(serverKey)
    var collapseKey = 'new_message';
            var message = {
            to: token,
            data: {
                cpeMac: '000000000000',
                type: 'malware' 
            },
            notification: {
                title: title,
                body: message,
                tag: collapseKey,
                icon: 'myIcon',
                color: '#18d821',
                sound: 'mySound',
            },
        };

    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!",err)
        } else {
            console.log("Successfully sent with response: ", response)
        }
    })

}

module.exports = {
    PushNotification
};
