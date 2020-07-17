const db = require('./db');
const Sequelize = require('sequelize');
const { DataTypes, Model } = Sequelize;

class Bank extends Model {

}

Bank.init(
	{
        // attributes
		BankId: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		BankName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		BankKey: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
    { 
    sequelize: db,
    modelName: 'bank' 
});

module.exports = Bank;