"use strict"

//判断无自定义属性对象
exports.isObject = (obj) => {
    for(var p in obj){  
        if(obj.hasOwnProperty(p)){  
            return true;  //有自有属性或方法，返回false  
        }  
    }  
    return false;  //没有自有属性或方法，返回true，该对象是空对象  
};

exports.isNotFuli=(type)=>{
	if(type=='福利'){
		return false;
	}
	return true;
};