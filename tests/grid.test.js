import { createTetrisPiece, board } from "../index";
import { generateTwoDArray } from "../utils";

describe("create tetris blocks", () => {
	let tetrisBlock;

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

describe("logic for gameboard", () => {
	let tetrisBoard;
	let blankBoard;
	let tetrisPeice;
	let secondTetrisPeice;

	beforeEach(() => {
		blankBoard = generateTwoDArray(19);
		tetrisBoard = board(blankBoard);

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

		const tBlockStarting = [
			[1, 2],
			[1, 3],
			[1, 4],
			[0, 3],
		];

		const tBlockRotation = [
			[0, 0],
			[0, 0],
			[0, 0],
			[2, 0],
		];

		tetrisPeice = createTetrisPiece(startingPosition, rotationValues);
		secondTetrisPeice = createTetrisPiece(tBlockStarting, tBlockRotation);
	});

	test("board intakes array parameter", () => {
		expect(tetrisBoard.getBoard().length).toBeGreaterThan(0);
	});

	test("array parameter equals 200", () => {
		expect(tetrisBoard.getBoard().length).toEqual(20);
	});

	test("update board with coordinates from tetris peice", () => {
		tetrisBoard.analyzeCoords([
			[0, 3],
			[1, 3],
			[2, 3],
			[3, 3],
		]);

		expect(tetrisBoard.getBoard()[0][3]).toEqual(2);
		expect(tetrisBoard.getBoard()[1][3]).toEqual(2);
	});

	test("update board when tetris Peice moves downward twice", () => {
		tetrisPeice.moveDown();
		tetrisPeice.moveDown();
		tetrisBoard.analyzeCoords(tetrisPeice.getBlocks());

		expect(tetrisBoard.getBoard()[2][3]).toEqual(2);
		expect(tetrisBoard.getBoard()[3][3]).toEqual(2);
	});

	test("board coordinates halt at 19 when excessive downward movements and sets with a 3", () => {
		Array.from(Array(25)).forEach((num) => {
			tetrisPeice.moveDown();
			tetrisBoard.analyzeCoords(tetrisPeice.getBlocks());
		});

		expect(tetrisBoard.getBoard()[19][3]).toEqual(3);
	});

	test("tetris peice moves right", () => {
		tetrisPeice.moveRight();

		tetrisBoard.analyzeCoords(tetrisPeice.getBlocks());
		expect(tetrisBoard.getBoard()[0][4]).toEqual(2);
		expect(tetrisBoard.getBoard()[1][4]).toEqual(2);
		// expect(tetrisBoard.getBoard()[0][3]).toEqual(1);
	});

	test("tetris peice moves left", () => {
		tetrisPeice.moveLeft();

		tetrisBoard.analyzeCoords(tetrisPeice.getBlocks());

		expect(tetrisBoard.getBoard()[0][2]).toEqual(2);
		expect(tetrisBoard.getBoard()[1][2]).toEqual(2);
	});

	test("tetris peice rotates", () => {
		tetrisPeice.rotate();
		tetrisBoard.analyzeCoords(tetrisPeice.getBlocks());

		expect(tetrisBoard.getBoard()[2][5]).toEqual(2);
	});

	test("tetris peice rotates twice back to original position", () => {
		tetrisPeice.rotate();
		tetrisPeice.rotate();
		tetrisBoard.analyzeCoords(tetrisPeice.getBlocks());
		// console.log(tetrisBoard.getBoard());

		expect(tetrisBoard.getBoard()[0][3]).toEqual(2);
	});

	// test("multiple coordinates placed onto board", () => {
	// 	tetrisPeice.moveDown();
	// 	tetrisPeice.moveDown();
	// 	tetrisPeice.moveDown();
	// 	tetrisPeice.moveDown();
	// 	tetrisPeice.moveDown();
	// 	tetrisBoard.analyzeCoords(tetrisPeice.getBlocks());

	// 	secondTetrisPeice.moveDown();
	// 	tetrisBoard.analyzeCoords(secondTetrisPeice.getBlocks());
	// 	console.log(tetrisBoard.getBoard());
	// 	expect(tetrisBoard.getBoard()[4][3]).toEqual(2);
	// 	expect(tetrisBoard.getBoard()[2][3]).toEqual(2);
	// });
});
