'use strict';

const { log } = console;

let startTime = 10;
let time = startTime;
let score = 0;
let word = '';
let shuffledWords = [];
let characters = [];

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
]; // Holy shit

const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const playerInput = document.querySelector('.input');
const wordDisplay = document.querySelector('.word');
const timeDisplay = document.querySelector('.time');
const scoreDisplay = document.querySelector('.score');

class Char {
    #char;
    #index;

    constructor(char, index) {
        this.#char = char;
        this.#index = index;
    }

    get char() {
        return this.#char;
    }

    get index() {
        return this.#index;
    }
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function getWord(array) {
    characters = [];
    let letters = array[0].split('');
    for (let i = 0; i < letters.length; i++) {
        let char = new Char(letters[i], i);
        characters.push(char);
        let letter = document.createElement('span');
        letter.setAttribute('data-index', i);
        letter.innerHTML += `${letters[i]}`;
        wordDisplay.append(letter);
        count++;
    }
}

function compareLetter() {
    let input = playerInput.value.split('');
    for(let i = 0; i < playerInput.value.length; i++) {
        if (input[i] === characters[i.char]) {
            log('this works');
        }
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

function gameOver() {
    playerInput.setAttribute('readonly');
    time = startTime;
}

startBtn.addEventListener('click', () => {
    playerInput.removeAttribute('readonly');
    playerInput.focus();

    shuffledWords = shuffle(words);
    word = getWord(shuffledWords);

    timeDisplay.innerText = time;
    setInterval(() => {
        time = time - 1;
        timeDisplay.innerText = time;
        if (time === 0) {
            gameOver();
            clearInterval();
        }
    }, 1000);
});

// Learned how to use input using ai
playerInput.addEventListener('input', () => {
    if (playerInput.value === word) {
        getNextWord();
        updateScore();
        log(characters[0].char);
    }
});