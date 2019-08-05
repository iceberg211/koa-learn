const Koa = require('koa');
const userAgent = require('koa-useragent');
const InitManager = require('./core/init');

const app = new Koa();

InitManager.initCore(app);

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// app.use(router.routes()).use(router.allowedMethods());
app.use(userAgent);

app.listen(4200, () => {
  console.log('listen at 4200')
});