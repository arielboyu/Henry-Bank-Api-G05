const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false
    },
    role:{
      type:DataTypes.ENUM("admin","user"),
      allowNull:false,
      defaultValue: "user"
    },
    mobile:{
      type:DataTypes.STRING,
      allowNull:false
    },
    adress:{
      type:DataTypes.STRING,
      allowNull:false
    },
    birthdate:{
      type:DataTypes.STRING,
      allowNull:false
    },

  });
};