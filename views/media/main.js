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


var submit = document.getElementById("submit");
submit.addEventListener("click", function(){
	var firstNameContainer = document.getElementById("fname");
	var lastNameContainer = document.getElementById("lname");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/abc");
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(JSON.stringify({firstname:firstNameContainer.value, lastname:lastNameContainer.value}));
	console.log(lastNameContainer.value);
});