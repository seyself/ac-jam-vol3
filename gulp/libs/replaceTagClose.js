module.exports = function(content, file)
{
  return content.replace(/<(img|br)[^>]*>/g, function(code, index, text){
    return code.replace('>', ' />');
  });
};
