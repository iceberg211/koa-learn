const { HttpException } = require('../core/http-exception');

const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // 开发环境

    const isHttpException = error instanceof HttpException;
    const isDev = global.config.env === 'dev';
    if (isDev && !isHttpException) {
      throw error;
    }
    if (isHttpException) {
      ctx.body = {
        request: `${ctx.method} ${ctx.path}`,
        code: error.errorCode,
        msg: error.msg,
      }
      ctx.status = error.code;
    } else {
      ctx.body = {
        msg: '未知异常',
        code: 999,
        request: `${ctx.method} ${ctx.path}`,
      }
      ctx.status = 500;
    }
  }
}
module.exports = catchError;