const Sequelize = require('sequelize');
const { Model, Op } = require('sequelize');
const { dbName, dbPassword, dbUser, host, port } = require('../config/config').dataBase;
const { clone, unset, isArray } = require('lodash')


const sequelize = new Sequelize(dbName, dbUser, null, {
  dialect: 'mysql',
  // 需要搭配mySql2
  host,
  port,
  logging: false,
  timezone: '+08:00',
  // 自定义化
  define: {
    // create_time && update_time
    timestamps: true,
    // delete_time
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    // 把驼峰命名转换为下划线
    underscored: true,
  }
})

Model.prototype.toJSON = function () {
  let data = clone(this.dataValues);
  unset(data, 'created_at')
  unset(data, 'updated_at')
  unset(data, 'deleted_at')
  // for (key in data) {
  //   if (key === 'image' && !data[key].startsWith('http')) {
  //     data[key] = imageHost + data[key]
  //   }
  // }

  // 删除需要排除的字段
  if (isArray(this.exclude)) {
    this.exclude.forEach(item => unset(data, item))
  }
  return data
}

// 创建模型
sequelize.sync({
  force: false,
});


module.exports = sequelize;