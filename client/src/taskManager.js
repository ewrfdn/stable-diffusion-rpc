'use strict';
// const { sleep } = require('./utils');
const { AiDrawTask } = require('./task');
const { Socket } = require('./socket');

class TaskManager {
  constructor() {
    this.taskQueue = [];
    this.running = false;
    this.socket = new Socket({ host: 'localhost', port: 7980 });
    this.socket.handleMessage = data => {
      this.processMessage(data);
    };
    this.socket.connect();
  }
  async processMessage(data) {
    if (data.action === 'createTask') {
      console.log('processMessage', data);
      this.createTask(data.data);
    }
  }
  async createTask(config = {}) {
    const { params, taskType } = config;
    if (taskType === 'aiDrawTask') {
      this.taskQueue.push(new AiDrawTask(params, this.socket));
      if (this.taskQueue.length === 1 && !this.running) {
        this.run();
      }
    }
  }
  async run() {
    console.log('run', this.taskQueue.length);
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
