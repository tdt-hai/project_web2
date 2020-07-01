var express = require('express');
var router = express.Router();
const user = require('../services/user');
const asyncHandler = require('express-async-handler');
/*Login */
router.get('/', asyncHandler( async function (req,res,next){
    res.render('login');
}));

router.post('/',asyncHandler(async function (req,res){
    const users =  await user.findUserByEmail(req.body.email);
    
    if(!users || ! user.verifyPassword(req.body.password,users.password )){
        return res.render('login');
    }
   
    req.session.userId = users.id;
    //nếu không phải nhân viên ngân hàng thì trở về trang đổi mật khẩu
    if(users.adminRole == false){
        res.redirect('/');
    }
    res.redirect('/');
}));
module.exports = router;