'use strict';

const { log } = console;

let startTime = 10;
let time = startTime;
let score = 0;
let words = 0;
let percentage = 0;
let word = '';
let shuffledWords = [];
let timer;
let highScores = JSON.parse(localStorage.getItem("HighScores")) || [];

import wordList from "./words.js";
import * as utils from "./utils.js";
import { Score } from "./Score.js";

const bgm = new Audio('./assets/media/bgm.mp3');
const scoreWord = new Audio('./assets/media/get-word.mp3');
const incorrect = new Audio('./assets/media/incorrect.mp3')

const startBtn = utils.select('.start');
const restartBtn = utils.select('.restart');
const highScoreBtn =utils.select('.highscores');
const playerInput = utils.select('.input');
const wordDisplay = utils.select('.word');
const timeDisplay = utils.select('.time');
const scoreDisplay = utils.select('.score');
const highscoreDialog = utils.select('dialog');
const close = utils.select('.close-dialog');

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
    percentage = (percentage * 100).toFixed();
    return percentage;
}

function gameOver() {
    bgm.pause();
    wordDisplay.innerText = '';
    playerInput.setAttribute('readonly', true);
    playerInput.style.backgroundColor = "#e6000090";
    playerInput.value = 'Game Over';
    scoreDisplay.innerText = `Final Score: ${score}`;
    percentage = getPercentage(score, words); 
    saveScore(score, percentage);
    log('this works');
}

function saveScore(score, percentage) {
    highScores.push(new Score(score, percentage));
    localStorage.setItem('HighScores', JSON.stringify(highScores));
    log(highScores);
    log(JSON.stringify(highScores));
    log(JSON.parse(localStorage.getItem('HighScores')));
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

    // If player makes a mistake
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

    // If player completes a word
    if (playerInput.value === word) {
        scoreWord.load();
        scoreWord.play();
        playerInput.setAttribute('readonly', 'true');
        updateScore();
        setTimeout(() => {
            playerInput.removeAttribute('readonly', 'true');
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
    score = 0;
    wordDisplay.innerText = '';
    playerInput.style.backgroundColor = "rgba(0, 0, 0, 0.64)"
    playerInput.value = '';
    playerInput.removeAttribute('readonly');
    playerInput.focus();
    shuffledWords = shuffle(wordList);
    getWord(shuffledWords);
});

utils.listen('click', highScoreBtn, () => {
    highscoreDialog.showModal();
});

utils.listen('click', close, () => {
    highscoreDialog.close();
});