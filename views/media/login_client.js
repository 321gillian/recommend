//clientside js page
var submit = document.getElementById("submit_login");

submit.addEventListener("click", function(){
	var emailContainer = document.getElementById("email");
  var passwordContainer = document.getElementById("password");
  
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/login");
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(JSON.stringify({
    email:emailContainer.value,  
    password:passwordContainer.value })
 );
});