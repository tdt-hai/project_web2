var express = require('express');
var router = express.Router();
const user = require('../services/user');
const asyncHandler = require('express-async-handler');

router.get('/', asyncHandler( async function (req,res,next){
    res.render('user_management');
}));

module.exports = router;