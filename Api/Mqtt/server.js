const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')
var state = 'refresh'

client.on('connect', () => {
    client.publish('bang', 'true') 
  })
  module.exports = {
  refresh: () => {
    console.log(state)
    client.publish('garage/state', state)
  },
 makeid: (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
}