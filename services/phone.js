const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'ae2a2a06',
  apiSecret: 'MQgxZlmBkiAC9DTQ',
});

async function sendSMS(from,to,text){
    return nexmo.message.sendSms(from, to, text);
}
module.exports = {sendSMS};

