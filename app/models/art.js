const { Movie, Music, Sentence } = require('../models/classic');
const { Hotbook } = require('./hotbook');
const { flatten } = require('lodash')
const { Sequelize, Model, Op } = require('sequelize');


class Art {

  constructor(art_id, type) {
    this.art_id = art_id;
    this.type = type;
  }

  async getdetail(uid) {
    const { Favor } = require('./favor');
    const art = await Art.getData(this.art_id, this.type)
    if (!art) {
      throw new global.errs.NotFound();
    }

    const like = await Favor.islike(this.art_id, this.type, uid)
    return {
      art,
      like_status: like
    }
  }

  /**
   * @static
   * @param {*} artId ,刊期的id号
   * @param {*} type   期刊的类型
   * @param {boolean} [useScope=true]
   * @returns
   * @memberof Art
   */
  static async getData(artId, type, useScope = true) {
    let art;
    const finder = {
      where: {
        id: artId
      }
    };
    // 排除某些字段
    const scope = useScope ? 'bh' : null;
    switch (type) {
      case 100:
        art = Movie.scope(scope).findOne(finder);
        break;
      case 200:
        art = Music.scope(scope).findOne(finder);
        break;
      case 300:
        art = Sentence.scope(scope).findOne(finder);
        break;
      case 400:
        // classic = await Book.findOne(finder)
        // if (!classic) {
        //   classic = await Book.create({
        //     id: art_id,
        //     fav_nums: 0
        //   })
        // }
        break
      default:
        break;
    }
    return art;
  }
  static async getListData(favorList) {
    // 还是需要三次in查询,因为type类型不同

    const artObj = {
      100: [],
      200: [],
      300: [],
    }

    favorList.forEach(item => {
      artObj[item.type].push(item.art_id)
    });

    const arts = [];

    for (const key in artObj) {
      if (artObj.hasOwnProperty(key)) {
        const ids = artObj[key];
        if (ids.length === 0) continue;
        arts.push(await Art._getListByType(ids, parseInt(key)));
      }
    }
    return flatten(arts);
  }

  static async _getListByType(ids, type) {
    let art = [];
    const finder = {
      where: {
        id: {
          [Op.in]: ids
        }
      }
    };

    // const scope = useScope ? 'bh' : null;
    switch (type) {
      case 100:
        art = Movie.findOne(finder);
        break;
      case 200:
        art = Music.findOne(finder);
        break;
      case 300:
        art = Sentence.findOne(finder);
        break;
      case 400:
        break;
      default:
        break;
    }
    return art;
  }


}
module.exports = {
  Art
}