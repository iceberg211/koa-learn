
const { Rule, LinValidator } = require('../../core/validator');
const { User } = require('../models/user')
const { LoginType } = require('../lib/enum');


class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      // 规则名称 规则信息  
      new Rule('isInt', '需要正整数', { min: 1 })
    ]
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.email = [
      new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')
    ]
    this.password1 = [
      // 用户密码指定范围
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule(
        'matches',
        '密码长度必须在6~22位之间，包含字符、数字和 _ ',
        '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
      )
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '昵称长度必须在4~32之间', {
        min: 4,
        max: 32
      }),
    ]
  }

  validatePassword(vals) {
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if (psw1 !== psw2) {
      throw new Error('两次输入的密码不一致，请重新输入');
    }
  }

  // 自定义校验
  async validateEmail(vals) {
    const email = vals.body.email;
    // 查询一个
    const user = await User.findOne({
      where: {
        email: email,
      }
    })
    if (user) {
      throw new Error('邮箱已被注册，请重新输入邮箱');
    }
  }
}

class TokenValidator extends LinValidator {
  constructor() {
    // super必须调用,如果使用this
    super();
    this.account = [
      new Rule('isLength', '不符合账号规则', {
        min: 4,
        max: 32
      })
    ]
    this.secret = [
      // 可以传但是也可以不传
      new Rule('isOptional'),
      new Rule('isLength', '最少6个字符', {
        min: 6,
        max: 128
      })
    ]
  }

  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('type是必须参数')
    }

    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type参数不合法')
    }

  }
}

class NotEmptryValidator extends LinValidator {
  constructor() {
    super();
    this.token = [
      new Rule('isLength', '不允许为空', {
        min: 0,
      })
    ]
  }
}



module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptryValidator,
}