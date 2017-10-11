module.exports = (function(){
	var p={options:{},task:"default",cwd:process.cwd()};
	process.argv.forEach(function(a,i){
		if(a.indexOf("-")==0) {
			var d=a.split("=");
      var k=d[0].replace(/^--/,"");
      var v=d[1];
			p.options[k]
        = String(v).toLowerCase()=="false" ? false // falseに変換
        : !isNaN(Number(v)) ? Number(v) //数値に変換
        : String(v).indexOf(',')>0 ? v.split(',') //配列に変換
        : String(v).toLowerCase()=="true" ? true // trueに変換
        : (v || true); // 文字列かtrue
			return;
		}
		if(i==2){ p.task=a; return; } // 実行したtask名を設定
	});
	return p;})();