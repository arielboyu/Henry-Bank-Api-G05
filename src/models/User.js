const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const User = sequelize.define("user",{

    email: {
      type: DataTypes.STRING,
      isEmail: true,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {//metodo de sequelize que recibe el valor del password ingresado por el usuario
        if (value) {//esto es por si el usuario no se loguea con password
          //hashea el password antes de guardarlo en la base de datos

          const salt = bcrypt.genSaltSync(10); //el salt se genera y se utiliza sin almacenarse
          const hash = bcrypt.hashSync(value, salt);//con esta funcion hasheamos el password(value)
          this.setDataValue('password', hash);//almacenamos el valor de pasword en la base de datos
        }
      }
      },
    typeDNI: {
      type: DataTypes.ENUM("dni", "pasaporte"),
      unique: true
    },
    DNI: {
      type: DataTypes.STRING,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      validate: {
        is: /^([a-zA-ZñÑáéíóúÁÉÍÓÚ_-])+((\s*)+([a-zA-ZñÑáéíóúÁÉÍÓÚ_-]*)*)+$/,
        len: [2, 40]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        is: /^([a-zA-ZñÑáéíóúÁÉÍÓÚ_-])+((\s*)+([a-zA-ZñÑáéíóúÁÉÍÓÚ_-]*)*)+$/,
        len: [2, 40]
      }
    },
    birthdate: {
      type: DataTypes.DATEONLY,  // FORMATO==>>> 2020-01-22
      isDate: true
    },
    mobile: {
      type: DataTypes.STRING,
    },
    street: {
      type: DataTypes.STRING,
    },
    streetNumber: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    photoURL: {
      type: DataTypes.STRING(1000),
    },
    role: {
      type: DataTypes.ENUM("admin", "user")
    },
  })
  User.prototype.compare = function (pass) {
    return bcrypt.compareSync(pass, this.password);
  };
  return User;
};
