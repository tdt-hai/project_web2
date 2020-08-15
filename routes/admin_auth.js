const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../services/user');
const Function = require('../services/function');

//Xác thực tài khoản người dùng
router.get('/',Function.checkLogin,Function.checkAdmin,asyncHandler( async function (req,res,next){
    const listUsers = await User.findAllUser();
    res.render('admin_auth', {listUsers});
}));

//Lấy tài khoản người dùng để xác thực
router.post('/:id',asyncHandler(async function (req,res,next){
    const {id} = req.params;
    await User.updateStatus(id,req.body.status);
    res.redirect('/admin_auth');
}));
module.exports = router