const createTetrisBlock = require("../index");

describe("create tetris blocks", () => {
	test("each block has a length", () => {
		const tetrisBlock = createTetrisBlock();
		expect(tetrisBlock.length).toBeGreaterThan(0);
	});
	test("the first array value is a number", () => {
		const tetrisBlock = createTetrisBlock([0, 1], [0, 2], [0, 3], [0, 4]);
		expect(tetrisBlock[0][1]).toEqual(1);
	});
});
