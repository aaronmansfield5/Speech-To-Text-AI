# Speech-To-Text-AI
This program is a voice-controlled AI assistant that uses Google Cloud Speech-to-Text and Text-to-Speech APIs, as well as the OpenAI API to provide natural language processing capabilities. It can answer questions, complete prompts and generate responses using machine learning.

## index.js
This file is the main entry point for the application. It uses several node-packages to enable voice recognition, text-to-speech conversion, and interaction with OpenAI's language model.

The node-record-lpcm16 package is used to record audio input from the user's microphone, which is then piped into the @google-cloud/speech package's SpeechClient to convert the speech to text. The resulting text is then passed to the handlePrompt function, which processes the user's input and returns a response.

This is done using OpenAI's OpenAIApi package, which sends a prompt to the language model and receives a response. The response is then passed to the text-to-speech package's TextToSpeechClient to convert it to audio, which is played back to the user.

## manageAudio.js
This file exports a sound class that is used to create audio files for text-to-speech playback. It uses the @google-cloud/text-to-speech package to synthesize audio from text input.

The sound class has a create method that takes a string as input and returns a Promise that resolves to an audio file path. The method uses the TextToSpeechClient to synthesize audio from the input string, and then writes the resulting audio file to disk.

## Instructions

1. Install the required node packages using the following commands:
    - **npm i --save node-record-lpcm16**
    - **npm i --save @google-cloud/speech**
    - **npm i --save @google-cloud/text-to-speech**
    - **npm i --save openai**

2. Create a [Google Cloud](console.cloud.google.com) account and enable the Speech-to-Text and Text-to-Speech APIs. Obtain a JSON key file for authentication.

3. Create an [OpenAI](https://platform.openai.com/) account and generate an API key.

4. Install [VLC](https://www.videolan.org/).

4. Replace the keyFilename values in the client and textToSpeechClient objects with the path to your Google Cloud JSON key file.

5. Replace the apiKey value in the configuration object with your OpenAI API key.

6. Run the program using node app.js.

7. The program will listen for audio input and respond to prompts starting with the word 'alexa'; unless you change it within app.js, line 22. Speak a command to trigger a response.
