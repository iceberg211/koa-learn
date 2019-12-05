module.exports = {
  env: 'dev',
  dataBase: {
    dbName: 'mysql',
    dbUser: 'root',
    dbPassword: 'j5JSNM9LkkXOdv52',
    host: 'localhost',
    port: 3306,
  },
  security: {
    secretKey: "KoaNodeReact",
    // 过期时间 1小时
    expiresIn: 60 * 60
  },
  wx: {
    appId: 'wx500894faae3aacce',
    appSecret: 'b866abda2ad8552167ab46b4f63d3d58',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session'
  },
  yushu: {
    detailUrl: 'http://t.yushu.im/v2/book/id/%s',
    searchUrl:
      'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
  },
  host: 'localhost:4200'
}