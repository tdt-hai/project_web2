const User = require('../services/user');
const asyncHandler = require('express-async-handler');
const Account = require('../services/account');

module.exports = asyncHandler(async function auth(req,res,next){
    const userId = req.session.userId;
    res.locals.currentUser = null;
    if(!userId){
        return next();
    }
    const user = await User.findUserById(req.session.userId);
    if(!user){
        return next();
    }
    
    req.currentUser = user;
    req.currentUser.adminRole = user.adminRole;
    res.locals.currentUser = user;
    //Nếu là user thì oki
    if(req.currentUser.adminRole == false)
    {
        const account = await Account.findCheckingAccountById(req.session.userId);
        if(!account){
            return next();
        }
        res.locals.accountNumber = account;
        //Chuyển từ VND sang USD
        var VND = account.current_balance ;
        var USD = 0.000043;
        var transfer = VND * USD;
        var x = (transfer).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        ////////////////////////
        res.locals.transfer = x;
    }
    next();
})