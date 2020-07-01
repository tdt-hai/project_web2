var express = require('express');
var router = express.Router();
const user = require('../services/user');
const asyncHandler = require('express-async-handler');
/*Login */
router.get('/', asyncHandler( async function (req,res,next){
    res.render('changePassword');
}));

router.post('/',asyncHandler(async function (req,res){
    const users =  await user.findUserById(req.session.userId);
    if(!users ||  req.body.newPassword != req.body.confirmPassword){
        return res.render('chagePassword');
    }
   
    res.redirect('/');
}));
module.exports = router;