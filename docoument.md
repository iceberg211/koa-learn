### 中间件的注意事项

中间件只会在 koa 应用程序中实例化一次，等于多请求共用

### jwt

- token 是无意义的随机字符串
- uid+ token = jwt 开发者可以在 token 写入开发者自定义的信息，并且可以设置过期时间.
- http 协议中规定了 httpBasicAuth,天然支持

### 备注信息

- Lin CMS 文档: http://doc.cms.7yue.pro/
- Lin UI 文档: http://doc.mini.7yue.pro/
- 旧岛小程序 API: http://bl.7yue.pro/dev/index.html
