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
  paper_type:{
    type: Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  number_paper:{
    type: Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  date_range:{
    type: Sequelize.DATE,
    allowNull: false
    // allowNull defaults to true
  },
  account_number:{
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
    // allowNull defaults to true
  },
  active:{
    type: Sequelize.BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'user'
  // options
});

module.exports = User;