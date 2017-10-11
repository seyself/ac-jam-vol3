(function(){
  try{ if('now' in Date === false || typeof(Date['now']) !== 'function'){ Date.now = function(){ return new Date().getTime(); }}}catch(e){}
  try{ if('performance' in window === false || !window['performance']){ var start_time = new Date().getTime(); window.performance = { now: function(){ return (new Date().getTime()) - start_time; }};} }catch(e){}
})();
