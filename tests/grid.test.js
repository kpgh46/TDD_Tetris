import { createTetrisPiece } from "../index";

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
		Array.from(Array(55)).forEach((num) => tetrisBlock.moveLeft());

		expect(tetrisBlock.getBlocks()[0][1]).toEqual(0);
	});
	test("tetris peice does not exceed board game limits on right", () => {
		//exessive amount of right moves
		Array.from(Array(112)).forEach((num) => tetrisBlock.moveRight());

		expect(tetrisBlock.getBlocks()[0][1]).toEqual(9);
	});
	// test("tetris peice moves downward", () => {});
	// test("tetric peice stops at bottom of board", () => {});
});
