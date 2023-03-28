'use strict';
const { sleep } = require('./utils');
const { RequestTask } = require('./task');
class TaskManager {
  constructor() {
    this.taskQueue = [];
    this.running = false;
  }

  async createTask(config, socket) {
    this.taskQueue.push(new RequestTask(config, socket));
  }
  async run() {
    this.running = true;
    while (this.running) {
      if (this.taskQueue.length === 0) {
        await sleep(100);
      } else {
        await this.taskQueue[0].run();
        this.taskQueue.shift();
      }
    }
  }
}

module.export = {
  TaskManager,
};
