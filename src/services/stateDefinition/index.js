const stateDefinitions = require("../../db/models/stateDefinition"); // save to db later

module.exports = {
  getStateDefinitions: async () => stateDefinitions,
  getStateDefinition: async (query = {}) => {
    const queryKeys = Object.keys(query);
    if (!query || !queryKeys || !queryKeys.length)
      throw new Error(
        `Please send proper query to find task. Given: ${JSON.stringify(query)}`
      );
    const definition = stateDefinitions.find(item => {
      let cases = queryKeys.map(key => item[key] === query[key]);

      return cases.every(c => c);
    });
    if (!definition)
      throw new Error(`State not found for query: ${JSON.stringify(query)}`);
    return definition;
  },
};
