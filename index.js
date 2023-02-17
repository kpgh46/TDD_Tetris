import {
	joinArrayOfNumbers,
	returnRandomNum,
	invertNestedArr,
} from "./utils.js";

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
	let activeCells = [];
	let setCells = [];
	let numberOfPeices = 0;

	let getBoard = () => {
		return currentBoard;
	};

	let getNumberOfPeices = () => {
		return numberOfPeices;
	};

	let getCoords = (arrayOfCoords) => {
		let arrayOfJoinedCoords = arrayOfCoords.map((coords) => {
			return joinArrayOfNumbers(coords);
		});
		return arrayOfJoinedCoords;
	};

	let clearActiveCells = () => {
		activeCells = [];
	};

	let updateBoard = () => {
		currentBoard.forEach((cell, index) => {
			if (activeCells.includes(index)) {
				currentBoard[index] = 2;
			}
			if (setCells.includes(index)) {
				currentBoard[index] = 3;
			}

			if (!activeCells.includes(index) && !setCells.includes(index)) {
				currentBoard[index] = 1;
			}
		});
	};

	let analyzeCoords = (arrayOfCoords) => {
		clearActiveCells();
		let coords = getCoords(arrayOfCoords);
		let checkIfCoordsAtBottom = coords.some((coord) => coord > 189);
		let checkIfCoordsInSetCells = coords.some((coord) =>
			setCells.includes(coord)
		);

		if (checkIfCoordsAtBottom) {
			coords.forEach((coord) => setCells.push(coord));
			numberOfPeices++;
		}

		if (!checkIfCoordsInSetCells) {
			coords.forEach((coord) => activeCells.push(coord));
		}

		if (checkIfCoordsInSetCells) {
			let newCoords = coords.map((coord) => coord - 10);
			newCoords.forEach((coord) => setCells.push(coord));
			numberOfPeices++;
		}

		updateBoard();
	};

	return { getBoard, analyzeCoords, getNumberOfPeices };
};

////// DISPLAY //////
let displayBoard = (b) => {
	let grid = document.querySelector("#grid");
	grid.innerHTML = "";

	b.forEach((cell, index) => {
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
};

///// GAME INFORMATION ////

////// TEST AREA ///////
let newBoardArray = Array.from(Array(200)).fill(1);
let downbtn = document.getElementById("down");
let rotatebtn = document.getElementById("rotate");

let getRandomBlock = () => {
	const lineBlock = [
		[
			[0, 3],
			[1, 3],
			[2, 3],
			[3, 3],
		],
		[
			[2, 2],
			[1, 1],
			[0, 0],
			[-1, -1],
		],
	];
	const zeeBlock = [
		[
			[1, 2],
			[1, 3],
			[0, 3],
			[0, 4],
		],
		[
			[-1, 1],
			[0, 0],
			[1, 1],
			[2, 0],
		],
	];

	const squareBlock = [
		[
			[0, 2],
			[0, 3],
			[1, 2],
			[1, 3],
		],
		[[[0, 0], [0, 0], [0, 0], [0]]],
	];

	const teeBlock = [
		[
			[1, 2],
			[1, 3],
			[1, 4],
			[0, 3],
		],
		[
			[0, 0],
			[0, 0],
			[0, 0],
			[2, 0],
		],
	];

	let arrOfPositions = [lineBlock, zeeBlock, squareBlock, teeBlock];

	return arrOfPositions[returnRandomNum()];
};

let generatePeice = () => {
	let randomBlock = getRandomBlock();
	return createTetrisPiece(randomBlock[0], randomBlock[1]);
};

let playGame = () => {
	let testBoard = board(newBoardArray);
	let currentNumberOfPeices = testBoard.getNumberOfPeices();
	let testPeice = generatePeice();
	testBoard.analyzeCoords(testPeice.getBlocks());
	displayBoard(testBoard.getBoard());

	downbtn.addEventListener("click", () => {
		testPeice.moveDown();
		testBoard.analyzeCoords(testPeice.getBlocks());
		displayBoard(testBoard.getBoard());

		if (testBoard.getNumberOfPeices() > currentNumberOfPeices) {
			currentNumberOfPeices = testBoard.getNumberOfPeices();
			console.log("board has more now");
			testPeice = generatePeice();
		}
	});

	rotatebtn.addEventListener("click", () => {
		testPeice.rotate();
		testBoard.analyzeCoords(testPeice.getBlocks());
		displayBoard(testBoard.getBoard());

		if (testBoard.getNumberOfPeices() > currentNumberOfPeices) {
			currentNumberOfPeices = testBoard.getNumberOfPeices();
			console.log("board has more now");
			testPeice = generatePeice();
		}
	});
};

playGame();

export { createTetrisPiece, board };
