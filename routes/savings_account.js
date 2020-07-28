const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler');
const Account = require('../services/account');
const User = require('../services/user');
const Function = require('../services/function');
const { update } = require('../services/user');
router.get('/',asyncHandler(async function profile(req,res){
        //Kiem tra da tồn tại tài khoản chưa
        const checkAccount = await Account.findSavingsAccountById(req.currentUser.id);
        if(checkAccount){
                res.redirect('user_account');
        }

        const tktt = await Account.findCheckingAccountById(req.currentUser.id);
        var openDay = await Function.formatDateToShow(tktt.open_day);
        res.render('savings_account',{tktt,openDay});
}));


router.post('/',asyncHandler(async function (req,res){
        
        const term =  req.body.term;
        const tktt = await Account.findCheckingAccountById(req.currentUser.id);
        const close_day = await Function.addedDate(term);
        const interest_rate = term * 0.2;
        const ac = await Account.create({
                account_number: req.currentUser.account_number,
                type_account: "TKTK",
                current_balance: Function.formattingCurrencyToDatabase(req.body.money),
                currency : "VND",
                interest_rate: interest_rate,
                open_day: tktt.open_day,
                close_day: close_day,
                term: term,
                createdAt: Function.getDateNow(),
                updatedAt: Function.getDateNow(),
                userId: req.currentUser.id,

        });
        const updateBalance =  tktt.current_balance -  Function.formattingCurrencyToDatabase(req.body.money);
        await Account.updateCurrentBalance(req.currentUser.id,updateBalance);

        res.redirect('user_account');
}));

module.exports = router;