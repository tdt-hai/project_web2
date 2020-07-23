const express = require("express");
const router = express.Router();
const User = require("../services/user");
const asyncHandler = require("express-async-handler");
const Email = require("../services/email");
const Transaction = require("../services/transaction");
const n2vw = require("n2vw");
const { body, validationResult } = require("express-validator");

router.get(
    "/",
    asyncHandler(async function (req, res, next) {
        const destinationBankId = req.session.destinationBankId;
        const destinationAccountId = req.session.destinationAccountId;
        const amount = req.session.amount;
        const note = req.session.note;
        const converter = new n2vw();

        const vnd = converter.getFullText(amount);
        console.log(vnd);

        const user = await User.findUserByAccountNumber(destinationAccountId);
        res.render("confirm_transferring_money", {
            destinationBankId,
            destinationAccountId,
            amount,
            note,
            user,
            vnd,
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
                    throw Error("OTP not right ! Please enter again");
                } else {
                    return true;
                }
            }),
    ],
    asyncHandler(async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).render("confirm_transferring_money", { errors: errors.array() });
        }

        const amount = req.session.amount;
        const sourceAccountId = req.currentUser.account_number;
        const currency = "VND";
        const sourceBankId = "ACB";
        const destinationBankId = req.session.destinationBankId;
        const destinationAccountId = req.session.destinationAccountId;
        const note = req.session.note;

        console.log(destinationBankId, destinationAccountId, req.currentUser.account_number);

        await Transaction.create({ amount, currency, sourceAccountId, sourceBankId, destinationBankId, destinationAccountId, note });
        res.redirect("back");
    })
);
module.exports = router;
