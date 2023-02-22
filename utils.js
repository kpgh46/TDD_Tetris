let getLastNumber = (num) => {
	let numToString = num.toString();
	let stringToArr = Array.from(numToString);
	let getLast = stringToArr[stringToArr.length - 1];
	return parseInt(getLast);
};
let generateTwoDArray = (numRows) => {
	let blankTwoDArr = [];

	for (let i = 0; i <= numRows; i++) {
		let row = [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1]];
		blankTwoDArr.push(row);
	}

	return blankTwoDArr;
};

let joinArrayOfNumbers = (arr) => {
	let stringifyArray = arr.map((num) => {
		return num.toString();
	});
	return parseInt(stringifyArray.join(""));
};

let returnRandomNum = () => {
	return Math.floor(Math.random() * 4);
};

let invertNums = (arr) => {
	let invertedArr = arr.map((num) => {
		let doubled = Math.abs(num * 2);

		if (num === 0) {
			return num;
		}
		if (num < 0) {
			return num + doubled;
		}
		if (num > 0) {
			return num - doubled;
		}
	});
	return invertedArr;
};

let invertNestedArr = (arr) => {
	let resultArr = [];
	arr.forEach((num) => {
		resultArr.push(invertNums(num));
	});
	return resultArr;
};

let getRandomBlock = () => {
	const lineBlock = [
		[
			[0, 3],
			[1, 3],
			[2, 3],
			[3, 3],
		],
		[
			[2, 2],
			[1, 1],
			[0, 0],
			[-1, -1],
		],
	];
	const zeeBlock = [
		[
			[1, 2],
			[1, 3],
			[0, 3],
			[0, 4],
		],
		[
			[-1, 1],
			[0, 0],
			[1, 1],
			[2, 0],
		],
	];

	const squareBlock = [
		[
			[0, 2],
			[0, 3],
			[1, 2],
			[1, 3],
		],
		[[[0, 0], [0, 0], [0, 0], [0]]],
	];

	const teeBlock = [
		[
			[1, 2],
			[1, 3],
			[1, 4],
			[0, 3],
		],
		[
			[0, 0],
			[0, 0],
			[0, 0],
			[2, 0],
		],
	];

	let arrOfPositions = [lineBlock, squareBlock, teeBlock, zeeBlock];

	return arrOfPositions[returnRandomNum()];
};

export {
	getLastNumber,
	joinArrayOfNumbers,
	returnRandomNum,
	invertNestedArr,
	getRandomBlock,
	generateTwoDArray,
};
