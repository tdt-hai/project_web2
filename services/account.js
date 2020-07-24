const bcrypt = require("bcrypt");
const db = require("./db");
const Sequelize = require("sequelize");
const { or } = require("sequelize");
const User = require("../services/user");
const Op = Sequelize.Op;

/*model user*/

const Model = Sequelize.Model;

class Account extends Model {
    static async findAccountTKTT(accountNumber) {
        return Account.findOne({
            where: {
                account_number: accountNumber,
                type_account: "TKTT",
            },
        });
    }

    static async addMoney(accountNumber, money) {
        return Account.update(
            {
                current_balance: current_balance + money,
            },
            {
                where: {
                    account_number: accountNumber,
                },
            }
        );
    }

    static async subMoney(accountNumber, money) {
        return Account.update(
            {
                current_balance: current_balance - money,
            },
            {
                where: {
                    account_number: accountNumber,
                },
            }
        );
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
