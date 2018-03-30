const commonConfig = {};

function configIndex() {
  const dockerEnv = process.env.DOCKER_ENV;
  let config;
  switch (dockerEnv) {
    case 'formal': {
      config = require('./formal');
      break;
    }
    case 'pre': {
      config = require('./pre');
      break;
    }
    case 'test': {
      config = require('./test');
      break;
    }
    default: {
      config = require('./local');
      break;
    }
  };
  return config;
};

exports = module.exports = Object.assign(commonConfig, configIndex());
