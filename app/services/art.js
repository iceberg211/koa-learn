const { Movie, Music, Sentence } = require('../models/classic');

class Art {

  /**
   *
   *
   * @static
   * @param {*} artId ,刊期的id号
   * @param {*} type   期刊的类型
   * @param {boolean} [useScope=true]
   * @returns
   * @memberof Art
   */
  static async getData(artId, type) {
    let art;
    const finder = {
      where: {
        id: artId
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