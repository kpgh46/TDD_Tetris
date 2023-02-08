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

		expect(tetrisBlock.getBlocks()[2][0]).toEqual(20);
	});
});

describe("logic for gameboard", () => {
	let arrayOfCells;
	let arrayOfCoords;
	beforeEach(() => {
		arrayOfCells = Array.from(Array(200));
		arrayOfCoords = [
			[0, 2],
			[0, 3],
			[0, 4],
			[0, 5],
		];
	});
	test("board intakes array parameter", () => {
		let gameBoard = board([1, 2, 3, 4]);
		expect(gameBoard.getCells().length).toBeGreaterThan(0);
	});

	test("array parameter equals 200", () => {
		let gameBoard = board(arrayOfCells);
		expect(gameBoard.getCells().length).toEqual(200);
	});

	test("board intakes a nested array with a length of 4 representing tetris block coordinates", () => {
		let gameBoard = board(arrayOfCells, arrayOfCoords);
		expect(gameBoard.getCoords().length).toEqual(4);
	});

	test("board coordinates are joined instead of paired arrays", () => {});

	// test("place coords onto board by updating cooresponding cells", () => {
	// 	let gameBoard = board(arrayOfCells, arrayOfCoords);
	// 	gameBoard.placeCoordsOnBoard();
	// 	expect(gameBoard.getCells()[2]).toBe("x");
	// });
});
