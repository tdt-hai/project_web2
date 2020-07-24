const {Router} = require('express');
const router = new Router();
const asyncHandler = require('express-async-handler');
const Account = require('../services/account');
const User = require('../services/user');
router.get('/',asyncHandler(async function profile(req,res){
        res.render('savings_account');
}));

module.exports = router;