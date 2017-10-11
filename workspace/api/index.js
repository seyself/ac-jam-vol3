

module.exports = function(req, res)
{
  // var response_str = 'HOGE ' + req.url + '\n';
  switch(req.url)
  {
    case '/':
      var data = {
        code: 200,
        servertime: Math.floor(Date.now() / 1000),
        message: 'ok',
        content: {
          x:10, y:20
        }
      };
      return data;
    default :
      return {};
  }
};
