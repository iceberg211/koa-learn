const Sequelize = require('sequelize');

const { dbName, dbPassword, dbUser, host, port } = require('../config/config').dataBase;

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

// 创建模型
sequelize.sync({
  force: true,
});


module.exports = sequelize;