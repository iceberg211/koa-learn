const { Book } = require('../../models/book');
const { PositiveIntegerValidator, SearchValidator } = require('../../validators');
const { HotBook } = require('../../models/hotbook');
const { BookComment } = require('../../models/comment');

const { Auth } = require('../../../middleware/auth');
const { Favor } = require('../../models/favor');
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

router.get('/search', new Auth().m, async (ctx, next) => {
  const v = await new SearchValidator().validate(ctx)
  const { keyword, count, start, summary } = v.get('query');
  const book = HotBook.getSearchInfo(encodeURI(keyword), count, start, summary);
  handleResult({ ctx, data: book })
});

router.get('/:id/detail', new Auth().m, async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const { id } = v.get('path')
  const detail = await new Book().getDetail(id)
  handleResult({ ctx, data: detail })
})

router.post('/v1/:id/books', new Auth().m, async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx);
  const id = v.get('path.id', parsed = false);
  ctx.body = 'succeuss'
});

// 书籍点赞数量
router.get('/favor/count', new Auth().m, async (ctx, next) => {
  const favor = await Favor.getMyFavorBookCount(ctx.auth.uid);
  ctx.body = {
    count: favor,
  }
});

router.get('/:book_id/favor', new Auth().m, async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'book_id',
  });
  const favorState = await Favor.getBookFavorCount(ctx, auth.id, v.get('path.book_id'));

  ctx.body = favorState;
});

router.post('/:book_id/create', new Auth().m, async (ctx, next) => {
  const v = await new AddShortCommentValidator().validate(ctx, {
    id: 'book_id'
  })
  const { book_id, content } = v.get('body');

  const add = await BookComment.addComment(book_id, content);
  handleResult({ ctx, data: '创建成功' })

});

router.get('/:book_id/comment', new Auth().m, async (ctx, next) => {
  const v = new PositiveIntegerValidator().validate(ctx, {
    id: 'book_id',
  });
  const { book_id } = v.get('path')
  const comment = await BookComment.getComment(book_id);
  handleResult({
    ctx, data: {
      comment,
      book_id,
    }
  });
});

router.get('/hot_keyword', async ctx => {
  const hotKeywords = [
    'Python',
    '哈利·波特',
    '村上春树',
    '东野圭吾',
    '白夜行',
    '韩寒',
    '金庸',
    '王小波'
  ]
  handleResult({ ctx, data: { hotKeywords } })
})

module.exports = router;