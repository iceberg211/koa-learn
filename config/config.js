module.exports = {
  env: 'dev',
  dataBase: {
    dbName: 'mysql',
    dbUser: 'root',
    dbPassword: 123456,
    host: 'localhost',
    port: 3306,
  },
  security: {
    secretKey: "KoaNodeReact",
    // 过期时间 1小时
    expiresIn: 60 * 60
  },
}