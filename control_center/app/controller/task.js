'use strict';
const { Controller } = require('minerva-api-framework');

class StableDiffusion extends Controller {
  async getClientInfo() {
    const { ctx } = this;
    const params = ctx.restful.params;
    const body = await ctx.service.taskManager.getAllClient(params);
    ctx.body = { list: body };
    ctx.status = 200;
  }

  async getAllTaskInfo() {
    const { ctx } = this;
    const params = ctx.restful.params;
    const body = await ctx.service.taskManager.getAllTasks(params);
    ctx.body = { list: body };
    ctx.status = 200;
  }
}

module.exports = StableDiffusion;
