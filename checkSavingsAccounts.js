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
    //Neu close_day là ngày hôm nay sẽ       đóng tài khoản tiết kiệm
    await listTKTK.forEach(async(t) => {
        const day = Function.formatDate(t.close_day);
        if(day == datenow){
            const tktt = await Account.findCheckingAccountById(t.userId);
            const updateBalance = Number(t.current_balance) + Number(tktt.current_balance);
            await Account.updateCurrentBalance(t.userId,updateBalance);
            await Account.DeleteSavingsAccountsByAccountNumber(t.account_number);
        }
        
    });
}).catch(console.error);

