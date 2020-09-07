const Router = require('koa-router');
const { TokenValidator, NotEmptryValidator } = require('../../validators');
const { User } = require('../../models/user');
const { LoginType } = require('../../lib/enum');
const { generateToken } = require('../../../core/util');
const { Auth } = require('../../../middleware/auth');
const { WXManager } = require('../../services/wx');

const router = new Router({
  prefix: '/v1/token',
});

router.post('/', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx);
  // 业务逻辑
  // 1. 如果业务很简单，可以写在api里
  // 2. model 分层
  // mvc，业务写在model中，建立一个service层

  let token;
  // 选择登陆类型
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'));
      break;
    case LoginType.USER_MINI_PROGRAM:
      token = await WXManager.codeToToken(v.get('body.account'));
      break;
    default:
      throw new global.errs.ParameterException('没有相应的处理函数');
  }
  ctx.body = {
    token
  };
});


router.post('/verify', async (ctx, next) => {
  const v = await new NotEmptryValidator().validate(ctx);
  const result = Auth.verifyToken(v.get('body.token'));
  ctx.body = {
    result,
  }
})

async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret);
  // 类的常量,   Auth.user是类的常量大概为8
  return generateToken(user.id, Auth.user)
}


module.exports = router;