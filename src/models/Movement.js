const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('movement', {
    type: {
      type: DataTypes.ENUM("payment", "collection"),
      allowNull: false,
    },
    date:{
      type:DataTypes.DATE,
      allowNull:false
    },
    description:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    amount:{
      type:DataTypes.TEXT,
      allowNull:false
    }
  });
};