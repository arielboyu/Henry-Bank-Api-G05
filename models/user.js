module.exports = (sequelize, type) => {
  return sequelize.define('user', {
    id: {
      type: type.INTEGER,
      primaryKey:true,
      autoincrement: true
    },
    name: {
      type: type.TEXT
    },

  })
}