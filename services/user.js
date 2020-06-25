const bcrypt = require('bcrypt');
const db = require('./db');
const Sequelize = require('sequelize');

/*model user*/
const Model = Sequelize.Model;

class User extends Model {
    static async finduserbyid(id){
        return User.findByPk(id);
    }
    static  async findbyemail(email){
        return User.findOne({
            where: {
                email,
            }
        });
    }
    static verifypass(password,passhash){
        return bcrypt.compareSync(password, passhash);
    }
    static hashpass(password){
        return bcrypt.hashSync(password, 10);
    }
}
User.init({
  // attributes
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  displayname: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password:{
    type: Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  token: {
    type: Sequelize.STRING,
  }
}, {
  sequelize: db,
  modelName: 'user'
  // options
});

module.exports = User;