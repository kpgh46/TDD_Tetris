# Tetris

This project is the classing puzzle game "Tetris" and was built utilizing Test Driven Development and Object Oriented Programming.

[Preview](https://kpgh46.github.io/TDD_Tetris/)

## Overview

Tetris is a game which allows users to rotate falling blocks with the goal of filling a row horizontally. The amount of lines complete are tracked throughout the game. When a line is full, it is removed from the board and the rest of the blocks are pushed downward. Levels with increased block speed are determined by the current level. The level is determined by the number of lines completed. Once the blocks are 'set' at the top of the board, the game is over.

## Functionality

The game starts when the user presses the 'Start' button. One of the five random block styles will begin to fall from the top of the board. Pressing the Down Arrow on the keyboard will accelerate the speed of which the block falls. Also, pressing the Down Arrow increasing the amount of points since this awards speed and difficulty. When a block is 'set' in place, the block will turn green and a new block will automatically start to fall. When a user completes a predetermined number of lines, the level will increase and also the speed of the block. Once tetris peice is 'set' at the top of board, the game is over.

## Features

-   Start Button
-   Point tracking system visually displayed
-   Lines complete tracking
-   Automatic block speed increase

## Technologies

-   Javascript
-   CSS3
-   Jest
