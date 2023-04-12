'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/v1/stable-diffusion/text-to-image', controller.stableDiffusion.draw);
};
