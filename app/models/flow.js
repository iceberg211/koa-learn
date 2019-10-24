const { Sequelize, Model } = require('sequelize');
const sequelize = require('../../core/db');

class Flow extends Model { }

// 数据库表是需要关联的，如何关联数据库表与表? 
Flow.init({
  index: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'flow'
})

module.exports = {
  Flow
}