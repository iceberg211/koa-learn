const { Sequelize, Model, Op } = require('sequelize');
const sequelize = require('../../core/db');
const { Art } = require('../models/art')
// const { Like } = require('../models/like')

/**
 * 核心点赞就是一张表，如果点赞就推进一条记录，如果删除就取消,一个like添加一个记录,修改字段，如何确保两张表的一直
 * 数据库事务，保证数据的一致性
 *
 * @class Favor
 * @extends {Model}
 */
class Favor extends Model {

  /**
   * @param {*} artId  具体某个期刊
   * @param {*} type   媒体类型
   * @param {*} uid    标识哪一个用户
   * @memberof Favor
   */
  static async like(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })

    // 如果有，说明已经点赞过
    if (favor) {
      throw new global.errs.linkError();
    }

    return sequelize.transaction(async t => {
      await Favor.create({
        art_id,
        type,
        uid
      }, { transaction: t });

      const art = await Art.getData(art_id, type)

      await art.increment('fav_nums', { by: 1, transaction: t });
    });
  }

  static async disLike(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })

    // 如果有，说明已经点赞过
    if (!favor) {
      throw new global.errs.linkError();
    }

    return sequelize.transaction(async t => {
      // 软删除,不会真正从表里真正删除
      await favor.destroy({
        force: false,
        transaction: t
      })

      const art = await Art.getData(art_id, type)

      await art.decrement('fav_nums', { by: 1, transaction: t });
    });

  }

  static async islike(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    return favor ? true : false
  }

  static async getUserFavors(uid) {
    const favor = await Favor.findAll({
      where: {
        uid,
        // 排序书籍类点赞, 查询type不等于400,一种语法
        type: {
          [Op.not]: 400
        }
      }
    })
    if (!favor) {
      throw new global.errs.NotFound()
    }
    return await Art.getListData(favor);
  }

  static async getMyFavorBookCount(uid) {
    // 
    const favorNums = await Favor.count({
      where: {
        uid,
        type: 400
      }
    })
    return favorNums;
  }

  static async getBookFavorCount(uid, book_id) {
    // 获取数量
    const favorNums = await Favor.count({
      where: {
        art_id: book_id,
        type: 400
      }
    })

    const myFavor = await Favor.findOne({
      where: {
        uid,
        type: 400,
        art_id: book_id,
      }
    })

    return {
      fav_nums: favorNums,
      like_status: myFavor ? true : false
    };
  }

}

Favor.init({
  uid: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'favor'
})


module.exports = {
  Favor
}