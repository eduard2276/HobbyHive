const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default openai