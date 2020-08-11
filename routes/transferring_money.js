const express = require("express");
const router = express.Router();
const User = require("../services/user");
const asyncHandler = require("express-async-handler");
const Bank = require("../services/bank");
const { body, validationResult } = require("express-validator");
const randomstring = require("randomstring");
const Email = require("../services/email");
const Account = require("../services/account");

router.get("/",asyncHandler(async function (req, res, next) {
    const user = await User.findUserById(req.session.userId);
    if(user.active == false){
        res.render('page404');
    }
    else{
        const sourceAccount = await Account.findAccountTKTT(req.currentUser.account_number);
       // res.json(sourceAccount);
        res.render("transferring_money", { sourceAccount });
    }
}));

router.post(
    "/",
    [
        body("destinationAccountId")
            .trim()
            .notEmpty()
            .custom(async function (destinationAccountId, { req }) {
                destinationAccount = await Account.findAccountTKTT(destinationAccountId);

                if (!destinationAccount) {
                    throw Error("Destination account not Exist");
                } else {
                    return true;
                }
            }),
        body("amount").trim().notEmpty(),
        // .custom(async function (amount, { req }) {
        //     const user = await Account.findAccountTKTT(req.currentUser.account_number);

        //     if (user.current_balance < amount) {
        //         throw Error("Your account is not enough");
        //     } else {
        //         return true;
        //     }
        // })
        body("note").trim().notEmpty(),
    ],
    asyncHandler(async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).render("transferring_money", { errors: errors.array() });
        }

        req.session.destinationBankId = req.body.destinationBankId;
        req.session.destinationAccountId = req.body.destinationAccountId;
        req.session.amount = req.body.amount;
        req.session.note = req.body.note;

        const OTP = randomstring.generate({
            length: 4,
            charset: "numeric",
        });

        req.session.OTP = OTP;
        // console.log('OTP' + OTP);
        // console.log(user);

        //send password qua email
        await Email.SendEmail(req.currentUser.email, "Your OTP code la: ", `${OTP}`);

        //send password bằng sđt
        //await Phone.sendSMS('ACB bank',user.phoneNumber,'Your OTP code la: ${OTP}`);

        return res.redirect("/confirm_transferring_money");
    })
);
module.exports = router;
