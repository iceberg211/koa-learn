const router = require('koa-router')({
  prefix: '/v1/book'
});
const { PositiveIntegerValidator } = require('../../validators');
const { HotBook } = require('../../models/hotbook')

// 图书的数据没有存放在本地，图书的基本数据是调用其他服务

router.get('/hot_list', async (ctx, next) => {
  const books = await HotBook.getAll();
  ctx.body = {
    books
  }
});
router.get('/v1/book', (ctx, next) => {
  ctx.body = {
    book: 'v1'
  }
});

router.post('/v1/:id/books', (ctx, next) => {
  const v = new PositiveIntegerValidator().validate(ctx);
  const id = v.get('path.id', parsed = false);
  ctx.body = 'succeuss'
})

module.exports = router;