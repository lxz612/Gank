'use stirct'

//自定义过滤器

//去掉gank.results的“福利”属性
//说明：作用等同于index.vue 130行中的"delete d.results[category];"，为了展示filter的用法，所以这里使用过滤器的写法
exports.filterFuli=(results)=>{
	let fresults={};
	Object.keys(results).forEach(k =>{
		if(k!=='福利'){
			fresults[k]=results[k];//这里一定要用中括号表示属性
		}
	});
	return fresults; 
};