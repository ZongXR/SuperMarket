//@ sourceURL=login_ajax.js
$(function(){
	
	//给form表单添加submit事件
	$("form").submit(function(){
		return login();
	});
	
});
function login(){
	//获取页面数据
	let userName = $("form input[name=username]").val();
	let userPassword = $("form input[name=password]").val();
	if(userName===""){
		$("form table tr:eq(0) td span").html("用户名不能为空");
		return false;
	}
	if(userPassword===""){
		$("form table tr:eq(1) td span").html("密码不能为空");
		return false;
	}

	$.ajax({
		url:"http://www.supermarket.com/user/login",
		type:"get",
		data:{"userName":userName,"userPassword":userPassword},
		dataType:"json",
		success:function(result){
			//result是服务端返回的数据
			if(result.status===200){
				//window.location.href="index.html";
				window.location.href="index.html";
			}else{
				alert("登录失败");
			}
		},
		error:function(){
			alert("请求失败!");
		}
	});
	
	return false;
}
