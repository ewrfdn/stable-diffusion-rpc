'use strict';
const { Controller } = require('minerva-api-framework');

class StableDiffusion extends Controller {
  async draw() {
    const { ctx } = this;
    const body = await ctx.service.stableDiffusion.draw();
    ctx.body = body;
    ctx.status = 200;
  }
}

module.exports = StableDiffusion;
