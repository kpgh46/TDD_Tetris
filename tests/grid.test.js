const createTetrisBlock = require("../index");

describe("create tetris blocks", () => {
	let tetrisBlock;
	beforeEach(() => {
		tetrisBlock = createTetrisBlock([0, 1], [0, 2], [0, 3], [0, 4]);
	});

	test("each block has a length", () => {
		expect(tetrisBlock.length).toBeGreaterThan(0);
	});
	test("the first array value is a number", () => {
		expect(tetrisBlock[0][1]).toEqual(1);
	});
});
