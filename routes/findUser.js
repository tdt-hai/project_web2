var express = require('express');

var router = express.Router();
const user = require('../services/user');
const asyncHandler = require('express-async-handler');
const Function = require('../services/function');

router.post('/',Function.checkLogin,asyncHandler(async function (req,res){
    
    const contentSearch = req.body.contentSearch;
    const users = await user.findUserByContent(contentSearch);
    
    res.render('findUser', { users });
}));
module.exports = router;