module.exports = function(gulp, config, argv)
{
  gulp.task("auth", function(done){
    var exec = require("child_process").execSync;
    var path = require("path");
    var fs = require('fs');

    var authFile = path.join('../../', config.auth);
    config.auth = require(authFile).basic;
    config.auth.dest = config.env.static;

    var htaccess = "AuthType Basic\n";
    htaccess += 'AuthName "[' + config.auth.project + '] Please enter your ID and password."\n';
    htaccess += 'AuthUserFile ' + config.auth.remotePath + '.htpasswd' + '\n';
    htaccess += 'require valid-user\n';
    if (config.auth.indexes)
    {
      htaccess += 'Options Indexes\n';
    }

    htaccess += '\n';
    htaccess += 'Satisfy Any\n';
    htaccess += 'Order Allow,Deny\n';
    htaccess += '\n';
    htaccess += 'SetEnvIf User-Agent "^facebookexternalhit.*$" fb_crawler\n';
    htaccess += 'SetEnvIf User-Agent "^facebookplatform.*$" fb_crawlers\n';
    htaccess += 'Allow from env=fb_crawler\n';
    htaccess += '\n';
    htaccess += 'SetEnvIf User-Agent "^Twitterbot.*$" tw_crawler\n';
    htaccess += 'Allow from env=tw_crawler\n';
    htaccess += '\n';

    var passwd = path.join(config.auth.dest, '.htpasswd');
    var access = path.join(config.auth.dest, '.htaccess');
    fs.writeFileSync(access, htaccess, 'utf8');
    exec('htpasswd -ndb ' + config.auth.user + ' ' + config.auth.pass + ' > ' + passwd);
    done();
  });
};
