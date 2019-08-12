const { Sequelize, Model, Op } = require('sequelize');
const sequelize = require('../../core/db');
const { Favor } = require('./favor');

class HotBook extends Model {
  static async getAll() {

    // 找出热门书籍
    const books = await HotBook.findAll({
      order: ['index']
    })
    // 找出所有id，使用in查询
    const ids = books.map(item => item.id);

    const favors = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: ids
        },
        type: 400
      },
      //findOne还是findAll取决于where中id是否数组!! 数组->需要group
      group: 'art_id',
      //对art_id计数,并赋值给count变量
      attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']]
    })
    // 还需要图书的点赞数
    // [{id:1,count:20}]

    // 合并get
    books.forEach(book => {
      favors.forEach(like => {
        if (like.art_id === book.id) {
          //通过对象的get('count')获取变量值
          book.setDataValue('fav_nums', like.get('count'))
        }
      })
    })

    return favors;
  }

}

HotBook.init({
  index: Sequelize.INTEGER,
  title: Sequelize.STRING,
  image: Sequelize.INTEGER,
  author: Sequelize.STRING,
},
  {
    sequelize,
    tableName: 'hot_book'
  })



module.exports = { HotBook }