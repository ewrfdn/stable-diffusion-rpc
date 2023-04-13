'use strict';
const path = require('path');
const { Server } = require('./app/socket/serve');

class AppBootHook {
  constructor(app) {
    this.app = app;
    this.app.stableDiffusionServe = new Server(17860);
    this.app.stableDiffusionServe.listen();
    const utilPaths = app.loader.getLoadUnits().map(unit => path.join(unit.path, 'app/utils'));
    this.app.loader.loadToContext(
      utilPaths,
      'utils',
      {
        call: true,
        fieldClass: 'utilClasses',
      }
    );
  }

  configWillLoad() {
    // 配置文件即将加载，这是最后动态修改配置的时机
  }

  configDidLoad() {
    // 配置文件加载完成
  }

  async didLoad() {
    // 文件加载完成
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
  }

  async didReady() {
    // 应用已经启动完毕
  }

  async serverDidReady() {
  // 应用启动完成
  }

  async beforeClose() {
    // 应用即将关闭
  }
}

module.exports = AppBootHook;
