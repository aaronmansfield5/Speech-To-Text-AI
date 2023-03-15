const axios = require('axios');

function getToday() {
    const date = new Date();

    let num = date.getDate();
    let suffix = "th";
    if (num == 0) suffix = "";
    if (num % 10 == 1 && num % 100 != 11) suffix = "st";
    if (num % 10 == 2 && num % 100 != 12) suffix = "nd";
    if (num % 10 == 3 && num % 100 != 13) suffix = "rd";

    return (`${date.toLocaleString('default', {weekday: 'long'})} the ${num}${suffix} of ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`);
}

const promptOutcomes = [{
        test: str => str.match(/\bdate\b[^\w]?/),
        result: (execute, prompt) => execute.date(),
    },
    {
        test: str => str.match(/.*\bplay\b.*/i),
        result: (execute, prompt) => execute.song.play(prompt.toLowerCase().replace("sapphire play ", "").split(" by ")),
    },
    {
        test: str => str.match(/.*\bnews\b.*/i),
        result: (execute, prompt) => execute.newsStories(),
    }
];

const handlePrompt = prompt => {
    const outcome = promptOutcomes.find(({
        test
    }) => test(prompt.toLowerCase()));
    if (!outcome) return prompt;
    return outcome.result(new executePrompt(), prompt);
};

function executePrompt() {
    this.date = function () {
        return `Today's date is ${getToday()}`;
    };
    this.song = function (songInfo) {
        const songName = songInfo[0];
        const artistName = songInfo[1];
        this.play = function (songName, artistName) {
            if (!songInfo[0]) return 'Please include the song & artists name';
            return `${songName} - ${artistName}`;
        };
    };
    this.newsStories = async function () {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=cd8bb1dd7e12406a95bb4ac0782c9bf4`);
        let news = "";
        response.data.articles.forEach(element => {
            news += `${element.title}.\n`;
        });
        return news;
    };
}

module.exports = {
    handlePrompt
};
