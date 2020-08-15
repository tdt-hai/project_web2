var express = require('express');
var router = express.Router();
const user = require('../services/user');
const asyncHandler = require('express-async-handler');
const Transaction = require('../services/transaction');
const User = require('../services/user');
const Account = require('../services/account');
const Function = require('../services/function');
router.get('/',Function.checkLogin,asyncHandler(async function (req,res){
    const user = await User.findUserById(req.session.userId);
    var tranHis = await Transaction.findTransactionAccount(null,null,null,null);
    if(user.active == false){
        res.render('page404');
    }
    else{
        var datenow = await Function.getFullDayNow();
        //  res.json(datenow);
        res.render('transaction_history',{tranHis,datenow});
    }
}));
router.post('/',asyncHandler(async function(req,res){
    const user = await User.findUserById(req.session.userId);
    var date1= req.body.date1;
    var date2= req.body.date2;
    //res.json(date1);
    var tranHis = await Transaction.findTransactionAccount(date1,date2,user.account_number,user.account_number);
    var datenow = await Function.getFullDayNow();
    // console.log(datenow);
    res.render('transaction_history',{tranHis,datenow});
}))

module.exports = router;