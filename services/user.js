const bcrypt = require('bcrypt');
const db = require('./db');
const Sequelize = require('sequelize');
const { or } = require('sequelize');
const Op = Sequelize.Op;

/*model user*/
const Model = Sequelize.Model;

class User extends Model {
    static async findUserById(id){
        // return User.findByPk(id);
        return User.findOne({
          where:{
            id,
          }
        })
    }
    static  async findUserByEmail(email){
        return User.findOne({
            where: {
                email,
            }
        });
    }
    static async findAllUser(){
      return User.findAll();
    }

    static  async findUserByContent(content){
      return User.findAll({
        where : {
         [Op.or]: [
           { email: { [Op.like]: '%' + content + '%' } },
           { displayName: { [Op.like]: '%' + content + '%' } },
           { account_number: { [Op.like]: '%' + content + '%' } }
         ]
       }
      });
  }
  static async updateUser(id,email,displayName,paperType,idNo,issued){
    const u = await User.findUserById(id);
    u.email = email;
    u.displayName = displayName;
    u.paper_type = paperType;
    u.number_paper = idNo;
    u.date_range = issued;

   console.log(id, u.displayName,u.date_range,u.account_number);
   (await u).update;
   await u.save();
   
  }
    static verifyPassword(password,passhash){
        return bcrypt.compareSync(password, passhash);
    }
    static hashPassword(password){
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
    allowNull: false,
    // allowNull defaults to true
  },
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  paper_type:{
    type: Sequelize.STRING,
    
    // allowNull defaults to true
  },
  number_paper:{
    type: Sequelize.STRING,
    
    // allowNull defaults to true
  },
  date_range:{
    type: Sequelize.DATE,
    
    // allowNull defaults to true
  },
  account_number:{
    type: Sequelize.STRING,
    unique: true
    // allowNull defaults to true
  },
  active:{
    type: Sequelize.BOOLEAN,
  },
  adminRole: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
},
}, {
  sequelize: db,
  modelName: 'user'
  // options
});

module.exports = User;