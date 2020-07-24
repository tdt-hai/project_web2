const {Router} = require('express');
const router = new Router();
const Function = require('../services/function');
const asyncHandler = require('express-async-handler');
router.get('/', asyncHandler(async function profile(req,res){
    if(req.currentUser){
        const getdate = await Function.formatDate(req.currentUser.date_range);
        res.render('profile',{getdate});
    }
    else{
        
        res.redirect('/');
    }
}));


module.exports = router;