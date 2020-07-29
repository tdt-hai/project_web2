const db = require("./db");
const Sequelize = require("sequelize");
const { or } = require("sequelize");
const Op = Sequelize.Op;

/*model user*/
const Model = Sequelize.Model;

class Transaction extends Model {
    static async saveTransactionHistory(amount, currency, sourceAccountId, sourceBankId, destinationBankId, destinationAccountId, note) {
        return Transaction.create({ amount, currency, sourceAccountId, sourceBankId, destinationBankId, destinationAccountId, note });
    }
}
Transaction.init(
    {
        // attributes
        amount: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        currency: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        sourceAccountId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        sourceBankId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        destinationBankId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        destinationAccountId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        note: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: "transaction",
        // options
    }
);

module.exports = Transaction;
