import { createTetrisPiece, board } from "../index";

describe("create tetris blocks", () => {
	let tetrisBlock;
	const rotationValuesTwo = [
		[2, 2],
		[1, 1],
		[0, 0],
		[-1, -1],
	];
	beforeEach(() => {
		const startingPosition = [
			[0, 3],
			[1, 3],
			[2, 3],
			[3, 3],
		];

		const rotationValues = [
			[2, 2],
			[1, 1],
			[0, 0],
			[-1, -1],
		];
		tetrisBlock = createTetrisPiece(startingPosition, rotationValues);
	});

	test("each block has a length", () => {
		expect(tetrisBlock.getBlocks().length).toBeGreaterThan(0);
	});

	test("index is set to first position at initialization", () => {
		expect(tetrisBlock.getBlocks()[0][0]).toEqual(0);
		expect(tetrisBlock.getBlocks()[1][1]).toEqual(3);
	});

	test("tetris peice can rotate to second position", () => {
		tetrisBlock.rotate();

		expect(tetrisBlock.getBlocks()[0][0]).toEqual(2);
		expect(tetrisBlock.getBlocks()[1][1]).toEqual(4);
	});

	test("tetris peice rotates back to first position", () => {
		tetrisBlock.rotate();
		tetrisBlock.rotate();

		expect(tetrisBlock.getBlocks()[0][0]).toEqual(0);
		expect(tetrisBlock.getBlocks()[1][1]).toEqual(3);
	});

	test("tetris peice moves downward", () => {
		tetrisBlock.moveDown();

		expect(tetrisBlock.getBlocks()[0][0]).toEqual(1);
	});

	test("tetris peice does not exceed game boards on bottom", () => {
		Array.from(Array(100)).forEach((num) => tetrisBlock.moveDown());

		expect(tetrisBlock.getBlocks()[3][0]).toEqual(19);
	});

	test("tetris peice moves left", () => {
		console.log(tetrisBlock.getBlocks());
		tetrisBlock.moveLeft();
		expect(tetrisBlock.getBlocks()[0][1]).toEqual(2);
		expect(tetrisBlock.getBlocks()[1][1]).toEqual(2);
	});

	test("tetris peice moves right", () => {
		tetrisBlock.moveRight();
		tetrisBlock.moveRight();
		expect(tetrisBlock.getBlocks()[0][1]).toEqual(5);
		expect(tetrisBlock.getBlocks()[1][1]).toEqual(5);
	});

	test("tetris peice does not exceed board game limits on left", () => {
		Array.from(Array(100)).forEach((num) => tetrisBlock.moveLeft());

		expect(tetrisBlock.getBlocks()[3][1]).toEqual(0);
	});

	test("tetris peice does not exceed board game limits on right", () => {
		Array.from(Array(100)).forEach((num) => tetrisBlock.moveRight());

		expect(tetrisBlock.getBlocks()[3][1]).toEqual(9);
	});
});

// describe("logic for gameboard", () => {
// 	let tetrisBoard;
// 	let newBoardArray;

// 	const linePositions = [
// 		[
// 			[0, 2],
// 			[0, 3],
// 			[0, 4],
// 			[0, 5],
// 		],
// 		[
// 			[1, 2],
// 			[2, 2],
// 			[3, 2],
// 			[4, 2],
// 		],
// 	];

// 	beforeEach(() => {
// 		newBoardArray = Array.from(Array(200)).fill(1);
// 		tetrisBoard = board(newBoardArray);
// 	});
// 	test("board intakes array parameter", () => {
// 		expect(tetrisBoard.getBoard().length).toBeGreaterThan(0);
// 	});

// 	test("array parameter equals 200", () => {
// 		expect(tetrisBoard.getBoard().length).toEqual(200);
// 	});

// 	test("update board with coordinates from tetris peice", () => {
// 		let tetrisPeice = createTetrisPiece(linePositions);
// 		tetrisBoard.analyzeCoords(tetrisPeice.getBlocks());
// 		expect(tetrisBoard.getBoard()[2]).toEqual(2);
// 		expect(tetrisBoard.getBoard()[12]).toEqual(1);
// 	});

// 	test("update board when tetris Peice moves downward twice", () => {
// 		let tetrisPeice = createTetrisPiece(linePositions);
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisBoard.analyzeCoords(tetrisPeice.getBlocks());
// 		expect(tetrisBoard.getBoard()[22]).toEqual(2);
// 		expect(tetrisBoard.getBoard()[2]).toEqual(1);
// 	});

// 	test("board coordinates are 'set' when tetris peices moves to bottom of board", () => {
// 		let tetrisPeice = createTetrisPiece(linePositions);
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisPeice.moveDown();
// 		tetrisBoard.analyzeCoords(tetrisPeice.getBlocks());
// 		expect(tetrisBoard.getBoard()[193]).toEqual(3);
// 	});

// 	test("board coordinates are placed on a cell already set, so it is moved back 10 spaces", () => {
// 		let tetrisPeice = createTetrisPiece(linePositions);
// 		Array.from(Array(25)).forEach((num) => {
// 			tetrisPeice.moveDown();
// 		});
// 		tetrisBoard.analyzeCoords(tetrisPeice.getBlocks());
// 		let tetrisPeice2 = createTetrisPiece(linePositions);
// 		Array.from(Array(25)).forEach((num) => {
// 			tetrisPeice2.moveDown();
// 		});
// 		tetrisBoard.analyzeCoords(tetrisPeice2.getBlocks());
// 		expect(tetrisBoard.getBoard()[173]).toEqual(1);
// 		expect(tetrisBoard.getBoard()[183]).toEqual(3);
// 		expect(tetrisBoard.getBoard()[193]).toEqual(3);
// 		expect(tetrisBoard.getBoard()[194]).toEqual(3);
// 	});
// });
