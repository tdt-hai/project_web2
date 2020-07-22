const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../services/user');
const Account = require('../services/account');
const Function = require('../services/function');
const { AccountContext } = require('twilio/lib/rest/api/v2010/account');
const { formatDate } = require('../services/function');
//Thông tin tài khoản ngân hàng
router.get('/',asyncHandler (async function(req,res,next){
    const user = await User.findUserById(req.session.userId);
    const tktt  = await Account.findCheckingAccountById(req.currentUser.id);
    const tktk  = await Account.findSavingsAccountById(req.currentUser.id);
    if(user.active == false){
        res.render('page404');
    }
    else{
        //Formatting currency
        const money = await Function.formattingCurrency(tktt.current_balance);
        //Formatting type date
        const openDay = await Function.formatDateToShow(tktt.open_day);
        const closeDay = null;
        if(tktk){
             closeDay = await Function.formatDateToShow(tktk.close_day);
        }
        res.render('user_account',{tktk,tktt,money,openDay,closeDay});
    }
}));

module.exports = router