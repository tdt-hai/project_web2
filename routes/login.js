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
    //nếu không phải nhân viên ngân hàng thì trở về trang mật khẩu
    if(users.adminRole == false){
        req.session.userId = users.id;
        res.redirect('users');
    }
    else 
    {
        req.session.userId = users.id;
        res.redirect('admin');
    }
}));
module.exports = router;