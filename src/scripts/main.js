/* eslint-disable max-len */
/* eslint-disable no-shadow */
'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game();

// Write your code here
// console.log(game.getState());
// game.moveLeft();
// console.log(game.getState());

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
  }

  workingWithHTMLFile();
});

function workingWithHTMLFile() {
  // Update the board display
  const board = game.getState();
  const cells = document.querySelectorAll('.field-cell');

  cells.forEach((cell, i) => {
    const value = board[Math.floor(i / 4)][i % 4];

    cell.textContent = value || '';
    cell.className = `field-cell ${value ? `field-cell--${value}` : ''}`;
  });

  // Update the game status message
  const status = game.getStatus();

  document.querySelector('.message-win').classList.toggle('hidden', status !== 'win');
  document.querySelector('.message-lose').classList.toggle('hidden', status !== 'lose');
  document.querySelector('.message-start').classList.toggle('hidden', status === 'playing');

  // Button functionality
  const button = document.querySelector('.button');

  button.removeEventListener('click', handleButtonClick); // Remove previous event listener
  button.addEventListener('click', handleButtonClick); // Add new event listener

  if (status === 'playing') {
    button.classList.remove('start');
    button.classList.add('restart');
    button.textContent = 'Restart';
  } else {
    button.classList.remove('restart');
    button.classList.add('start');
    button.textContent = 'Start';
  }

  // Update the score display
  document.querySelector('.game-score').textContent = game.getScore();
}

function handleButtonClick(event) {
  event.preventDefault(); // Prevent default action

  if (game.getStatus() === 'playing') {
    game.restart(); // Restart the game if currently playing
  } else {
    game.start(); // Start a new game if not playing
  }

  workingWithHTMLFile(); // Update the display
}

// Initialize the board display
workingWithHTMLFile();
