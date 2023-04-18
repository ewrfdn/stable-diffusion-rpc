'use strict';
// const { sleep } = require('./utils');
const { AiDrawTask } = require('./task');
const { Socket } = require('./socket');

class TaskManager {
  constructor() {
    this.taskQueue = [];
    this.running = false;
    this.socket = new Socket({ host: '123.60.53.33', port: 17860 });
    // this.socket = new Socket({ host: 'localhost', port: 17860 });

    this.socket.handleMessage = data => {
      this.processMessage(data);
    };
    this.socket.connect();
  }
  async processMessage(data) {
    try {
      if (data.action === 'createTask') {
        this.createTask(data.data);
      }
    } catch (e) {
      console.log(e);
    }

  }
  async createTask(config = {}) {
    const { params, taskType } = config;
    if (taskType === 'AiDrawTask') {
      this.taskQueue.push(new AiDrawTask(params, this.socket));
      if (this.taskQueue.length === 1 && !this.running) {
        this.run();
      }
    } else {
      throw new Error('task Type does not exist');
    }
  }
  async run() {
    this.running = true;
    while (this.taskQueue.length > 0) {
      await this.taskQueue[0].run();
      this.taskQueue.shift();
    }
    this.running = false;
  }
}

module.exports = {
  TaskManager,
};
