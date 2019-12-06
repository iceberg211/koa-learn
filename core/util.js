const jwt = require('jsonwebtoken')
/***
 * 
 */
const findMembers = function (instance, {
  prefix,
  specifiedType,
  filter
}) {
  // 递归函数
  function _find(instance) {
    //基线条件（跳出递归）
    if (instance.__proto__ === null)
      return []

    let names = Reflect.ownKeys(instance)
    names = names.filter((name) => {
      // 过滤掉不满足条件的属性或方法名
      return _shouldKeep(name)
    })

    return [...names, ..._find(instance.__proto__)]
  }

  function _shouldKeep(value) {
    if (filter) {
      if (filter(value)) {
        return true
      }
    }
    if (prefix)
      if (value.startsWith(prefix))
        return true
    if (specifiedType)
      if (instance[value] instanceof specifiedType)
        return true
  }

  return _find(instance)
}

// 颁发令牌,接受uid,scope
const generateToken = function (uid, scope) {
  // 随机字符串
  const secretKey = global.config.security.secretKey;
  // 过期时间
  const expiresIn = global.config.security.expiresIn;
  // JSON Web Token 由 header、payload、signature 三部分组成，使用点号 . 分隔，下面是一段典型的 JWT 串:

  const token = jwt.sign({ uid, scope }, secretKey, { expiresIn });

  return token;
}

module.exports = {
  findMembers,
  generateToken
}