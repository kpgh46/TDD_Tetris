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

export { getLastNumber, joinArrayOfNumbers, returnRandomNum };
