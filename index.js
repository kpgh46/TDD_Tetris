import { invertNestedArr, getRandomBlock, generateTwoDArray } from "./utils.js";

// Tetris Peice object
const createTetrisPiece = (startingPosition, rotationValues) => {
	let currentPosition = startingPosition;
	let rotated = false;
	let invertedRotationValues = invertNestedArr(rotationValues);

	let getBlocks = () => {
		return currentPosition;
	};

	let getRotate = () => {
		return rotated;
	};

	let updateRotatedPositions = (values) => {
		currentPosition.forEach((arr, index) => {
			arr.forEach((num, i) => {
				currentPosition[index][i] =
					currentPosition[index][i] + values[index][i];
			});
		});
	};

	let checkIfNearSide = (rotationValues) => {
		let checkEvery = currentPosition.every((arr, index) => {
			return (
				arr[1] + rotationValues[index][1] >= 0 &&
				arr[1] + rotationValues[index][1] <= 9
			);
		});

		return checkEvery;
	};

	let rotate = () => {
		if (!rotated) {
			if (checkIfNearSide(rotationValues)) {
				updateRotatedPositions(rotationValues);
			} else {
				return;
			}
		}
		if (rotated) {
			if (checkIfNearSide(invertedRotationValues)) {
				updateRotatedPositions(invertedRotationValues);
			} else {
				return;
			}
		}
		rotated = !rotated;
	};

	let moveLeft = () => {
		let checkAll = currentPosition.every((num) => {
			let secondNum = num[1];
			return secondNum > 0;
		});

		if (checkAll) {
			currentPosition.forEach((num) => {
				if (num[1] > 0) {
					num[1] = num[1] - 1;
				}
			});
		}
	};

	let moveRight = () => {
		let checkAll = currentPosition.every((num) => {
			let secondNum = num[1];

			return secondNum < 9;
		});

		if (checkAll) {
			currentPosition.forEach((num) => {
				num[1] = num[1] + 1;
			});
		}
	};

	let moveDown = () => {
		let checkAll = currentPosition.every((num) => {
			let firstNum = num[0];

			return firstNum < 19;
		});
		if (checkAll) {
			currentPosition.forEach((num) => {
				num[0] = num[0] + 1;
			});
		}
	};

	return {
		rotate,
		getBlocks,
		moveLeft,
		moveRight,
		moveDown,
		getRotate,
		rotated,
	};
};

// Board object
let board = (array) => {
	let currentBoard = array;
	let currentScore = 0;
	let numberOfPeices = 0;

	let getBoard = () => {
		return currentBoard;
	};

	let getScore = () => {
		return currentScore;
	};

	let getNumberOfPeices = () => {
		return numberOfPeices;
	};

	let checkIfAtBottom = (arr) => {
		let checkIfAtBottom = arr.some((coord) => {
			return coord[0] === 19;
		});

		return checkIfAtBottom;
	};

	let checkIfAboutToHitOtherCells = (arr) => {
		let checkIfAboutToHitOtherCells = arr.some((coord) => {
			let coordPlusTenIndex = coord[0] + 1;
			let coordTwo = coord[1];
			let nextPeiceOnBoard = currentBoard[coordPlusTenIndex][coordTwo];

			return nextPeiceOnBoard === 3;
		});

		return checkIfAboutToHitOtherCells;
	};

	let clearActiveCells = () => {
		currentBoard.forEach((arr, index) => {
			arr.forEach((num, i) => {
				if (num === 2) {
					currentBoard[index][i] = [1];
				}
			});
		});
	};

	let moveRowsDownward = (arrOfIndexes) => {
		arrOfIndexes.forEach((arr) => {
			let blankArr = [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1]];
			currentBoard.unshift(blankArr);
		});
	};

	let removeFullRows = (arrOfIndexes) => {
		currentBoard = currentBoard.filter((arrs, indexes) => {
			return !arrOfIndexes.includes(indexes);
		});
	};

	let checkIfRowIsFull = () => {
		let indexOfFullRow = [];
		currentBoard.forEach((arr, index) => {
			let checkAll = arr.every((num) => num === 3);
			if (checkAll) {
				currentScore++;
				indexOfFullRow.push(index);
			}
		});
		removeFullRows(indexOfFullRow);
		moveRowsDownward(indexOfFullRow);
	};

	let analyzeCoords = (arrayOfCoords) => {
		clearActiveCells();
		arrayOfCoords.forEach((coord) => {
			if (
				checkIfAtBottom(arrayOfCoords) ||
				checkIfAboutToHitOtherCells(arrayOfCoords)
			) {
				currentBoard[coord[0]][coord[1]] = 3;
				checkIfRowIsFull();
				numberOfPeices++;
				return;
			}

			if (!checkIfAboutToHitOtherCells(arrayOfCoords)) {
				currentBoard[coord[0]][coord[1]] = 2;
				return;
			} else {
				currentBoard.forEach((arr, index) => {
					arr.forEach((num, i) => {
						if (
							currentBoard[index][i] !== 2 ||
							currentBoard[index][i] !== 3
						) {
							currentBoard[index][i] = [1];
						}
					});
				});
				return;
			}
		});
	};

	return {
		getBoard,
		analyzeCoords,
		getNumberOfPeices,
		getScore,
		getNumberOfPeices,
	};
};

// Display board
let displayBoard = (b) => {
	let grid = document.querySelector("#grid");
	grid.innerHTML = "";

	b.forEach((arr, index) => {
		arr.forEach((cell, i) => {
			let cellDiv = document.createElement("div");
			cellDiv.classList.add("cell");

			if (cell === 2) {
				cellDiv.classList.add("active");
			}
			if (cell === 3) {
				cellDiv.classList.add("set");
			}
			grid.appendChild(cellDiv);
		});
	});
};

let score = document.getElementById("score");
let start = document.getElementById("start");
let points = document.getElementById("points");
let level = document.getElementById("level");

// Generates a random tetris peice
let generatePeice = () => {
	let randomBlock = getRandomBlock();
	return createTetrisPiece(randomBlock[0], randomBlock[1]);
};

// Called when start is pressed
let playGame = () => {
	// Game Setup
	let tetrisPeice = generatePeice();
	let tetrisBoard = board(generateTwoDArray(19));
	let currentNumberOfPeices = tetrisBoard.getNumberOfPeices();
	let tetrisBoardScore = 0;
	let interval = 1000;
	let currentLevel = 1;
	let currentPoints = 0;

	tetrisBoard.analyzeCoords(tetrisPeice.getBlocks());
	displayBoard(tetrisBoard.getBoard());

	// Checks if tetris peice is placed onto board.  Called on click events.
	let checkIfPeiceSet = () => {
		if (tetrisBoard.getNumberOfPeices() > currentNumberOfPeices) {
			tetrisBoardScore = tetrisBoard.getScore();
			currentNumberOfPeices = tetrisBoard.getNumberOfPeices();
			tetrisPeice = generatePeice();
			score.textContent = tetrisBoardScore;

			switch (true) {
				case tetrisBoardScore > 15:
					interval = 125;
					currentLevel = 5;
					break;
				case tetrisBoardScore > 10:
					interval = 250;
					currentLevel = 4;
					break;
				case tetrisBoardScore > 5:
					interval = 500;
					currentLevel = 3;
					break;
				case tetrisBoardScore > 1:
					interval = 750;
					currentLevel = 2;
					break;
			}
			level.textContent = currentLevel;
		}
	};

	// Automatically moves tetris peice down. Speed dependent on interval.
	let moveTetrisPeiceDown = () => {
		tetrisPeice.moveDown();
		tetrisBoard.analyzeCoords(tetrisPeice.getBlocks());
		displayBoard(tetrisBoard.getBoard());
		checkIfPeiceSet();

		setTimeout(moveTetrisPeiceDown, interval);
	};

	setTimeout(moveTetrisPeiceDown, interval);

	// Updates board after piece moves.
	let update = () => {
		tetrisBoard.analyzeCoords(tetrisPeice.getBlocks());
		displayBoard(tetrisBoard.getBoard());
	};

	// Click events
	document.addEventListener("keydown", (e) => {
		let event = e.key;
		if (event === "ArrowDown") {
			tetrisPeice.moveDown();
			currentPoints += 100;
			points.textContent = currentPoints;
		}

		if (event === "ArrowUp") {
			tetrisPeice.rotate();
		}

		if (event === "ArrowRight") {
			tetrisPeice.moveRight();
		}
		if (event === "ArrowLeft") {
			tetrisPeice.moveLeft();
		}
		update();
		checkIfPeiceSet();
	});
};

start.addEventListener("click", playGame);

export { createTetrisPiece, board };
