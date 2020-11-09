<%@page import="java.net.URLDecoder"%>
<%@page import="java.net.URLEncoder"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-type" content="text/html; charset=UTF-8" />
	<link rel="stylesheet" href="${app}/css/login.css"/>
	<title>EasyMall欢迎您登陆</title>
	<script type="text/javascript" src="${app}/js/common/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="${app}/js/cookie.js"></script>
	<script type="text/javascript" src="${app}/js/login_ajax.js"></script>
</head>
<body>
	<h1>欢迎登陆EasyMall</h1>
	<form>
		<table>
			<tr>
				<td class="tdx">用户名：</td>
				<td><input type="text" id="username" name="username" value=""/>
					<span style="color:red"></span>
				</td>
			</tr>
			<tr>
				<td class="tdx">密&nbsp;&nbsp; 码：</td>
				<td><input type="password" name="password"/>
				<span style="color:red"></span>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<input type="submit" value="登陆"/>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<span style="color:red"></span>
				</td>
			</tr>
		</table>
	</form>		
</body>
</html>

  