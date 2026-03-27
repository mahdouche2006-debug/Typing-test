const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const wordPerMinute = document.getElementById('wpm');
let wpm = 0;
let num_words_written = 0; 
let startTime;
startTime = new Date();


quoteInputElement.addEventListener('keydown', (e) => {
    const words = quoteInputElement.value.split(' ');
    wpm = Math.round((num_words_written + words.length) / (getTimerTime() / 60));
    console.log("num_words_written:" + num_words_written);
    console.log("words.length:" + words.length);
    console.log("getTimerTime:" + getTimerTime());

    if (getTimerTime() == 0) {
        wordPerMinute.innerText = "wpm:";
    } else {
        wordPerMinute.innerText = "wpm: " + wpm.toString();
    }

});

function resetPage() {
    location.reload(); // Reloads the entire page
}

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    console.log(arrayQuote);
    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];

        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false;
        }
    });

    if (correct) {
        render_new_quote();
    }
});

async function render_new_quote() {
    num_words_written += quoteInputElement.value.split(' ').length;
    const quote = await getRandomQuote();
    quoteDisplayElement.innerText = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    });
    quoteInputElement.value = null;

    startTimer();
}

function startTimer() {
    setTimeout(() => {
        timer.innerText = getTimerTime();
        startTimer();
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

async function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content);
}


render_new_quote();
