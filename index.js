import { joinArrayOfNumbers } from "./utils.js";

// factory function which creates tetris blocks
const createTetrisPiece = (positionsArray) => {
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

	return {
		rotate,
		getBlocks,
		moveLeft,
		moveRight,
		moveDown,
	};
};

// returins the array of cells and placed coordinates
let newBoardArray = Array.from(Array(200)).fill(1);

let board = (array) => {
	let newBoard = array;
	let newPeice = false;

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

	return { getBoard };
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

// let displayBoard = (b) => {
// 	let grid = document.querySelector("#grid");
// 	grid.innerHTML = "";

// 	b.forEach((cell) => {
// 		let cellDiv = document.createElement("div");
// 		cellDiv.classList.add("cell");
// 		if (cell === 2) {
// 			cellDiv.classList.add("active");
// 		}
// 		if (cell === 3) {
// 			cellDiv.classList.add("set");
// 		}

// 		grid.appendChild(cellDiv);
// 	});
// };

let createNewTetrisPeice = () => {
	return createTetrisPiece(linePositions);
};

export { createTetrisPiece, board };
