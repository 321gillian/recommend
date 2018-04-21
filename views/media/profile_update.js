//clientside js page

var submit = document.getElementById("update profile");
submit.addEventListener("click", function(){
	var firstNameContainer = document.getElementById("firstname");
	var lastNameContainer = document.getElementById("lastname");
  var passwordContainer = document.getElementById("password");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/profile/update");
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(JSON.stringify({
    firstname:firstNameContainer.value,
    lastname:lastNameContainer.value, 
    password:passwordContainer.value
  }));
});
