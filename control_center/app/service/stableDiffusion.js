'use strict';

const { Service } = require('minerva-api-framework');

class StableDiffusionService extends Service {
  async draw() {
    const { ctx, app } = this;
    const taskId = await app.stableDiffusionServe.createTask('AiDrawTask', { data: '123' });
    return new Promise((resolve, reject) => {
      app.stableDiffusionServe.onTaskStatusChange(taskId, data => {
        console.log(data);
      });

      app.stableDiffusionServe.onTaskEnd(taskId, (data, taskData) => {
        console.log(data, taskData);
        resolve(data);
      });
      console.log(taskId);
      app.stableDiffusionServe.pushTask(taskId);
    });
  }
}

module.exports = StableDiffusionService;
