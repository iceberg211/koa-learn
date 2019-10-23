### node.js 的能力

- 脱离浏览器运行 js

- nodeJS stream (前端工程化基础)

  webpack 的中间

- 服务端 api

- 作为中间层

  日常项目中的做好，总结好

### koa 框架总结

前端是不能操作数据库。
服务端提供 api，难在如何写好代码，提高开发效率。如何优化数据库。

### 中间件

中间件就是一个函数,定义一个中间件就是定义一个普通的函数。

```
app.use((ctx, next) => {
  console.log(1)
  next();
  console.log(4)
})

app.use((ctx, next) => {
  console.log(2)
  next();
  console.log(3)
})

// 上述代码中，next函数会把代码分成洋葱模型，执行顺序为
// 洋葱模型 fun1=>fun2=> fun2 => fun1(next);
```

next 调用返回的是一个 promise

使用 async await

// await 可以求值关键字，将返回的 promise 进行表达式转换 ，也可以阻塞线程, 等待异步调用的返回，将异步操作改为同步

// async 关键词会将函数的返回包装成 promise，单独

为什么一定保证洋葱模型？

在生产中会使用大量的中间件来作为业务处理，使用洋葱模型可以约束一种顺序，例如各个中间件的顺序具有依赖关系，可以使用 ctx 进行挂在传值

使用 async 可以保证 洋葱模型。

```
app.use(async(ctx, next) => {
  console.log(1)
  await next();
  console.log(2)
});

app.use((ctx, next) => {
  console.log(3)
  const res = await axios.get('xxx');
  next();
  console.log(4);
})

输出 1 3 2 4 ,因为axios会阻塞线程，如果必须保证koa的洋葱模型，必须使用async来包裹中间件
```

// 根据数据,业务模块进行划分

### 如何自动注册路由

使用 requireDirectory 进行路由的自动加载

### 异常处理

针对函数调用，对单个函数进行 try catch

```
function fun1(){
  fun2();
}

function fun2(){
  fun3();
  dosomething();
}

function fun3(){

  try{
    console.log(3)
  }catch(e){
    throw e;
  }
  return 'success';
}

```

单个函数进行错误异常捕获 throw error，会造成很多冗余的代码,每一个函数都需要写try() catch()
如果某一个函数没有进行报错抛出之后，会引起报错信息丢失但是会生成异常链条。
同时函数调用链只能捕捉同步代码。


### 异步模型中的错误处理

需要使用promise()和anync 将异步改成同步写法。


async function fun3(){
  await setTimeOut(function(){
  return new Promise()
  })
}

try(){
  fun3();
}catch(error){
  throw error;
}

- 全局异步处理

使用 koa 中间件进行错误处理

- 数据库

关系型数据库(mySql,msSqlServer)
非关系型数据库(Redis(键值对数据库)，MongoDB(文档性数据库))

redis 主要来做数据库缓存,非持久性存储

- 用户系统

比较较为常见的用户系统

### 中间件只应该在应用程序中启动一次

koa 的中间件只会在应用程序中加载一次，如果中间件为一个类得话，只会实例化一次，如果请求会修改中间件的值的话，会引起中间件值得错乱

### 数据库设计思路

model 初始化数据，可以进行导入数据

如何设计数据库？

业务表（期刊，一期一期）

实体（由粗到细，客观事物）

### 前端 baseicAuth，如何去加密？

如何在 http 协议中加上 Authorization:Basic() base64(cou)

### 序列化

Sequelize 会告诉 koa 如何去序列化？

在序列化的时候排序某些数据

JSON.Stringify(obj)

### mySql 中的事务

### 实例与静态方法

静态方法偏向过程性，当一个类的行为过于复杂的时候可以使用方法

### 并发 并行

并行，cpu 在同一时间执行代码，多

### 不要在模型的

### 部署

为何要部署?

本机无外网 ip, 云服务器是具有外网的虚拟机

域名，域名注册解析成 ip

在 linux 上安装使用的环境(node,sql)

一个项目会占用一个端口

使用 nginx 进行转发, 还有缓存 node :3000 ,java:8080

a.com =>>>> node:3000
b.com =>>>> java:8080

pm2 守护进程
