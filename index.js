const Koa = require('koa');
const app = new Koa();
const userAgent = require('koa-useragent');
const init = require("./egg");
const router = require('koa-router')();

app.use(userAgent);
init(app);
// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async ctx => {
  ctx.body = ctx.service.user.getUser();
});


router.get()


app.listen(4200, () => {
  console.log('listen at 4200')
});