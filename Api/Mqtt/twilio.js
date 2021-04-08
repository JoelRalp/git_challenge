
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const sendSms = (phone, otp) => {
  const client = require('twilio')(accountSid, authToken);
  client.messages
    .create({
       body: "SOS Secret : OTP requested to verify your account. OTP:"+otp+". Do not Share with anyone",
       from: process.env.TWILIO_PHONE_NUMBER,
       to: "+"+phone
     })
    .then(message => console.log(message.sid));
}

module.exports = sendSms;