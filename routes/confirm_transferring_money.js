const express = require("express");
const router = express.Router();
const User = require("../services/user");
const asyncHandler = require("express-async-handler");
const Email = require("../services/email");
const Transaction = require("../services/transaction");
const n2vw = require("n2vw");
const { body, validationResult } = require("express-validator");
const Account = require("../services/account");

var destinationBankId;
var destinationAccountId;
var amount;
var note;
const converter = new n2vw();
var vnd;
var destinationAccount;

router.get(
    "/",
    asyncHandler(async function (req, res, next) {
        destinationBankId = req.session.destinationBankId;
        destinationAccountId = req.session.destinationAccountId;
        amount = req.session.amount;
        amount = amount.replace(/\,/g, "");
        amount = parseInt(amount, 10);
        note = req.session.note;
        vnd = converter.getFullText(amount);
        destinationAccount = await User.findUserByAccountNumber(destinationAccountId);

        res.render("confirm_transferring_money", {
            destinationBankId,
            destinationAccountId,
            amount,
            note,
            destinationAccount,
            vnd,
            errOTP_Code: null,
        });
    })
);

router.post(
    "/",
    [
        body("otp_code")
            .trim()
            .notEmpty()
            .custom(async function (otp_code, { req }) {
                if (otp_code !== req.session.OTP) {
                    throw Error("OTP không đúng ! Vui kiểm tra và nhập lại..!");
                } else {
                    return true;
                }
            }),
    ],
    asyncHandler(async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            var errOTP_Code = null;
            errors.array().forEach((e) => {
                if (e.param === "otp_code") {
                    errOTP_Code = e.msg;
                }
            });

            return res.render("confirm_transferring_money", {
                destinationBankId,
                destinationAccountId,
                amount,
                note,
                destinationAccount,
                vnd,
                errOTP_Code,
            });
        }

        const sourceAccountId = req.currentUser.account_number;
        const currency = "VND";
        const sourceBankId = "ACB";

        //giao dich
        await Account.addMoney(destinationAccountId, amount);
        await Account.subMoney(sourceAccountId, amount);
        await Transaction.saveTransactionHistory(amount, currency, sourceAccountId, sourceBankId, destinationBankId, destinationAccountId, note);
        // phi giao dich
        const fee = amount * 0.0007;
        await Account.subMoney(sourceAccountId, fee);
        await Transaction.saveTransactionHistory(fee, currency, sourceAccountId, sourceBankId, destinationBankId, null, "phi chuyen tien");

        res.redirect("/users");
    })
);
module.exports = router;
