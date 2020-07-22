const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../services/user');
const Account = require('../services/account');

//Thông tin tài khoản ngân hàng
router.get('/',asyncHandler (async function(req,res,next){
    const user = await User.findUserById(req.session.userId);
    if(user.active == false){
        res.render('page404');
    }
    else{
        const TKTT = await Account.findAccountTKTT(user.account_number);
        res.render('user_account',{TKTT,user});
    }
}));

module.exports = router