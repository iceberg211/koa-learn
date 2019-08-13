const { Sequelize, Model } = require('sequelize');
const sequelize = require('../../core/db');

// 没有使用继承，Sequelize不能支持，
const classicFields = {

  // get('images')
  // getDataValue('imamges')

  image: {
    // 拼接图片地址
    type: Sequelize.STRING,
    get() {
      return global.config.host + this.getDataValue('image')
    }
  },
  content: Sequelize.STRING,
  // 日期
  pubdate: Sequelize.DATEONLY,
  // 数字
  fav_nums: Sequelize.INTEGER,
  title: Sequelize.STRING,
  type: Sequelize.TINYINT
}


class Movie extends Model { }

Movie.init(classicFields, {
  sequelize,
  tableName: 'movie'
})


class Sentence extends Model { }


Sentence.init(classicFields, {
  sequelize,
  tableName: 'sentence'
})



class Music extends Model { }



const musicFields = Object.assign({
  url: Sequelize.STRING,

}, classicFields)

Music.init(musicFields, {
  sequelize,
  tableName: 'music'
})


module.exports = {
  Movie,
  Sentence,
  Music
}
