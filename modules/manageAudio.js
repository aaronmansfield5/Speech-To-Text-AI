const shell = require('shelljs');
const textToSpeech = require('@google-cloud/text-to-speech');
const textToSpeechClient = new textToSpeech.TextToSpeechClient({
    projectId: '',
    keyFilename: ''
});
const fs = require('fs');
const stream = require('stream');

function sound() {
    this.play = function (mp3Location) {
        this.stop();
        shell.exec(mp3Location, {
            silent: true
        });
        return true;
    };

    this.stop = function () {
        shell.exec('TASKKILL /IM VLC.EXE', {
            silent: true
        });
        return true;
    };

    this.playResponse = function () {
        this.stop()
        shell.exec('"C:\\Program Files\\VideoLAN\\VLC\\vlc.exe" --play-and-exit --qt-start-minimized "C:\\Users\\username\\Desktop\\vr-ai\\output.wav"', {
            silent: true
        })
    };

    this.create = function (response) {
        const request = {
            input: {
                text: response
            },
            voice: {
                languageCode: 'en-GB'
            },
            audioConfig: {
                audioEncoding: 'LINEAR16',
                speakingRate: 1,
                pitch: 0.5
            },
        };

        textToSpeechClient.synthesizeSpeech(request,
            (err, response) => {
                if (err) {
                    console.error(err);
                    return;
                }

                const audioStream = new stream.PassThrough();
                audioStream.end(response.audioContent);

                const fileStream = fs.createWriteStream('./output.wav');
                audioStream.pipe(fileStream);

                fileStream.on('finish', () => {
                    this.playResponse();
                });
            });
    }
}

module.exports = {
    sound
}
