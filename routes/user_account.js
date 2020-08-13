const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../services/user');
const Account = require('../services/account');
const Function = require('../services/function');
const n2vw = require('n2vw');

//Thông tin tài khoản ngân hàng
router.get('/',asyncHandler (async function(req,res,next){
    const user = await User.findUserById(req.session.userId);
    const tktt  = await Account.findCheckingAccountById(req.currentUser.id);
    const tktk  = await Account.findSavingsAccountById(req.currentUser.id);
    if(user.active == false){
        res.render('page404');
    }
    else{
        //In ra so tien bang chu
        const converter = new n2vw();
        const tkttvnd = converter.getFullText(tktt.current_balance);
        var tktkvnd = null;
        //Formatting currency
        const money = await Function.formattingCurrency(tktt.current_balance);
        //Formatting type date
        const openDay = await Function.formatDateToShow(tktt.open_day);
        var closeDay = null;
        var moneyInSavingsAc = null;
        if(tktk){
            tktkvnd = converter.getFullText(tktk.current_balance);
            tktkvnd = tktkvnd[0].toUpperCase() + tktkvnd.substring(1)
            closeDay = await Function.formatDateToShow(tktk.close_day);
            moneyInSavingsAc = await Function.formattingCurrency(tktk.current_balance);
        }
        res.render('user_account',{tktk,tktt,money,openDay,closeDay,moneyInSavingsAc,tktkvnd,tkttvnd});
    }
    res.render('user_account',{tktk,tktt,money,openDay,closeDay});
}));

module.exports = router