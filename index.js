const Koa = require('koa');
const userAgent = require('koa-useragent');
const parser = require('koa-bodyparser')
const static = require('koa-static');
const path = require('path');
const catchError = require('./middleware/error');
const InitManager = require('./core/init');

const app = new Koa();

app.use(parser());
// 可以直接通过地址直接访问
app.use(static(path.join(__dirname, './static')))
//  全局的错误捕捉
app.use(catchError); 


// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

InitManager.initCore(app);
app.listen(4200, () => console.log('listen at 4200'));