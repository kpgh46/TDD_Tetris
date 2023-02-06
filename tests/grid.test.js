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
});
