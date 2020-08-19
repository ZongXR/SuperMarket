<%--
  Created by IntelliJ IDEA.
  User: DrZon
  Date: 2020/8/2
  Time: 16:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" isErrorPage="true" %>
<html>
<head>
    <title>遇到错误</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/regist.css"/>
</head>
<body>
<img src="${pageContext.request.contextPath}/img/login/logo.png" alt="logo"
     style="position: absolute;top: 8%;left: 12%;">
<h1 id="error_alarm" style="width:600px;">遇到错误${pageContext.response.status}</h1>
<p>${pageContext.exception.message}</p>
<p>跳转回<a href="${pageContext.request.contextPath}/" target="_self" style="color:blue;text-decoration: none;">首页</a></p>
</body>
</html>
