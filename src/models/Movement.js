const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('movement', {
    type: {
      type: DataTypes.ENUM("envio", "recibo"),
      allowNull: false,
    },
    name: {
      type:DataTypes.TEXT,
      allowNull:false
    },
    movementType: {
      type: DataTypes.ENUM("Compra", "Transferencia", "Carga", "Pago"),
      allowNull: false
    },
    currency: {
      type: DataTypes.ENUM("dolares", "pesos"),
      allowNull: false
    },
    amount:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    description:{
      type:DataTypes.TEXT,
      defaultValue: 'No hay descripción'
    },
    contactId:{
      type:DataTypes.TEXT
    },
  });
};