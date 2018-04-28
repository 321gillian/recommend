//clientside js page

var submit = document.getElementById("update profile");
submit.addEventListener("click", function(){
	var firstNameContainer = document.getElementById("firstname");
	var lastNameContainer = document.getElementById("lastname");
  var passwordContainer = document.getElementById("password");
  var favouritesContainer = document.getElementById("favourites");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/profile/update");
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(JSON.stringify({
    firstname:firstNameContainer.value,
    lastname:lastNameContainer.value, 
    password:passwordContainer.value,
   
    
  }));
});


var remove_song = function() {
  console.log("working");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("DELETE", "/favourite_song");
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(JSON.stringify({
    "song_id": parseInt(this.value, 10),
  }));
};

//change me!
var click = document.getElementsByClassName("remove_song");

for (var i = 0; i < click.length; i++) {
    click[i].addEventListener('click', remove_song, false);
}

