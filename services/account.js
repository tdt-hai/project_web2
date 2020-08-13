const bcrypt = require("bcrypt");
const db = require("./db");
const Sequelize = require("sequelize");
const { or } = require("sequelize");
const User = require("../services/user");
const Op = Sequelize.Op;
const Function = require('../services/function');
/*model user*/

const Model = Sequelize.Model;

class Account extends Model {
    static async addMoney(accountNumber, money) {

        return Account.increment({'current_balance': money }, { where: { account_number: accountNumber ,type_account: 'TKTT'  } });
    }

    static async subMoney(accountNumber, money) {

        return Account.decrement({'current_balance': money }, { where: { account_number: accountNumber ,type_account: 'TKTT' } });
    }
    static async findAllAccount() {
        return Account.findAll();
    }
    static async findSavingsAccountById(id) {
        return Account.findOne({
            where: {
                userId: id,
                type_account: "TKTK",
            },
        });
    }
    static async findCheckingAccountById(id) {
        return Account.findOne({
            where: {
                userId: id,
                type_account: "TKTT",
            },
        });
    }

    static async findAccountTKTT(accountNumber) {
        return Account.findOne({
            where: {
                type_account: "TKTT",
                account_number: accountNumber,
            },
            include: [
                {
                    model: User,
                    where: { account_number: accountNumber },
                    required: true,
                },
            ],
        });
    }
    // static async updateCurrentBalance(id, currentBalance) {
    //     const u = await Account.findCheckingAccountById(id);
    //     u.current_balance = currentBalance;
    //     (await u).update;
    //     await u.save();
    // }
  static async returnMoneyToCheckingAccount(){
    const datenow = Function.getDateNow();
    return Account.findAll({
      where:{
          close_day: '2020-08-28 20:10:42.352+07',
          type_account: "TKTK",
      }
    });
  }

}
Account.init(
    {
        // attributes
        account_number: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: User,
                key: "account_number",
            },
            primaryKey: true,
        },
        type_account: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        current_balance: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            // allowNull defaults to true
        },
        currency: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        interest_rate: {
            type: Sequelize.FLOAT,
            allowNull: true,
        },
        open_day: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        close_day: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        term: {
            type: Sequelize.INTEGER,
            allowNull: true,
            // allowNull defaults to true
        },
    },
    {
        sequelize: db,
        modelName: "account",
        // options
    }
);

User.hasMany(Account);
Account.belongsTo(User);

module.exports = Account;
