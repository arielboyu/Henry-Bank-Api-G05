const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('account', {
    email:{
      type: DataTypes.STRING,
      allowNull: false
    },
    DNI:{
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance:{
      type:DataTypes.INTEGER,
      allowNull: false
    }
  });
};
