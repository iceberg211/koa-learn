const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level) {
    this.level = level || 1
    // 权限级别
    Auth.AUSE = 8
    Auth.ADMIN = 16
    Auth.SPUSER_ADMIN = 32
  }
  get m() {
    return async (ctx, next) => {
      // 使用npm包来获取到token

      let message = 'token不合法';
      // 生成token
      const userToken = basicAuth(ctx.req);
      let decode;
      if (!userToken && !userToken.name) {
        throw new global.errs.Forbidden();
      }

      try {
        decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (error) {
        // 过期
        if (error.name === 'TokenExpiredError') {
          message = "token已过期"
        }
        // 不合法
        throw new global.errs.Forbidden(message);
      }

      if (decode.scope < this.level) {
        message = '权限不足'
        throw new global.errs.Forbidden(message);
      }

      // uid和scope
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      await next();
    }
  }

  static verifyToken(token) {
    try {
      jwt.verify(token, global.config.security.secretKey)

      return true;
    } catch (error) {
      console.log(error);
      return false
    }
  }
}

module.exports = {
  Auth
}