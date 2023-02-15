let getLastNumber = (num) => {
	let numToString = num.toString();
	let stringToArr = Array.from(numToString);
	let getLast = stringToArr[stringToArr.length - 1];
	return parseInt(getLast);
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

export { getLastNumber, joinArrayOfNumbers, returnRandomNum, invertNestedArr };
