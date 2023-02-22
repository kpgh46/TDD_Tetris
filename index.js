import { invertNestedArr, getRandomBlock, generateTwoDArray } from "./utils.js";

// CREATE TETRIS PEICE
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

	let rotate = () => {
		if (!rotated) {
			updateRotatedPositions(rotationValues);
		}
		if (rotated) {
			updateRotatedPositions(invertedRotationValues);
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

////// BOARD FUNCTION //////

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

	let evaluateRows = (arr) => {};

	let updateBoard = () => {};

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

////// DISPLAY //////
let displayBoard = (b) => {
	let grid = document.querySelector("#grid");
	grid.innerHTML = "";

	b.forEach((arr, index) => {
		arr.forEach((cell, i) => {
			let cellDiv = document.createElement("div");
			cellDiv.classList.add("cell");
			cellDiv.textContent = index;
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

////// TEST AREA ///////

let score = document.getElementById("score");

let generatePeice = () => {
	let randomBlock = getRandomBlock();
	return createTetrisPiece(randomBlock[0], randomBlock[1]);
};

let playGame = () => {
	// Game Setup
	let tetrisPeice = generatePeice();
	let tetrisBoard = board(generateTwoDArray(19));
	let currentNumberOfPeices = tetrisBoard.getNumberOfPeices();
	tetrisBoard.analyzeCoords(tetrisPeice.getBlocks());
	displayBoard(tetrisBoard.getBoard());

	// Tetris Peice auto movement
	setInterval(() => {
		tetrisPeice.moveDown();
		tetrisBoard.analyzeCoords(tetrisPeice.getBlocks());
		displayBoard(tetrisBoard.getBoard());
		if (tetrisBoard.getNumberOfPeices() > currentNumberOfPeices) {
			currentNumberOfPeices = tetrisBoard.getNumberOfPeices();
			tetrisPeice = generatePeice();
			score.textContent = tetrisBoard.getScore();
		}
	}, 750);

	let checkIfPeiceSet = () => {
		if (tetrisBoard.getNumberOfPeices() > currentNumberOfPeices) {
			currentNumberOfPeices = tetrisBoard.getNumberOfPeices();
			console.log("board has more now");
			tetrisPeice = generatePeice();
			score.textContent = tetrisBoard.getScore();
		}
	};

	let update = () => {
		tetrisBoard.analyzeCoords(tetrisPeice.getBlocks());
		displayBoard(tetrisBoard.getBoard());
	};

	///// CLICK EVENTS //////

	document.addEventListener("keydown", (e) => {
		let event = e.key;
		if (event === "ArrowDown") {
			tetrisPeice.moveDown();
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

playGame();

export { createTetrisPiece, board };
