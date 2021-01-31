const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('movement', {
    type: {
      type: DataTypes.ENUM("envio", "recibo"),
      allowNull: false,
    },
    description:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    amount:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    contactId:{
      type:DataTypes.TEXT,
      allowNull:false
    },
  });
};