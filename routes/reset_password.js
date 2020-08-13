const express = require('express');
const router = express.Router();
const User = require('../services/user');
const asyncHandler = require('express-async-handler');
const Email = require('../services/email');
/*Reset password*/


router.get('/', asyncHandler( async function (req,res,next){
    res.render('reset_password');
}));



router.post('/',asyncHandler(async function (req,res){
    const email = req.body.email;

    const user = await User.findUserByEmail(email);

    if(!user){
        return res.render('reset_password');
    }

    await Email.SendEmail(user.email,'Đặt lại mật khẩu',`http://localhost:3000/changePassword/${user.id}`,null);
    return res.render('login');
    
}));
module.exports = router;