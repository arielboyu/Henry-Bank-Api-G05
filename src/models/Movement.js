const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('movement', {
    type: {
      type: DataTypes.ENUM("payment", "collection"),
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
    sender:{
      type:DataTypes.STRING,
      allowNull:false
    },
    sender:{
      type:DataTypes.STRING,
      allowNull:false
    },
    receiver:{
      type:DataTypes.STRING,
      allowNull:false
    },
  });
};