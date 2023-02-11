import { joinArrayOfNumbers } from "./utils.js";

// factory function which creates tetris blocks
const createTetrisPiece = (positionsArray) => {
	let movingDown = true;
	let active = true;

	// determines first or second position of Tetris Piece
	let currentPositionIndex = 0;

	// 4 pairs of array of how the tetris block is positioned
	let currentPositionArray = positionsArray[currentPositionIndex];

	// updates current position based on position Index
	let currentBlocks = () => {
		currentPositionArray = positionsArray[currentPositionIndex];
	};

	//returns the blocks
	let getBlocks = () => {
		return currentPositionArray;
	};

	//rotates the blocks by updating the current Position Index
	let rotate = () => {
		if (currentPositionIndex === 0) {
			currentPositionIndex = 1;
		} else {
			currentPositionIndex = 0;
		}

		currentBlocks();
	};

	let moveLeft = () => {
		let checkAll = currentPositionArray.every((num) => {
			let secondNum = num[1];
			return secondNum > 0;
		});

		if (checkAll) {
			currentPositionArray.forEach((num) => {
				if (num[1] > 0) {
					num[1] = num[1] - 1;
				}
			});
		}
	};

	let moveRight = () => {
		let checkAll = currentPositionArray.every((num) => {
			let secondNum = num[1];

			return secondNum < 9;
		});

		if (checkAll) {
			currentPositionArray.forEach((num) => {
				num[1] = num[1] + 1;
			});
		}
	};

	let moveDown = () => {
		let checkAll = currentPositionArray.every((num) => {
			let firstNum = num[0];

			return firstNum < 19;
		});
		if (checkAll) {
			currentPositionArray.forEach((num) => {
				num[0] = num[0] + 1;
			});
		}
	};

	let stopMovingDown = () => {
		movingDown = false;
	};

	let checkIfMovingDown = () => {
		return moveDown;
	};

	let setToInactive = () => {
		active = false;
	};

	let checkIfActive = () => {
		return active;
	};

	// setInterval(() => {
	// 	if (moveDown) {
	// 		moveDown();
	// 	}
	// }, 3000);

	return {
		rotate,
		getBlocks,
		moveLeft,
		moveRight,
		moveDown,
		stopMovingDown,
		checkIfMovingDown,
		setToInactive,
	};
};

// returins the array of cells and placed coordinates
let newBoardArray = Array.from(Array(200)).fill(1);

let board = (array) => {
	let newBoard = array;
	let newPeice = false;
	let takenCells = [];

	let getBoard = () => {
		return newBoard;
	};

	let updateNewPeice = () => {
		newPeice = true;
	};

	let checkIfNewPeiceNeeded = () => {
		return newPeice;
	};

	// return coordinates in whole number format (arr.length = 4)
	let getCoords = (arrayOfCoords) => {
		let arrayOfJoinedCoords = arrayOfCoords.map((coords) => {
			return joinArrayOfNumbers(coords);
		});
		return arrayOfJoinedCoords;
	};

	// matches coordinates onto the gameboard.
	let placeCoordsOnBoard = (arrayOfCoords) => {
		let coords = getCoords(arrayOfCoords);
		let coordsPlusTen = coords.map((num) => num + 10);
		let checkIfAtBottom = coords.some((num) => num > 189);

		newBoard.filter((num, index) => {
			if (coords.includes(index)) {
				newBoard[index] = "x";
				if (newBoard[index] === "o") {
					newBoard[index] = "o";
				}
			} else {
				newBoard[index] = 1;
			}
		});

		if (checkIfAtBottom) {
			newBoard.filter((num, index) => {
				if (coords.includes(index)) {
					newBoard[index] = "o";
				}
			});
			updateNewPeice();
		}

		return newBoard;
	};

	return { getBoard, placeCoordsOnBoard, checkIfNewPeiceNeeded };
};

const linePositions = [
	[
		[0, 2],
		[0, 3],
		[0, 4],
		[0, 5],
	],
	[
		[1, 2],
		[2, 2],
		[3, 2],
		[4, 2],
	],
];

let displayBoard = (b) => {
	let grid = document.querySelector("#grid");
	grid.innerHTML = "";

	b.forEach((cell) => {
		let cellDiv = document.createElement("div");
		cellDiv.classList.add("cell");
		if (cell === "x") {
			cellDiv.classList.add("active");
		}
		if (cell === "o") {
			cellDiv.classList.add("set");
		}
		grid.appendChild(cellDiv);
	});
};

let createNewTetrisPeice = () => {
	return createTetrisPiece(linePositions);
};

let playGame = () => {
	let game = true;
	let tetrisBoard = board(newBoardArray);
	let currentBoard = tetrisBoard.getBoard();

	let currentTetrisPeice = createNewTetrisPeice();

	currentBoard = tetrisBoard.placeCoordsOnBoard(
		currentTetrisPeice.getBlocks()
	);

	displayBoard(currentBoard);

	document.addEventListener("keydown", (e) => {
		let key = e.key;
		if (key === "ArrowRight") {
			currentTetrisPeice.rotate();
			displayBoard(
				tetrisBoard.placeCoordsOnBoard(currentTetrisPeice.getBlocks())
			);
		}
	});

	document.addEventListener("keydown", (e) => {
		let key = e.key;
		if (key === "ArrowDown") {
			currentTetrisPeice.moveDown();
			console.log(currentTetrisPeice.getBlocks());
			displayBoard(
				tetrisBoard.placeCoordsOnBoard(currentTetrisPeice.getBlocks())
			);
			console.log(tetrisBoard.getBoard());
			if (tetrisBoard.checkIfNewPeiceNeeded()) {
				currentTetrisPeice = createNewTetrisPeice();
			}
		}
	});
};

playGame();

export { createTetrisPiece, board };
