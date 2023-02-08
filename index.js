// import { joinArrayOfNumbers } from "./utils";

let joinArrayOfNumbers = (arr) => {
	let stringifyArray = arr.map((num) => {
		return num.toString();
	});
	return parseInt(stringifyArray.join(""));
};

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
		currentPositionArray.forEach((num) => {
			if (num[0] < 20) {
				num[0] = num[0] + 1;
			}
		});
	};

	return { rotate, getBlocks, moveLeft, moveRight, moveDown };
};

let arrayOfCells = Array.from(Array(200));
arrayOfCells.fill(1);

let board = (arrayOfCells, arrayOfCoords) => {
	let getCells = () => {
		return arrayOfCells;
	};

	let getCoords = () => {
		let arrayOfJoinedCoords = arrayOfCoords.map((coords) => {
			return joinArrayOfNumbers(coords);
		});
		return arrayOfJoinedCoords;
	};

	let placeCoordsOnBoard = () => {
		// let cells = getCells();
		let coords = getCoords();

		arrayOfCells.filter((num, index) => {
			if (coords.includes(index)) {
				console.log(index, num);
				arrayOfCells[index] = "x";
			}
		});

		return arrayOfCells;
	};

	return { getCells, getCoords, placeCoordsOnBoard };
};

const linePositions = [
	[
		[0, 2],
		[0, 3],
		[0, 4],
		[0, 5],
	],
	[
		[0, 2],
		[1, 3],
		[1, 3],
		[1, 4],
	],
];

let b = board(arrayOfCells, linePositions[0]);
// console.log(b.getCoords());

// console.log(b.getCoords());
b.placeCoordsOnBoard();
console.log(b.getCells());
console.log(b.getCoords().length);
// let test = createTetrisPiece(linePositions);

// console.log(test.getBlocks());

export { createTetrisPiece, board };
