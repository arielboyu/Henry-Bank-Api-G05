const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('contact', {
    alias: {
      type: DataTypes.TEXT,
     },
    contactId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
};