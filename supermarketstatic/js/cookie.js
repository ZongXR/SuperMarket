//@ sourceURL=cookie.js
/**
 * 获取指定名称的cookie值
 * @param objName cookie名称
 * @returns {string}
 */
function getCookie(objName){
	//得到分割的cookie键值对
	let arrStr = document.cookie.split(";");
	for(let i=0; i<arrStr.length; i++){
		let temp = arrStr[i].split("=");
		if(trim(temp[0])===objName){
			return unescape(temp[1]);
		}
	}
	return "";
}

/**
 * 添加cookie
 * @param objName 键
 * @param objValue 值
 * @param objHours 有效时长
 */
function addCookie(objName,objValue,objHours){
	let str = objName + "=" + escape(objValue);
	//objHours为0时,不设定过期时间,浏览器关闭时cookie自动消失
	if(objHours>0){
		let ms = objHours * 3600 * 1000;
		let date = new Date();
		date.setTime(date.getTime()+ms);
		str+="; expires="+date.toGMTString();
	}
	document.cookie=str;
}

/**
 * 删除cookie
 * @param name 键
 */
function delCookie(name){
	let exp = new Date();
	exp.setTime(exp.getTime()-1);
	let cval = getCookie(name);
	if(cval!=null){
		document.cookie=name+"="+cval+";expires="+exp.toGMTString();
	}
}

/**
 * 设置cookie为30天
 * @param name 键
 * @param value 值
 */
function setCookie(name,value){
	let days = 30;
	let exp = new Date();
	exp.setTime(exp.getTime()+days*24*3600*1000);
	document.cookie=name+"="+escape(value)+"; expires="+exp.toGMTString();
}

/**
 * 删除左右两端的空格
 * @param str 要处理的字符串
 * @returns {*} 处理后的字符串
 */
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 删除左边的空格
 * @param str 要处理的字符串
 * @returns {*} 处理后的字符串
 */
function ltrim(str){
    return str.replace(/(^\s*)/g,"");
}

/**
 * 删除右边的空格
 * @param str 要处理的字符串
 * @returns {*} 处理后的字符串
 */
function rtrim(str){
    return str.replace(/(\s*$)/g,"");
}



