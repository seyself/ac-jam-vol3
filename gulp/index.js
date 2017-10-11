var gulp = require("gulp");
var fs = require("fs");
var path = require("path");
var argv = require("./libs/argv");
var config = require("./config");

fs.readdirSync("./gulp/tasks")
.filter( function(file)
{
	return file.match(/.js$/)
})
.forEach( function(file)
{
	var task = require("./tasks/" + file);
	if (typeof(task) == 'function')
	{
		task(gulp, config, argv);
	}
});

module.exports = gulp;
