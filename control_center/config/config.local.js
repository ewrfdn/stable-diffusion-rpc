/* eslint valid-jsdoc: "off" */

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
  config.cluster = {
    listen: {
      port: 31106,
    },
  };

  return {
    ...config,
  };
};
