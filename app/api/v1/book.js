const { Book } = require('../../models/book');
const { PositiveIntegerValidator, SearchValidator } = require('../../validators');
const { HotBook } = require('../../models/hotbook');
const router = require('koa-router')({
  prefix: '/v1/book'
});
const { handleResult } = require('../../lib/help')

// 图书的数据没有存放在本地，图书的基本数据是调用其他服务

router.get('/hot_list', async (ctx, next) => {
  const books = await HotBook.getAll();
  ctx.body = {
    books
  }
});

router.get('/search', async (ctx, next) => {
  const v = await new SearchValidator().validate(ctx)
  const { keyword, count, start, summary } = v.get('query');
  const book = HotBook.getSearchInfo(encodeURI(keyword), count, start, summary);
  handleResult({ ctx, data: book })
});

router.get('/:id/detail', async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const { id } = v.get('path')
  const detail = await Book.getDetail(id)
  handleResult({ ctx, data: detail })
})


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