const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('account', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    balance:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  });
};