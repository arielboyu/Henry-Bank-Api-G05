const Sequelize = require('sequelize');

const UserModel = require('./models/user');

const sequelize = new Sequelize('Ze8RvDD4tg', 'Ze8RvDD4tg', 'zrqm7YLGeS', {
  host: 'remotemysql.com',
  dialect: 'mysql'
});


const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force:false})
.then(() => {
  console.log('HOLA MUNDO')
})

module.exports = {
  User
}