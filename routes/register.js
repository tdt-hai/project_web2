var express = require('express');
var router = express.Router();
const User = require('../services/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const Email = require('../services/email')
const Phone = require('../services/phone');

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
    //send password qua email
    await Email.SendEmail(users.email,'Mat khau cua ban la: ',`${passWord}`);
    //send password bằng sđt
    //await Phone.sendSMS('ACB bank',users.phoneNumber,`Mat khau cua ban la: ${passWord}`);
    res.redirect('/admin');
}));
module.exports = router;