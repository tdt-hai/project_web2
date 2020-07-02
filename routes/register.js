var express = require('express');
var router = express.Router();
const User = require('../services/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const Email = require('../services/email')

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
    body('numberPaper')
    .trim()
    .notEmpty(),
    body('accountNumber')
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
    const users = await User.create({
        email: req.body.email,
        password: User.hashPassword(passWord),
        displayName: req.body.displayName,
        paper_type: req.body.paperType,
        number_paper: req.body.numberPaper ,
        date_range: req.body.dateRange,
        account_number: req.body.accountNumber,
        active: false,
        adminRole: false,
    });
    //send email
    await Email.SendEmail(users.email,'Mật khẩu của bạn',`${passWord}`);
    res.redirect('/');
}));
module.exports = router;