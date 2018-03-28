var express = require("express");
var app = express();

app.get('/', function(req, res) {
res.send("Hello World"); // we set the response to send back the string hello world
console.log("Hello World"); // used to output activity in the console
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");

});
