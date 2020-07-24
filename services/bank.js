const db = require('./db');
const Sequelize = require('sequelize');

/*model user*/
const Model = Sequelize.Model;

class Bank extends Model {

}

Bank.init({
	// attributes
	bankId: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	bankName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	bankKey: {
		type: Sequelize.STRING,
		allowNull: false
	}
},
{ 
sequelize: db,
modelName: 'bank' 
});

module.exports = Bank;