const db = require('./services/db');
const Account = require('./services/account');
const User =  require('./services/user');
const Function = require('./services/function');
const asyncHandler = require('express-async-handler');
const { AccountContext } = require('twilio/lib/rest/api/v2010/account');

db.sync().then(async function () {
   
    var datenow = await Function.getDateNow();
        datenow = datenow.toString();
    const listTKTK = await Account.findAllSavingsAccounts();
    var AccountOutOfTerm = new Array();
    listTKTK.forEach(t => {
        const day = Function.formatDate(t.close_day);
        if(day == datenow){
            AccountOutOfTerm.push(t.account_number);
        }
        
    });
    console.log(AccountOutOfTerm.length);
   console.log(AccountOutOfTerm);
   
    await AccountOutOfTerm.forEach(async(ac) =>  {
        console.log(ac);
        await Account.DeleteSavingsAccountsByAccountNumber(ac);
    });
}).catch(console.error);

