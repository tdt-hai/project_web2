const {Router} = require('express');
const router = new Router();
const Function = require('../services/function');
const asyncHandler = require('express-async-handler');
const account = require('../services/account');
router.get('/', asyncHandler(async function profile(req,res){
    if(req.currentUser){
        const getdate = await Function.formatDate(req.currentUser.date_range);
        const temp = await account.returnMoneyToCheckingAccount();
        console.log(temp);
        console.log('test');
        res.render('profile',{getdate});
    }
    else{
        
        res.redirect('/');
    }
}));


module.exports = router;