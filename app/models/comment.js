const { Sequelize, Model, Op } = require('sequelize');
const sequelize = require('../../core/db');

class BookComment extends Model {
  static async addComment(book_id, content) {

    const comment = await BookComment.findOne({
      book_id,
      content
    })

    if (!comment) {
      return await BookComment.create({
        book_id,
        content,
        nums: 1
      })
    } else {
      return await comment.increment('nums', { by: 1 })
    }
  }

  static async getComment(book_id) {
    const comment = await BookComment.findOne({
      book_id,
    })
    return comment
  }

  // JavaScript序列化,排除字段, 
  toJSON() {
    return {
      content: this.getDataValue('content'),
      nums: this.getDataValue('nums')
    }
  }
}

BookComment.init({
  book_id: Sequelize.INTEGER,
  content: Sequelize.STRING(12),
  // 评论点赞
  nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }
}, {
    sequelize,
    tableName: 'book-comment'
  })


module.exports = {
  BookComment
}