var express = require('express');
var router = express.Router();
const User = require('../services/user');
const Account = require('../services/account');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const Email = require('../services/email')
const Phone = require('../services/phone');
const Func = require('../services/function');
/*Login */
router.get('/', asyncHandler( async function (req,res,next){
    res.render('register');
}));

router.post('/',[
    body('email')
    .isEmail()
    .normalizeEmail()
    .custom(async function (email){
        const found = await User.findUserByEmail(email);
        if(found)
        {
            throw Error('User exists');
        }
        else
        return true;
        }
     ),
    body('displayName')
    .trim()
    .notEmpty(),
    body('phoneNumber')
    .trim()
    .notEmpty(),
    body('numberPaper')
    .trim()
    .notEmpty(),
    body('dateRange')
    .trim()
    .notEmpty(),
    body('paperType')
    .trim()
    .notEmpty(),
],asyncHandler(async function (req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('register',{errors: errors.array()});
    }
    const passWord = crypto.randomBytes(3).toString('hex').toLowerCase();
    //Tạo tài khoản
    const users = await User.create({
        email: req.body.email,
        password: User.hashPassword(passWord),
        displayName: req.body.displayName,
        phoneNumber:  req.body.phoneNumber,
        paper_type: req.body.paperType,
        number_paper: req.body.numberPaper ,
        date_range: req.body.dateRange,
        account_number: req.body.numberPaper,
        active: false,
        adminRole: false,
    });
    //Tạo tài khoản thanh toán
     //create default account(type_acount = TKTT) when register a new user
    await Account.create({
    account_number : req.body.numberPaper,
    type_account : 'TKTT',
    current_balance : 0,
    currency : 'VND',
    open_day : Func.getDateNow(),
    userId : users.id,
    })
    //send password qua email
    await Email.SendEmail(users.email,'Mat khau cua ban la: ',`${passWord}`);
    //send password bằng sđt
    //await Phone.sendSMS('ACB bank',users.phoneNumber,`Mat khau cua ban la: ${passWord}`);
    res.render('page_auth');
}));
module.exports = router;