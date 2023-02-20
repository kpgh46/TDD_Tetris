import {
	joinArrayOfNumbers,
	invertNestedArr,
	getRandomBlock,
	getTwoDArr,
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
	let currentScore = 0;
	let activeCells = [];
	let setCells = [];
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

	let getCoords = (arrayOfCoords) => {
		let arrayOfJoinedCoords = arrayOfCoords.map((coords) => {
			return joinArrayOfNumbers(coords);
		});
		return arrayOfJoinedCoords;
	};

	let clearActiveCells = () => {
		activeCells = [];
	};

	let getTwoDArr = (arr) => {
		let currentTwo = [];
		let numsIncluded = [];

		arr.sort((a, b) => a - b);
		arr.forEach((num, index) => {
			if (numsIncluded) {
				if (!numsIncluded.includes(num)) {
					let firstTwoDigists = Math.floor(num / 10);
					let tempArr = arr.filter(
						(digit) => Math.floor(digit / 10) === firstTwoDigists
					);
					currentTwo.push(tempArr);
					numsIncluded = tempArr;
				}
			}
		});
		return currentTwo;
	};

	let evaluateRows = (arr) => {
		let twoDSetCells = getTwoDArr(arr);
		let arrWithTen = [];
		let newTwoD = [];
		let newArr = [];
		let minNum = [];

		// Check to see if length is 10
		twoDSetCells.forEach((arr, index) => {
			if (arr.length === 10) {
				arrWithTen.push(arr);
				minNum.push(arr[0]);
				console.log(arrWithTen);
			}
		});

		// if there are values, push onto new array that does not include the 10
		if (arrWithTen.length > 0) {
			let count = arrWithTen.length;
			let min = Math.min(...minNum);
			twoDSetCells.forEach((arr) => {
				if (!arrWithTen.includes(arr)) {
					newTwoD.push(arr);
				}
			});

			newTwoD.forEach((arr) => {
				arr.forEach((num, index) => {
					newArr.push(num);
				});
			});
			setCells = newArr;

			setCells.forEach((num, index, arr) => {
				if (num < 190 && num < min) {
					setCells[index] = num + count * 10;
				}
			});
			updateBoard();
		}

		// loop through twoDArr
		// if arr has length of 10, push index to something
		// after loop, loop through new index arr
		// for each, splice out.  Then, add 10 to row index above min/max of new loop
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
		let coordsPlus10 = coords.map((coord) => coord + 10);
		let checkIfCoordsInSetCells = coords.some((coord) =>
			setCells.includes(coord)
		);
		let checkIfCurrentNearSet = coordsPlus10.some((coord) =>
			setCells.includes(coord)
		);

		if (checkIfCurrentNearSet) {
			coords.forEach((coord) => setCells.push(coord));
			evaluateRows(setCells);
			numberOfPeices++;
		}

		if (!checkIfCurrentNearSet && checkIfCoordsAtBottom) {
			coords.forEach((coord) => setCells.push(coord));
			evaluateRows(setCells);
			numberOfPeices++;
		}

		if (!checkIfCoordsInSetCells) {
			coords.forEach((coord) => activeCells.push(coord));
			updateBoard();
		}
	};

	return { getBoard, analyzeCoords, getNumberOfPeices, getScore };
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

////// TEST AREA ///////
let newBoardArray = Array.from(Array(200)).fill(1);
let downbtn = document.getElementById("down");
let rotatebtn = document.getElementById("rotate");
let leftbtn = document.getElementById("left");
let rightbtn = document.getElementById("right");

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

	///// CLICK EVENTS //////
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

	document.addEventListener("keydown", (e) => {
		let event = e.key;
		if (event === "ArrowDown") {
			testPeice.moveDown();
			testBoard.analyzeCoords(testPeice.getBlocks());
			displayBoard(testBoard.getBoard());

			if (testBoard.getNumberOfPeices() > currentNumberOfPeices) {
				currentNumberOfPeices = testBoard.getNumberOfPeices();
				console.log("board has more now");
				testPeice = generatePeice();
			}
		}
	});

	document.addEventListener("keydown", (e) => {
		let event = e.key;
		if (event === "ArrowLeft") {
			testPeice.moveLeft();
			testBoard.analyzeCoords(testPeice.getBlocks());
			displayBoard(testBoard.getBoard());

			if (testBoard.getNumberOfPeices() > currentNumberOfPeices) {
				currentNumberOfPeices = testBoard.getNumberOfPeices();
				console.log("board has more now");
				testPeice = generatePeice();
			}
		}
	});

	document.addEventListener("keydown", (e) => {
		let event = e.key;
		if (event === "ArrowRight") {
			testPeice.moveRight();
			testBoard.analyzeCoords(testPeice.getBlocks());
			displayBoard(testBoard.getBoard());

			if (testBoard.getNumberOfPeices() > currentNumberOfPeices) {
				currentNumberOfPeices = testBoard.getNumberOfPeices();
				console.log("board has more now");
				testPeice = generatePeice();
			}
		}
	});

	document.addEventListener("keydown", (e) => {
		let event = e.key;
		if (event === "ArrowUp") {
			testPeice.rotate();
			testBoard.analyzeCoords(testPeice.getBlocks());
			displayBoard(testBoard.getBoard());

			if (testBoard.getNumberOfPeices() > currentNumberOfPeices) {
				currentNumberOfPeices = testBoard.getNumberOfPeices();
				console.log("board has more now");
				testPeice = generatePeice();
			}
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

	leftbtn.addEventListener("click", () => {
		testPeice.moveLeft();
		testBoard.analyzeCoords(testPeice.getBlocks());
		displayBoard(testBoard.getBoard());

		if (testBoard.getNumberOfPeices() > currentNumberOfPeices) {
			currentNumberOfPeices = testBoard.getNumberOfPeices();
			console.log("board has more now");
			testPeice = generatePeice();
		}
	});

	rightbtn.addEventListener("click", () => {
		testPeice.moveRight();
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
