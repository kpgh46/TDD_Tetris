let createTetrisBlock = (first, second, third, fourth) => {
	const tetrisBlock = [first, second, third, fourth];
	return tetrisBlock;
};
// let test = createTetrisBlock([0, 1], [0, 2], [0, 3], [0, 4]);
// console.log(test[0][1]);

module.exports = createTetrisBlock;
