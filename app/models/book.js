const { Sequelize, Model, Op } = require('sequelize');
const sequelize = require('../../core/db');
const util = require('util');
const { detailUrl, searchUrl } = require('../../config/config').yushu;
const axios = require('axios');



class Book extends Model {
  // 不要在模型中定义构造函数，会影响查询
  // constructor(id) {
  //   super()
  //   // this.id = this.id;
  // }
  static async getDetail(id) {
    const url = util.format(detailUrl, id)
    const detail = await axios.get(url)
    return detail.data
  }

  static async getSearchInfo(keyword, count = 20, start = 1, summary = 1) {
    const url = util.format(searchUrl, keyword, count, start, summary)
    const result = await axios.get(url)
    return result.data
  }
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