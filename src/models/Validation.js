const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('validation', {
    validationNumber: {
      type: DataTypes.INTEGER,
     
    }
  });
};