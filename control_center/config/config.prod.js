'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
// eslint-disable-next-line no-unused-vars
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};
  config.secret = {
  };

  // add your user config here
  const userConfig = {};
  // disable debugging information
  userConfig.debug = false;
  return {
    ...config,
    ...userConfig,
  };
};
