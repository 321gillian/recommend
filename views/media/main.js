//clientside js page

var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");
btn.addEventListener("click", function(){
	console.log("helllooo");

	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-1.json', true);
	ourRequest.onload = function(){
		console.log("i ma here");

		var ourData = JSON.parse(ourRequest.responseText);
		renderHTML(ourData);
		
	};

	ourRequest.send();
});

function renderHTML(data){
	var cheese = "no";
	animalContainer.insertAdjacentHTML('beforeend', 'no');

}