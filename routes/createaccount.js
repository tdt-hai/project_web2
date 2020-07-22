var express = require('express');
var router = express.Router();
const User = require('../services/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

router.get('/',asyncHandler(async function profile(req,res){
    res.render('createaccount');
}));


module.exports = router;