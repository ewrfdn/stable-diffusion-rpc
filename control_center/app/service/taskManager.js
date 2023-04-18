'use strict';

const { Service } = require('minerva-api-framework');

class TaskManagerService extends Service {
  async getAllClient(params) {
    const { app } = this;
    const clients = await app.stableDiffusionServe.getAllClient(params);
    return clients;
  }

  async getAllTasks() {
    const { app } = this;
    const allTasks = await app.stableDiffusionServe.taskManager.getAllTasks();
    return allTasks;
  }
}

module.exports = TaskManagerService;
