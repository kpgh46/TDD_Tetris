import { createTetrisPiece, board } from "../index";

describe("create tetris blocks", () => {
	let tetrisBlock;
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
	beforeEach(() => {
		tetrisBlock = createTetrisPiece(linePositions);
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
		expect(tetrisBlock.getBlocks()[1][1]).toEqual(3);
		expect(tetrisBlock.getBlocks()[3][1]).toEqual(4);
	});
	test("rotating peice twice returns to first position", () => {
		tetrisBlock.rotate();
		tetrisBlock.rotate();
		expect(tetrisBlock.getBlocks()[0][0]).toEqual(0);
		expect(tetrisBlock.getBlocks()[1][1]).toEqual(3);
	});

	test("tetris peice moves left", () => {
		tetrisBlock.moveLeft();
		expect(tetrisBlock.getBlocks()[0][1]).toEqual(1);
		expect(tetrisBlock.getBlocks()[1][1]).toEqual(2);
	});

	test("tetris peice moves right", () => {
		tetrisBlock.moveRight();
		tetrisBlock.moveRight();
		expect(tetrisBlock.getBlocks()[0][1]).toEqual(3);
		expect(tetrisBlock.getBlocks()[1][1]).toEqual(4);
	});

	test("tetris peice does not exceed board game limits on left", () => {
		//excessive amount of Left moves
		Array.from(Array(100)).forEach((num) => tetrisBlock.moveLeft());

		expect(tetrisBlock.getBlocks()[0][1]).toEqual(0);
	});

	test("tetris peice does not exceed board game limits on right", () => {
		//exessive amount of right moves
		Array.from(Array(100)).forEach((num) => tetrisBlock.moveRight());

		expect(tetrisBlock.getBlocks()[0][1]).toEqual(6);
	});

	test("tetris peice moves downward", () => {
		tetrisBlock.moveDown();
		tetrisBlock.moveDown();
		expect(tetrisBlock.getBlocks()[2][0]).toEqual(2);
	});

	test("tetris peice does not exceed game boards on bottom", () => {
		Array.from(Array(100)).forEach((num) => tetrisBlock.moveDown());

		expect(tetrisBlock.getBlocks()[2][0]).toEqual(19);
	});
});

describe("logic for gameboard", () => {
	let tetrisBoard;

	beforeEach(() => {
		tetrisBoard = board();
	});
	test("board intakes array parameter", () => {
		expect(tetrisBoard.getBoard().length).toBeGreaterThan(0);
	});

	test("array parameter equals 200", () => {
		expect(tetrisBoard.getBoard().length).toEqual(200);
	});

	test("adding new coordinates onto the board", () => {
		let arrayOfCoords = [
			[0, 2],
			[0, 3],
			[0, 4],
			[0, 5],
		];
		tetrisBoard.placeCoordsOnBoard(arrayOfCoords);
		expect(tetrisBoard.getBoard()[2]).toEqual("x");
		expect(tetrisBoard.getBoard()[5]).toEqual("x");
	});

	test("adding an additional set of coordinates onto the board", () => {
		let arrayOfCoords1 = [
			[0, 2],
			[0, 3],
			[0, 4],
			[0, 5],
		];
		let arrayOfCoords2 = [
			[10, 2],
			[11, 2],
			[12, 2],
			[13, 2],
		];
		tetrisBoard.placeCoordsOnBoard(arrayOfCoords1);
		tetrisBoard.placeCoordsOnBoard(arrayOfCoords2);
		expect(tetrisBoard.getBoard()[2]).toEqual(1);
		expect(tetrisBoard.getBoard()[102]).toEqual("x");
	});
});

describe("test tetrisPeice and board working together", () => {
	let tetrisBoard;
	let lineTetrisPeice;

	beforeEach(() => {
		tetrisBoard = board();
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
		lineTetrisPeice = createTetrisPiece(linePositions);
	});

	test("creating tetris peice and rendering it onto the board", () => {
		lineTetrisPeice.rotate();
		tetrisBoard.placeCoordsOnBoard(lineTetrisPeice.getBlocks());
		expect(tetrisBoard.getBoard()[2]).toEqual("x");
		expect(tetrisBoard.getBoard()[13]).toEqual("x");
		expect(tetrisBoard.getBoard()[14]).toEqual("x");
	});

	test("moveDown function renders correctly onto the board", () => {
		lineTetrisPeice.moveDown();
		lineTetrisPeice.moveDown();
		tetrisBoard.placeCoordsOnBoard(lineTetrisPeice.getBlocks());
		expect(tetrisBoard.getBoard()[22]).toEqual("x");
	});
});

// describe("playGame main function", () => {
// 	let tetrisBoard;
// 	let lineTetrisPeice;

// 	beforeEach(() => {
// 		tetrisBoard = board();
// 		const linePositions = [
// 			[
// 				[0, 2],
// 				[0, 3],
// 				[0, 4],
// 				[0, 5],
// 			],
// 			[
// 				[0, 2],
// 				[1, 3],
// 				[1, 3],
// 				[1, 4],
// 			],
// 		];
// 		lineTetrisPeice = createTetrisPiece(linePositions);
// 	});

// test("a blank board with 200 cells and a tetris peice is created", () => {
// 	let game = playGame();
// 	let board = playGame;
// });
// });

// describe("testing rendering function", () => {});
