module.exports = function(gulp, config, argv)
{
  gulp.task("out", function(done){
    console.log(JSON.stringify(config, null, '  '));
    done();
  });
};