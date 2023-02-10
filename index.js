import { joinArrayOfNumbers } from "./utils.js";

// factory function which creates tetris blocks
const createTetrisPiece = (positionsArray) => {
	let movingDown = true;

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
		currentPositionArray.forEach((num) => {
			if (num[0] < 20) {
				num[0] = num[0] + 1;
			}
		});
	};

	let stopMovingDown = () => {
		movingDown = false;
	};

	// setInterval(() => {
	// 	if (moveDown) {
	// 		moveDown();
	// 	}
	// }, 3000);

	return { rotate, getBlocks, moveLeft, moveRight, moveDown, stopMovingDown };
};

// returins the array of cells and placed coordinates
let board = () => {
	let newBoard = Array.from(Array(200)).fill(1);
	// return array of game board cells

	let getBoard = () => {
		return newBoard;
	};

	// return coordinates in whole number format (arr.length = 4)
	let getCoords = (arrayOfCoords) => {
		let arrayOfJoinedCoords = arrayOfCoords.map((coords) => {
			return joinArrayOfNumbers(coords);
		});
		return arrayOfJoinedCoords;
	};

	// matches coordinates onto the gameboard.
	let placeCoordsOnBoard = (arrayOfCoords, tetrisPeice) => {
		let coords = getCoords(arrayOfCoords);

		newBoard.filter((num, index) => {
			if (coords.includes(index)) {
				newBoard[index] = "x";
			} else {
				return false;
			}
		});

		return newBoard;
	};

	return { getBoard, placeCoordsOnBoard };
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
let grid = document.querySelector("#grid");

let deleteChild = (parent) => {
	let p = document.querySelector(`${parent}`);
	let c = p.lastElementChild;

	while (c) {
		p.removeChild(c);
		c = p.lastElementChild;
	}
};

let displayBoard = (b) => {
	deleteChild("#grid");

	b.forEach((cell) => {
		let cellDiv = document.createElement("div");
		cellDiv.classList.add("cell");
		if (cell === "x") {
			cellDiv.classList.add("active");
		}
		grid.appendChild(cellDiv);
	});
};

let playGame = () => {
	// create tetris peice
	let lineTetrisPeice = createTetrisPiece(linePositions);
	let currentTetrisPeicePosition = lineTetrisPeice.getBlocks();

	// create board
	let tetrisBoard = board();

	let currentBoard = tetrisBoard.getBoard();

	currentBoard = tetrisBoard.placeCoordsOnBoard(lineTetrisPeice.getBlocks());

	displayBoard(currentBoard);

	document.addEventListener("keydown", (e) => {
		let key = e.key;
		if (key === "ArrowRight") {
			// console.log("right arrow");
			lineTetrisPeice.rotate();
			console.log(lineTetrisPeice.getBlocks());
			displayBoard(
				tetrisBoard.placeCoordsOnBoard(lineTetrisPeice.getBlocks())
			);
			// currentBoard = tetrisBoard.placeCoordsOnBoard(
			// 	lineTetrisPeice.getBlocks()
			// );
			// displayBoard(currentBoard);
			// console.log("hi");
		}
	});
};

// event listener for down arrow

// if state - if variable changes, paint the board

// let b = board(arrayOfCells, linePositions[0]);
playGame();

export { createTetrisPiece, board };
