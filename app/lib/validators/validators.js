
const { Rule, LinValidator } = require('../../../core/validator');


class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      // 规则名称 规则信息  
      new Rule('isInt', '需要正整数', { min: 1 })
    ]
  }
}

module.exports = {
  PositiveIntegerValidator,
}