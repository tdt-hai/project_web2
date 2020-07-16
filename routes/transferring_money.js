const express = require('express');
const router = express.Router();
const User = require('../services/user');
const asyncHandler = require('express-async-handler');
const Bank = require('../services/bank');
const Transaction = require('../services/transaction');

router.get('/', asyncHandler( async function (req,res,next){
    res.render('transferring_money');
}));



router.post('/',asyncHandler(async function (req,res){
    return res.redirect('confirm_transferring_money');
}));
module.exports = router;