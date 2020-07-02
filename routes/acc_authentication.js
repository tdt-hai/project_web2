var express = require('express');
var router = express.Router();
const user = require('../services/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

router.get('/', asyncHandler (async function(req,res){
    res.render('acc_authentication');
}))
module.exports = router;