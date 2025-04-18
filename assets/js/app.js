'use strict';

const { log } = console;

let startTime = 120;
let time = startTime;
let score = 0;
let words = 0;
let average = 0;
let word = '';
let shuffledWords = [];
let timer;

import wordList from "./words.js";
import * as utils from "./utils.js";
// import score from "./Score.js";

const bgm = new Audio('./assets/media/bgm.mp3');
const scoreWord = new Audio('./assets/media/get-word.mp3');
const incorrect = new Audio('./assets/media/incorrect.mp3')

const startBtn = utils.select('.start');
const restartBtn = utils.select('.restart');
const playerInput = utils.select('.input');
const wordDisplay = utils.select('.word');
const timeDisplay = utils.select('.time');
const scoreDisplay = utils.select('.score');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function getWord(array) {
    word = array[0];
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

function getPercentage(score, words) {
    let percentage = score / words;
    return percentage;
}

function gameOver() {
    bgm.pause();
    wordDisplay.innerText = '';
    playerInput.setAttribute('readonly', true);
    playerInput.style.backgroundColor = "#e6000090";
    playerInput.value = 'Game Over';
    scoreDisplay.innerText = `Final Score: ${score}`;
}

utils.listen('click', startBtn, () => {
    bgm.play();
    getTimer();
    playerInput.removeAttribute('readonly');
    playerInput.removeAttribute('placeholder');
    playerInput.focus();
    startBtn.classList.add('hide');
    restartBtn.classList.remove('hide');

    shuffledWords = shuffle(wordList);
    getWord(shuffledWords);
});

// Learned how to use input using ai
utils.listen('input', playerInput, () => {
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

    for (let i = 0; i < input.length; i++) {
        if(input[i] !== word[i]) {
            spans[i].classList.add('incorrect');
            playerInput.setAttribute('readonly', 'true');
            incorrect.load();
            incorrect.play();
            words++;
            setTimeout(() => {
                playerInput.removeAttribute('readonly', 'true');
                getNextWord();
            }, 300);
        }
    }

    if (playerInput.value === word) {
        scoreWord.load();
        scoreWord.play();
        updateScore();
        setTimeout(() => {
            getNextWord();
        }, 300);
        words++;
    }
});

// Mostly got this from ai
utils.listen('keydown', playerInput, function (event) {
    const cursorPos = playerInput.selectionStart; // Current cursor position
    const matchingLength = playerInput.value.split('').reduce((count, char, i) => {
        return char === word[i] ? count + 1 : count;
    }, 0); 
  
    if (cursorPos <= matchingLength && (event.key === "Backspace" || event.key === "ArrowLeft")) {
        event.preventDefault();
    }
});

utils.listen('click', restartBtn, () => {
    bgm.load();
    bgm.play();
    getTimer();
    words = 0;
    wordDisplay.innerText = '';
    playerInput.style.backgroundColor = "rgba(0, 0, 0, 0.64)"
    playerInput.value = '';
    playerInput.removeAttribute('readonly');
    playerInput.focus();
    startBtn.classList.add('hide');
    restartBtn.classList.remove('hide');
    shuffledWords = shuffle(wordList);
    getWord(shuffledWords);
});