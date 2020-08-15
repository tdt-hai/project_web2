const {Router} = require('express');
const router = new Router();
const User = require('../services/user');
const Function = require('../services/function');
const asyncHandler = require('express-async-handler');
const Account = require('../services/account');
const Email = require('../services/email');
const ejs = require('ejs');
const Transaction = require('../services/transaction');

router.get('/',Function.checkLogin,Function.checkAdmin,asyncHandler(async function profile(req,res){
    const listUser = await User.findAllUser();
    const accountNumber = Account
    res.render('user_management', {listUser});
}));

router.get('/:id',Function.checkLogin,Function.checkAdmin,asyncHandler(async function profile(req,res){
    const {id} = req.params;
    const user = await User.findUserById(id);
    const time = Function.formatDate(user.date_range);
    const account = await Account.findCheckingAccountById(id);
    //res.json(account);
    res.render('edituser',{user,time,account});
}));

//Cập nhật thông tin người dùng
router.post('/:id',asyncHandler(async function profile(req,res){
    const {id} = req.params;
    const email = req.body.email;
    const displayName = req.body.displayName;
    const phoneNumber = req.body.phoneNumber;
    const paperType = req.body.paperType;
    const idNo = req.body.idNo;
    const issued = req.body.issued;

    await User.updateUser(id,email,displayName,phoneNumber,paperType,idNo,issued);
    res.redirect('../user_management');
 }));
 //Nạp tiền vào tài khoản
 router.post('/money/:id',asyncHandler(async function(req,res){
    const {id} = req.params;
    const func = Function.getFullDayNow();
    const user = await User.findUserById(id);
    const account = await Account.findCheckingAccountById(id);

    var currentBalance = req.body.currentBalance;
    currentBalance = currentBalance.replace(/\,/g,'');
    await Transaction.saveTransactionHistory(currentBalance,'VND',account.account_number,'ACB','ACB',null,"Nạp tiền vào tài khoản");
    await Account.addMoney(account.account_number,currentBalance);

    //Gửi email về biến động số dư
    var accountBack = await Account.findCheckingAccountById(id);
    accountBack = Function.formattingCurrency(accountBack.current_balance);
    currentBalance = Function.formattingCurrency(currentBalance);
    const data = await ejs.renderFile(__dirname + `/balanceNotice.ejs`,{account,currentBalance,accountBack,func});
    await Email.SendEmail(user.email,"ACB: Biến động số dư",null,data);
    res.redirect('/user_management');
}));
module.exports = router;