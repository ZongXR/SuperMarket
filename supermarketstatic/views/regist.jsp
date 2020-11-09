<%@ page language="java" import="java.util.*"
	 pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
  <head>
	<title>欢迎注册EasyMall</title>
	<link rel="stylesheet" href="${app}/css/regist.css"/>
	<script type="text/javascript" src="${app}/js/common/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="${app}/js/regist_ajax.js"></script>
	
</head>
<body>
	<form >
		<h1>欢迎注册EasyMall</h1>
		<table>
			<tr>
				<td colspan="2"><font color="red">
				
				</font></td>
			</tr>
			<tr>
				<td class="tds">用户名：</td>
				<td>
					<input type="text" name="username" />
					<span style="color: red" id="username_msg"></span>
				</td>
			</tr>
			<tr>
				<td class="tds">密码：</td>
				<td>
					<input type="password" name="password" />
					<span style="color: red" id="password_msg"></span>
				</td>
			</tr>
			<tr>
				<td class="tds">确认密码：</td>
				<td>
					<input type="password" name="password2" />
					<span style="color: red" id="password2_msg"></span>
				</td>
			</tr>
			<tr>
				<td class="tds">昵称：</td>
				<td>
					<input type="text" name="nickname" />
					<span style="color: red" id="nickname_msg"></span>
				</td>
			</tr>
			<tr>
				<td class="tds">邮箱：</td>
				<td>
					<input type="text" name="email"/>
					<span style="color: red" id="email_msg"></span>
				</td>
			</tr>
			<%-- <tr>
				<td class="tds">验证码：</td>
				<td>
					<input type="text" name="valistr"/>
					<img id="vcode" src="${app}/user/verifyCode" width="" height="" alt=""/>
					<span style="color: red" id="valistr_msg"></span>
				</td>
			</tr> --%>
			<tr>
				<td class="sub_td" colspan="2" class="tds">
					<input type="submit" value="注册用户"/>
				</td>
			</tr>
		</table>
	</form>
</body>
</html>
