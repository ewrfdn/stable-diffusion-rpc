'use strict';

const { Service } = require('minerva-api-framework');

class StableDiffusionService extends Service {
  async draw(params) {
    const { ctx, app } = this;
    const { config } = app;
    const taskId = await app.stableDiffusionServe.createTask('AiDrawTask', { port: config.SOCKET_PORT || 7860, host: '127.0.0.1', data: params });
    return new Promise((resolve, reject) => {
      app.stableDiffusionServe.onTaskStatusChange(taskId, data => {
      });

      app.stableDiffusionServe.onTaskEnd(taskId, (data, taskData) => {
        resolve(data);
      });
      console.log(taskId);
      app.stableDiffusionServe.pushTask(taskId);
    });
  }

  async getCheckpoints(params) {
    const { ctx, app } = this;
    const { config } = app;
    const { machineId } = params;
    return [];
    // const taskId = await app.stableDiffusionServe.createTask('AiDrawTask', { port: config.SOCKET_PORT || 7860, host: '127.0.0.1', data: params });
    // return new Promise((resolve, reject) => {
    //   app.stableDiffusionServe.onTaskStatusChange(taskId, data => {
    //   });

    //   app.stableDiffusionServe.onTaskEnd(taskId, (data, taskData) => {
    //     resolve(data);
    //   });
    //   console.log(taskId);
    //   app.stableDiffusionServe.pushTask(taskId);
    // });
  }
}

module.exports = StableDiffusionService;
