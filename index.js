let testFunc = () => {
	let test = document.getElementById("test");
	let newDiv = document.createElement("div");
	newDiv.textContent = "sup";
	test.appendChild(newDiv);
};

// testFunc();
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "762c75f4ecmshb09408299e534b3p1f6bebjsnbb1df82a374c",
		"X-RapidAPI-Host":
			"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
	},
};

fetch(
	"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/1003464/nutritionWidget.json",
	options
)
	.then((response) => response.json())
	.then((response) => console.log(response))
	.catch((err) => console.error(err));
