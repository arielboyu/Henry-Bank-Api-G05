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
      allowNull:true
    },
    adress:{
      type:DataTypes.STRING,
      allowNull:true
    },
    birthdate:{
      type:DataTypes.STRING,
      allowNull:true
    },
    photoURL: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    typeDNI: {
      type: DataTypes.ENUM("dni","pasaporte"),
      allowNull: true,
    },
    DNI: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
    type: DataTypes.STRING,
    allowNull: true
    }
  })
}