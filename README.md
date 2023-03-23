# Speech-To-Text AI

This Voice Assistant project utilizes Google Cloud Speech-to-Text and Google Cloud Text-to-Speech APIs along with OpenAI's GPT-4 based API to create a voice-controlled assistant that listens to the user's voice commands and provides responses in spoken language.

<a href="https://github.com/aaronmansfield5/Speech-To-Text-AI/issues">![Issues](https://img.shields.io/github/issues/aaronmansfield5/Speech-To-Text-AI)</a>
<a href="https://github.com/aaronmansfield5/Speech-To-Text-AI/stargazers">![GitHub stars](https://img.shields.io/github/stars/aaronmansfield5/Speech-To-Text-AI)</a>
<a href="https://github.com/aaronmansfield5/Speech-To-Text-AI/forks">![GitHub forks](https://img.shields.io/github/forks/aaronmansfield5/Speech-To-Text-AI)</a>

## Prerequisites

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
- ![NPM](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white)
- <a href="https://console.cloud.google.com/">![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=flat&logo=google-cloud&logoColor=white)</a>
- <a href="https://platform.openai.com/">![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white)</a>
- <a href="https://www.videolan.org/">![VLC media player](https://img.shields.io/badge/VLC_media_player-CB3837?style=flat&logo=vlcmediaplayer&logoColor=white)</a>
- <a href="https://ffmpeg.org/download.html">![FFmpeg](https://img.shields.io/badge/FFmpeg-007808?style=flat&logo=ffmpeg&logoColor=white)</a>

## Installation

1. Clone the repository:

```bash
git clone https://github.com/aaronmansfield5/Speech-To-Text-AI.git
```

2. Install the dependencies:

```bash
cd voice-assistant
npm install node-record-lpcm16 @google-cloud/speech @google-cloud/text-to-speech openai shelljs
```

3. Add your [Google Cloud](https://console.cloud.google.com/) Project's `projectId` and `keyFilename` to `app.js` and `manageAudio.js` files.

4. Add your [OpenAI](https://platform.openai.com/) API key to the `configuration` object in `app.js`.

5. Install [VLC Media Player](https://www.videolan.org/).

6. Install [FFmpeg](https://ffmpeg.org/download.html).

## Usage

1. Start the application:

```bash
node app.js
```

2. Speak a command prefixed with the listener's name, for example:

```
alexa what is the weather like today?
```

The Voice Assistant will process the command and provide a spoken response.

## Modules

### app.js

This is the main script that handles voice recognition, command processing, and calling the OpenAI API for a response. It listens to the user's voice input, transcribes it using Google's Speech-to-Text API, and checks if the transcription starts with the listener's name. If it does, it sends the command to the OpenAI API to get a response and passes it to the `manageAudio.js` module.

### manageAudio.js

This script handles the text-to-speech conversion and audio playback. It uses Google's Text-to-Speech API to convert the OpenAI API response into an audio file (`output.wav`). It then plays the audio file using VLC media player.

## Contributing

Please feel free to submit issues and pull requests for improvements and bug fixes.
