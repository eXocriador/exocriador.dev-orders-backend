const getEnvVar = (key, defaultValue = null) => {
  const value = process.env[key];
  if (!value && defaultValue === null) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return value || defaultValue;
};

module.exports = { getEnvVar };
