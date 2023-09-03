const { Configuration, OpenAIApi } = require("openai");

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_KEY
});

const openapi = new OpenAIApi(openAIConfig);

exports.chatCompletion = async (req, res) => {
  try {
    const { prompt } = req.body;

    const answer = await openapi.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 50,
      temperature: 0.5,
      top_p: 1,
    });

    const text = answer.data.choices[0].text;

    res.status(200).json({ text });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
