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
		currentPositionArray.forEach((num) => {
			if (num[1] > 0) {
				num[1] = num[1] - 1;
			}
		});
	};

	let moveRight = () => {
		currentPositionArray.forEach((num) => {
			if (num[1] < 9) {
				num[1] = num[1] + 1;
			}
		});
	};

	let moveDown = () => {
		currentPositionArray.forEach((num) => {
			num[0] = num[0] + 1;
		});
	};

	return { rotate, getBlocks, moveLeft, moveRight, moveDown };
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

let test = createTetrisPiece(linePositions);
// test.moveLeft();
test.moveRight();
// console.log(test.getBlocks());

export { createTetrisPiece };
