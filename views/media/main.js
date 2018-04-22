//clientside js page

var loginContainer = document.getElementById("text-info");
var btn = document.getElementById("submit");
btn.addEventListener("click", function(){
	console.log("login");

	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', '', true);
	ourRequest.onload = function(){
		console.log("i am working");

		var ourData = JSON.parse(ourRequest.responseText);
		renderHTML(ourData);
		
	};

	ourRequest.send();
});

function renderHTML(data){
	var cheese = "no";
	testContainer.insertAdjacentHTML('beforeend', 'no');

}
//login
var submit = document.getElementById("submit");
submit.addEventListener("click", function(){
	var userNameContainer = document.getElementById("username");
	var passwordContainer = document.getElementById("password");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/login");
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(JSON.stringify({username:userNameContainer.value, password:passwordContainer.value}));
	console.log(userNameContainer.value);
	console.log(passwordContainer.value);
	
});

//signup
var submit = document.getElementById("submit");
submit.addEventListener("click", function(){
	var firstNameContainer = document.getElementById("firstname");
	var lastNameContainer = document.getElementById("lastname");
  var emailContainer = document.getElementById("email");
  var passwordContainer = document.getElementById("password");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/signup");
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(JSON.stringify({firstname:firstNameContainer.value, lastname:lastNameContainer.value, password:passwordContainer.value, email:emailContainer.value}));
	console.log(firstNameContainer.value);
	console.log(lastNameContainer.value);
	console.log(emailContainer.value);
  console.log(passwordContainer.value);
});


