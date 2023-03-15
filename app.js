const record = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');
const { Configuration, OpenAIApi } = require("openai");
const { sound } = require('./modules/manageAudio.js');
const out = new sound();
const client = new speech.SpeechClient({
  projectId: '',
  keyFilename: ''
});
const configuration = new Configuration({
  apiKey: ''
});
const openai = new OpenAIApi(configuration);

const listenerOptions = {
  name: 'alexa'
};

const request = {
  config: {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US'
  },
  interimResults: false
};

const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', (data) => {
    console.log(`Transcription Received: ${data.results[0].alternatives[0].transcript.trim()}`);
  });

const recording = record
  .record({
    sampleRateHertz: 16000,
    threshold: 0,
    verbose: false,
    recordProgram: 'rec'
  })
  .stream()
  .pipe(recognizeStream);

recognizeStream.on('data', (data) => {
  const transcription = data.results
    .map((result) => result.alternatives[0].transcript)
    .join('\n');
  if (transcription.trim().toLowerCase().startsWith(listenerOptions.name)) {
    const command = transcription.trim().toLowerCase().split(`${listenerOptions.name} `)[1];
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: command,
        max_tokens: 3500,
        n: 1,
        temperature: 0.5
      }).then(reply => {
        const response = reply.data.choices[0].text.replace("\n", "").replace("\r", ".");
        console.log(`Response Received: ${response}`);
        out.create(response);
      });
  }
});
