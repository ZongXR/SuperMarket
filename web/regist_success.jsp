<%--
  Created by IntelliJ IDEA.
  User: DrZon
  Date: 2020/8/2
  Time: 16:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>注册成功</title>
    <link rel="icon" type="image/x-icon" href="${pageContext.request.contextPath}/img/index/icon.ico" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/regist.css"/>
    <noscript>抱歉，你的浏览器不支持 JavaScript!</noscript>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.4.2.js"></script>
    <script type="text/javascript">
        // 文档就绪事件
        $(function () {
            let timeout = ${requestScope.timeout};
            let timer = window.setInterval(refresh, 1000);
            function refresh() {
                if (timeout > 0) {
                    timeout = timeout - 1;
                    $("#success_alarm").text("注册成功，" + timeout + "秒后跳转");
                }else{
                    window.clearInterval(timer);
                    window.location.href = "${pageContext.request.contextPath}/";
                }
            }
        });
    </script>
</head>
<body>
<img src="${pageContext.request.contextPath}/img/login/logo.png" alt="logo" style="position: absolute;top: 8%;left: 12%;">
<h1 id="success_alarm" style="width:600px;">
    注册成功，${requestScope.timeout}秒后跳转
</h1>
<p style="color:black;text-align: center;">
    如未跳转，请手动点击跳转至
    <a href="${pageContext.request.contextPath}/" target="_self" style="color:blue;text-decoration: none;">首页</a>
</p>
</body>
</html>
