const { Sequelize, Model, Op } = require('sequelize');
const sequelize = require('../../core/db');


class Book extends Model {

}

Book.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }
}, {
    sequelize,
    tableName: 'book'
  })


module.exports = {
  Book
}