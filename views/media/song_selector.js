//clientside js page

var submit = document.getElementById("submit");
submit.addEventListener("click", function(){
	var song_id = document.getElementById("song_id");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/favourite_song");
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(JSON.stringify({
    song_id:parseInt(song_id.value, 10),
  }));
});

