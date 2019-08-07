const { Sequelize, Model } = require('sequelize');
const sequelize = require('../../core/db');
const bcrypt = require('bcryptjs')

class User extends Model {

}

// 初始用户模型
User.init({
  id: {
    type: Sequelize.INTEGER,
    // 设置为主键，关系型数据库的唯一标识,不能重复，不能为空
    primaryKey: true,
    // 自动
    autoIncrement: true,
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    // 扩展 设计模式 观察者模式, 只要进行set操作，就会调用set函数
    // ES6 Reflect Vue3.0
    set(val) {
      // 密码加密时计算机所消耗的成本，数字越大成本越大，加密程度越大
      const salt = bcrypt.genSaltSync(10);
      const psw = bcrypt.hashSync(val, salt);
      this.setDataValue('password', psw);
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  },
}, {
    sequelize,
    tableName: 'users'
  });


module.exports = {
  User
}