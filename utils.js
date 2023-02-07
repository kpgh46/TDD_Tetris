let getLastNumber = (num) => {
	let numToString = num.toString();
	let stringToArr = Array.from(numToString);
	let getLast = stringToArr[stringToArr.length - 1];
	return parseInt(getLast);
};

export { getLastNumber };
