
const baseOverride = require('@nara.drama/depot/config/config-overrides.js');


module.exports = function override(baseConfig, env) {
  const config = baseOverride(baseConfig, env);

  return config;
};
