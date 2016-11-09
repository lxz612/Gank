"use strict"

//自定义过滤器

//去掉gank.results的“福利”属性
exports.filterFuli=(results)=>{
	let fresults={};
	Object.keys(results).forEach(k =>{
		// console.log('k',results[k]);
		if(k!=='福利'){
			fresults[k]=results[k];//这里一定要用中括号表示属性
		}
	});
	return fresults;
};