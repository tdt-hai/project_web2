const bcrypt = require('bcrypt');
const db = require('./db');
const Sequelize = require('sequelize');

/*model user*/
const Model = Sequelize.Model;

class Admin extends Model {
    static verifypass(password,passhash){
        return bcrypt.compareSync(password, passhash);
    }
    static hashpass(password){
        return bcrypt.hashSync(password, 10);
    }
}
Admin.init({
  // attributes
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password:{
    type: Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  displayname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Admin;