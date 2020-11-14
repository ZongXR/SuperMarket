//@ sourceURL=login_ajax.js
let randomKey = uuid() + new Date().getTime();

/**
 * 文档就绪事件
 */
$(function(){
	refreshValistr($("input[name=valistr]").next("img").get(0))
	//给form表单添加submit事件
	$("form").submit(function(){
		return login();
	});
});

/**
 * 离开页面调用
 */
window.onunload = function(){
	$.ajax({
		url:"http://www.supermarket.com/valistrdel",
		type:"get",
		data:{"token": "VALISTR_" + randomKey},
		dataType:"json"
	});
}

/**
 * 登录事件
 * @returns {boolean}
 */
function login(){
	//获取页面数据
	let userName = $("form input[name=username]").val();
	let userPassword = $("form input[name=password]").val();
	let valistr = $("form input[name=valistr]").val();
	if(userName===""){
		$("form table tr:eq(0) td span").html("用户名不能为空");
		return false;
	}
	if(userPassword===""){
		$("form table tr:eq(1) td span").html("密码不能为空");
		return false;
	}
	if (valistr===""){
		$("form table tr:eq(1) td span").html("验证码不能为空");
		return false;
	}

	$.ajax({
		url:"http://www.supermarket.com/user/login",
		type:"get",
		data:{"userName": userName, "userPassword": userPassword, "token": "VALISTR_" + randomKey, "valistr": valistr},
		dataType:"json",
		success:function(result){
			//result是服务端返回的数据
			if(result.status === 200) {
				// 登录成功
				window.location.href = "./index.html";
			}else if (result.status === 201 || result.status === 202){
				// 用户不存在
				$("#alert").text(result.msg);
			}else{
				alert(result.msg);
			}
		},
		error:function(){
			alert("请求失败!");
		}
	});
	return false;
}

/**
 * 刷新验证码
 * @param element 标签
 */
function refreshValistr(element) {
	randomKey = uuid() + new Date().getTime();
	$(element).attr("src", "/valistr?token=VALISTR_" + randomKey);
}

/**
 * 生成随机UUID
 * @returns {string} 生成的UUID
 */
function uuid() {
	let s = [];
	let hexDigits = "0123456789abcdef";
	for (let i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";
	return s.join("");
}
