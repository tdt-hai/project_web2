const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../services/user');

//Thông tin tài khoản ngân hàng
router.get('/',asyncHandler (async function(req,res,next){
    const user = await User.findUserById(req.session.userId);
    if(user.active == false){
        res.render('page404');
    }
    else{
        res.render('user_account');
    }
}));

module.exports = router