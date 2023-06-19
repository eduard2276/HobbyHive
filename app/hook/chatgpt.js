const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default openai