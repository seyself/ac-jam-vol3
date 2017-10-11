var DEVELOP_STATE = 'develop';
var RELEASE_STATE = 'release';
var STAGING_STATE = 'staging';
var ARCHIVE_STATE = 'archive';
var EXTRA_STATE   = 'extra';
var LOCAL_STATE   = 'local';

module.exports = function(argv)
{
  var __state = getState(argv);
  argv.options.state   = __state;
  argv.options.release = __state === RELEASE_STATE;
  argv.options.staging = __state === STAGING_STATE;
  argv.options.archive = __state === ARCHIVE_STATE;
  argv.options.extra   = __state === EXTRA_STATE;
  argv.options.develop = __state === DEVELOP_STATE;
  argv.options.debug   = bool(argv.options.debug);
  argv.options.remote  = bool(argv.options.remote);
  argv.options.skip    = bool(argv.options.skip);
  argv.options.confirm = bool(argv.options.confirm);
  
  
  console.log('########################################################');
  var cmd = '$ gulp ' + argv.task;
  for(var name in argv.options)
  {
    if (argv.options[name] == false || name == 'state')
    {
      // not output
    }
    else
    if (argv.options[name] == true)
    {
      cmd += ' --' + name;
    }
    else
    {
      cmd += ' --' + name + '=' + argv.options[name];
    }
  }
  console.log( cmd );
  console.log('--------------------------------------------------------');
  console.log( 'argv: ' + JSON.stringify(argv, null, '  ') );
  console.log('########################################################');
};

function bool(value)
{
  return value === true || (value && value != 'false') || (!!value);
}

function getState(argv)
{
  return argv.options.release ? RELEASE_STATE
    : argv.options.staging ? STAGING_STATE
    : argv.options.archive ? ARCHIVE_STATE
    : argv.options.extra ? EXTRA_STATE
    : argv.options.local ? LOCAL_STATE
    : DEVELOP_STATE;
}
