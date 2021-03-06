const express = require("express");
const router = express.Router();
const User = require("../services/user");
const asyncHandler = require("express-async-handler");
const Bank = require("../services/bank");
const { body, validationResult } = require("express-validator");
const randomstring = require("randomstring");
const Email = require("../services/email");
const Function = require('../services/function');
const Account = require("../services/account");
const Transaction = require("../services/transaction");
var destinationAccount;
var sourceAccount = null;
var totalAmountTransaction = null;

router.get(
    "/",
    asyncHandler(async function (req, res, next) {
        sourceAccount = await Account.findAccountTKTT(req.currentUser.account_number);
        totalAmountTransaction = await Transaction.getTransactionOfUserInToDay(req.currentUser.account_number);
        if (!Number.isNaN(totalAmountTransaction)) {
            totalAmountTransaction = totalAmountTransaction;
        } else {
            totalAmountTransaction = 0;
        }
        console.log('reload1');
        console.log(totalAmountTransaction);
        req.sourceAccount = sourceAccount;
        res.locals.sourceAccount = sourceAccount;
        res.render("transferring_money", { errDestinationAccount: null, errAmount: null, errNote: null, totalAmountTransaction });
    })
);


router.post(
    "/",
    [
        body("destinationAccountId")
            .trim()
            .notEmpty()
            .withMessage("Vui lòng nhập số tài khoản chuyển...!")
            .custom(async function (destinationAccountId, { req }) {
                destinationAccount = await Account.findAccountTKTT(destinationAccountId);

                if (!destinationAccount || destinationAccountId == req.currentUser.account_number) {
                    throw Error("Tài khoản nhận không tồn tại..!");
                } else {
                    return true;
                }
            }),
        body("amount")
            .notEmpty()
            .withMessage("Vui lòng nhập số tiền..!")
            .custom(async function (amount, { req }) {
                const user = await Account.findAccountTKTT(req.currentUser.account_number);

                amount = amount.replace(/\,/g, "");
                amount = parseInt(amount, 10);

                if (user.current_balance < amount) {
                    throw Error("Số dư của bạn không đủ...!");
                } else if (totalAmountTransaction + amount > 100000000) {
                    throw Error("Bạn đã vượt hạn mức được chuyển trong ngày....!");
                } else {
                    return true;
                }
            }),
        body("note").trim().notEmpty().withMessage("Vui lòng nhập nội dung..!"),
    ],
    asyncHandler(async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            var errDestinationAccount = null;
            var errAmount = null;
            var errNote = null;
            req.sourceAccount = sourceAccount;
            res.locals.sourceAccount = sourceAccount;

            errors.array().forEach((e) => {
                if (e.param === "destinationAccountId") {
                    errDestinationAccount = e.msg;
                }

                if (e.param === "amount") {
                    errAmount = e.msg;
                }

                if (e.param === "note") {
                    errNote = e.msg;
                }
            });

            var totalAmountTransaction = await Transaction.getTransactionOfUserInToDay(req.currentUser.account_number);
            totalAmountTransaction = totalAmountTransaction != null ? totalAmountTransaction : 0;

            return res.render("transferring_money", { errDestinationAccount, errAmount, errNote, totalAmountTransaction });
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

        //send password qua email
        await Email.SendEmail(req.currentUser.email, "Your OTP code la: ", `${OTP}`);

        //send password bằng sđt
        //await Phone.sendSMS('ACB bank',user.phoneNumber,'Your OTP code la: ${OTP}`);

        return res.redirect("/confirm_transferring_money");
    })
);
module.exports = router;