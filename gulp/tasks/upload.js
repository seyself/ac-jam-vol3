module.exports = function(gulp, config, argv)
{
	gulp.task("upload", function(done){
		var env = config.env;
		var credentials = config.upload.credentials;
		var credential = config.upload.credentials.default;
		if (env.__release)
		{
			credential = credentials.release || credentials.default;
		}
		else if (env.__staging)
		{
			credential = credentials.staging || credentials.default;
		}
		else if (env.__archive)
		{
			credential = credentials.archive || credentials.default;
		}
		else if (env.__extra)
		{
			credential = credentials.extra || credentials.default;
		}
		else if (env.__develop)
		{
			credential = credentials.develop || credentials.default;
		}
		console.log('====== upload ==========================================');
		console.log('  ' + env.dest + ' >>>>>>>>> ');
		console.log('========================================================');
		console.log(JSON.stringify(credential, null, '  '));
		var type = credential.type;
		if (type === 'ftp')
		{
			var upload_FTP = require('./upload/ftp');
			return upload_FTP(gulp, config, argv, credential, done);
		}
		else if (type === 'sftp')
		{
			var upload_SFTP = require('./upload/sftp');
			return upload_SFTP(gulp, config, argv, credential, done);
		}
		else if (type === 's3')
		{
			var upload_S3 = require('./upload/s3');
			return upload_S3(gulp, config, argv, credential, done);
		}
	});
}

