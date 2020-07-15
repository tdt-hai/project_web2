const accountSid = 'AC3bbbf6fd16c53a3e04fc0c9ef7a1674a';
const authToken = '1fb07451f4cbe74d0c1d17057d29b790';
const client = require('twilio')(accountSid, authToken);

client.messages
      .create({body: 'ACb bank', from: '+12058585948', to: '+84969452985'})
      .then(message => console.log(message.sid));