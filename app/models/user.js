const { Sequelize, Model } = require('sequelize');
const bcrypt = require('bcryptjs')
const sequelize = require('../../core/db');

class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    // 查询用户
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      throw new global.errs.AuthFailed('账号不存在')
    }
    // 验证密码，使用bcrypt
    const correct = bcrypt.compareSync(plainPassword, user.password)

    if (!correct) {
      throw new global.errs.AuthFailed('密码不正确')
    }
    return user;
  }
  static async getUserByOpenid(openid) {
    const user = await User.findOne({
      where: {
        openid,
      }
    })
    return user;
  }
  static async createUserByOpenid(openid) {
    return await User.create({
      openid
    });
  }
}

// 初始用户模型,定义模型，
User.init({
  id: {
    type: Sequelize.INTEGER,
    // 设置为主键，关系型数据库的唯一标识,不能重复，不能为空
    primaryKey: true,
    // 自动增长
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
    //不能重复
    unique: true
  },
}, {
  sequelize,
  tableName: 'users'
});


module.exports = {
  User
}