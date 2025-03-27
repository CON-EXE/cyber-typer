'use strict';

let startTime = 120;
let time = startTime;
let score = 0;
let word = '';
let shuffledWords = [];
let timer;

const words = [
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'weather',
    'bottle', 'history', 'dream', 'character', 'money', 'absolute', 'machine',
    'accurate', 'rainbow', 'bicycle', 'eclipse', 'trouble', 'developer',
    'database', 'periodic', 'fortune', 'phone', 'future', 'pasta', 'microwave',
    'jungle', 'wallet', 'canada', 'velvet', 'potion', 'treasure', 'beacon',
    'whisper', 'breeze', 'coffee', 'beauty', 'agency', 'chocolate', 'eleven',
    'alphabet', 'magician', 'triangle', 'baseball', 'beyond', 'banana', 'perfume',
    'computer', 'butterfly', 'music', 'eagle', 'crown', 'chess', 'laptop',
    'bedroom', 'enemy', 'button', 'door', 'bird', 'superman', 'library',
    'bookstore', 'language', 'homework', 'beach', 'economy', 'awesome',
    'science', 'mystery', 'famous', 'league', 'memory', 'leather', 'planet',
    'software', 'update', 'yellow', 'keyboard', 'window', 'beans', 'truck',
    'sheep', 'blossom', 'secret', 'wonder', 'destiny', 'quest', 'download',
    'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil', 'audio', 'school',
    'detective', 'hero', 'progress', 'winter', 'passion', 'rebel', 'amber',
    'jacket', 'article', 'paradox', 'social', 'resort', 'mask', 'escape',
    'promise', 'band', 'level', 'hope', 'moonlight', 'media', 'orchestra',
    'volcano', 'guitar', 'raindrop', 'diamond', 'illusion', 'firefly', 'ocean',
    'cascade', 'journey', 'laughter', 'horizon', 'marvel', 'compiler', 'twilight',
    'harmony', 'symphony', 'solitude', 'essence', 'forest', 'melody',
    'vision', 'silence', 'eternity', 'embrace', 'poet', 'ricochet', 'mountain',
    'dance', 'sunrise', 'dragon', 'adventure', 'galaxy', 'echo', 'fantasy',
    'radiant', 'mermaid', 'legend', 'monitor', 'plastic', 'pressure', 'bread',
    'cake', 'caramel', 'juice', 'mouse', 'charger', 'pillow', 'candle', 'sunset',
    'farmer', 'garden', 'whistle', 'blanket', 'picnic', 'sweater', 'lantern',
    'theater', 'traffic', 'website', 'courage', 'shelter', 'painter', 'twinkle',
    'squeeze', 'forever', 'stadium', 'gourmet', 'flower', 'bravery', 'playful',
    'captain', 'vibrant', 'damage', 'outlet', 'general', 'batman', 'enigma',
    'storm', 'universe', 'engine', 'mistake', 'hurricane', 'jasper'
];

const bgm = new Audio('./assets/media/bgm.mp3');
const scoreWord = new Audio('./assets/media/get-word.mp3');

const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const playerInput = document.querySelector('.input');
const wordDisplay = document.querySelector('.word');
const timeDisplay = document.querySelector('.time');
const scoreDisplay = document.querySelector('.score');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function getWord(array) {
    word = array[0];
    // figured out this loop from AI
    for (const letter of word) {
        const span = document.createElement('span');
        span.textContent = letter;
        wordDisplay.appendChild(span);
    }
}

function updateScore() {
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
}

function getNextWord() {
    word = '';
    playerInput.value = '';
    wordDisplay.innerText = '';
    shuffledWords.shift();
    getWord(shuffledWords);
}

function getTimer() {
    time = startTime;
    timeDisplay.innerText = `time: ${time}`;
    clearInterval(timer);

    timer = setInterval(() => {
        if (time > 0) {
            time--;
            timeDisplay.innerText = `Time: ${time}`;
        } else {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    bgm.pause();
    wordDisplay.innerText = '';
    playerInput.setAttribute('readonly', true);
    playerInput.style.backgroundColor = "#e6000090";
    playerInput.value = 'Game Over';
    scoreDisplay.innerText = `Final Score: ${score}`;
}

startBtn.addEventListener('click', () => {
    bgm.play();
    getTimer();
    playerInput.removeAttribute('readonly');
    playerInput.removeAttribute('placeholder');
    playerInput.focus();
    startBtn.classList.add('hide');
    resetBtn.classList.remove('hide');

    shuffledWords = shuffle(words);
    getWord(shuffledWords);
});

// Learned how to use input using ai
playerInput.addEventListener('input', () => {
    const input = playerInput.value;
    const spans = wordDisplay.querySelectorAll('span');
    let matchingText = '';

    // learned how to use using ai
    for (let i = 0; i < word.length; i++) {
        if (input[i] === word[i]) {
            matchingText += word[i];
            spans[i].classList.add('match');
        } else {
            spans[i].classList.remove('match');
        }
    }

    // learned how to use using ai
    if (!input.startsWith(matchingText)) {
        playerInput.value = matchingText + input.slice(matchingText.length);
    }

    if (playerInput.value === word) {
        scoreWord.play();
        updateScore();
        setTimeout(() => {
            getNextWord();
        }, 300);
    }
});

// Mostly got this from ai
playerInput.addEventListener('keydown', function (event) {
    const cursorPos = playerInput.selectionStart; // Current cursor position
    const matchingLength = playerInput.value.split('').reduce((count, char, i) => {
        return char === word[i] ? count + 1 : count;
    }, 0); 
  
    if (cursorPos <= matchingLength && (event.key === "Backspace" || event.key === "ArrowLeft")) {
        event.preventDefault();
    }
});

resetBtn.addEventListener('click', () => {
    bgm.load();
    bgm.play();
    getTimer();
    wordDisplay.innerText = '';
    playerInput.style.backgroundColor = "rgba(0, 0, 0, 0.64)"
    playerInput.value = '';
    playerInput.removeAttribute('readonly');
    playerInput.focus();
    startBtn.classList.add('hide');
    resetBtn.classList.remove('hide');
    shuffledWords = shuffle(words);
    getWord(shuffledWords);
})