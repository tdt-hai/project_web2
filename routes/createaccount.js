var express = require('express');
var router = express.Router();
const User = require('../services/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Function = require('../services/function');

router.get('/',Function.checkLogin,asyncHandler(async function profile(req,res){
    res.render('createaccount');
}));


module.exports = router;