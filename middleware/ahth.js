const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level) {
    this.level = level || 1

    Auth.AUSE = 8
    Auth.ADMIN = 16
    Auth.SPUSER_ADMIN = 32
  }
  get m() {
    return async (ctx, next) => {
      // 使用npm包来获取到token

      let message = 'token不合法';
      const userToken = basicAuth(ctx.req);
      let decode;
      if (!userToken && !userToken.name) {
        throw new global.errs.Forbidden();
      }

      try {
        decode = jwt.verify(tokenToken.name, global.config.security.secretKey)
      } catch (error) {
        // 过期
        if (error.name === 'TokenExpiredError') {
          message = "token已过期"
        }
        // 不合法
        throw new global.errs.Forbidden(message)
      }

      // uid和scope
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      await next();
    }
  }
}

module.exports = {
  Auth
}