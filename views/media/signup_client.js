//clientside js page

var submit = document.getElementById("submit");
submit.addEventListener("click", function(){
	var firstNameContainer = document.getElementById("firstname");
	var lastNameContainer = document.getElementById("lastname");
  var emailContainer = document.getElementById("email");
  var passwordContainer = document.getElementById("password");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/signup");
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(JSON.stringify({name:firstNameContainer.value, lastname:lastNameContainer.value, email:emailContainer.value, password:passwordContainer.value }));
	console.log(firstNameContainer.value);
	console.log(lastNameContainer.value);
  console.log(emailContainer.value);
  console.log(passwordContainer.value);
	
});

var submit = document.getElementById("submit");
submit.addEventListener("click", function(){
	var emailContainer = document.getElementById("email");
	
	
});
