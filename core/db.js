const Sequelize = require('sequelize');

const { dbName, dbPassword, user, host, port } = require('../config/config').dataBase;

const sequelize = new Sequelize(dbName, user, dbPassword, {
  dialect: 'mysql',
  // 需要搭配mySql2
  host,
  port,
  logging: true,
  timezone: '+08:00',
  define: {

  }
})

module.exports = { sequelize };