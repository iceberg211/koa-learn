- 中间件

中间件就是一个函数

```
app.use((ctx, next) => {
  console.log(1)
  next()
  console.log(4)
})

app.use((ctx, next) => {
  console.log(2)
  next()
  console.log(3)
})

```

洋葱模型 fun1=>fun2=> fun2 => fun1(next)

next 调用返回的是一个 promise

使用 async await

// await 可以求值关键字，将返回的 promise 进行表达式转换 ，也可以阻塞线程, 等待异步调用的返回，将异步操作改为同步

// async 关键词会将函数的返回包装成 promise，单独

为什么一定保证洋葱模型？

在生产中会使用大量的中间件来作为业务处理，使用洋葱模型可以约束一种顺序，例如各个中间件的顺序具有依赖关系，可以使用 ctx 进行挂在传值

使用 async 可以保证 洋葱模型

```
app.use((ctx, next) => {
  console.log(1)
  next();
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

### 校验机制

### 异常处理

会生成异常链条，throw error，单个函数进行错误异常捕获，在异步编程模型中，进行错误处理

全局进行异常处理，在 koa 中实现所有的函数异常

异常处理链条，每一个函数都需要进行 asnyc await

对返回 promise 进行 try catch

async function fun3(){
await setTimeOut(function(){
return new Promise()
})
}

- 全局异步处理

使用 koa 中间件进行错误处理

- 数据库

关系型数据库(mySql,msSqlServer)
非关系型数据库(Redis(键值对数据库)，MongoDB(文档性数据库))

redis主要来做数据库缓存,非持久性存储

- 用户系统

比较较为常见的用户系统

 