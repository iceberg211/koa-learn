
const Router = require('koa-router');
const requireDirectory = require('require-directory');

class InitManager {
  static initCore(app) {
    // 入口方法
    InitManager.app = app;
    InitManager.initLoadRouters();
    InitManager.loadHttpException();
    InitManager.loadConfig();
  }

  // 加载全部路由
  static initLoadRouters() {
    // 绝对路径,process.cwd() 方法返回 Node.js 进程的当前工作目录
    const apiDirectory = `${process.cwd()}/app/api`
    // 路由自动加载
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })

    // 判断 requireDirectory 加载的模块是否为路由
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }

  static loadHttpException() {
    const errors = require('../core/http-exception');
    global.errs = errors;
  }

  static loadConfig() {
    const config = require('../config/config')
    global.config = config;
  }

}

module.exports = InitManager