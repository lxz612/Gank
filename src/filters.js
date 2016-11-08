"use strict"

//vue自定义过滤器

exports.isObject = (obj) => {
    for(var p in obj){  
        if(obj.hasOwnProperty(p)){  
            return true;  //有自有属性或方法，返回false  
        }  
    }  
    return false;  //没有自有属性或方法，返回true，该对象是空对象  
};

//在干货集中将“福利”属性去除
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

//过滤掉无自定义属性的空对象。因为周末是没有干货的，API会返回无属性的空results。
exports.filterNullObject=(ganks)=>{
	let fganks=[];
	for(let index in ganks){
		// console.log('gank.results',ganks[index].results);
		if(!isNullObject(ganks[index].results)){
				fganks.push(ganks[index]);
		}
	}
	return fganks;
};

//判断对象是否为无自定义属性的空对象
let isNullObject = (obj) => {
    for(var p in obj){  
        if(obj.hasOwnProperty(p)){  
            return false;  //有自有属性或方法，返回false  
        }  
    }  
    return true;  //没有自有属性或方法，返回true，该对象是空对象  
};