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
    <link rel="stylesheet" href="<%=request.getContextPath() %>/css/regist.css"/>
    <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-1.4.2.js"></script>
    <script type="text/javascript">
        $(function () {
            let timeout = <%=request.getAttribute("timeout") %>;
            setInterval(refresh, 1000);
            function refresh() {
                if (timeout > 0) {
                    timeout = timeout - 1;
                    $("#success_alarm").text("注册成功，" + timeout + "秒后跳转");
                }else{
                    $(window).attr("location", "/");
                }
            }
        });
    </script>
</head>
<body>
<h1 id="success_alarm" style="width:600px;">
    注册成功，<%=request.getAttribute("timeout")%>秒后跳转
</h1>
<p style="color:black;text-align: center;">
    如未跳转，请手动点击跳转至
    <a href="/" target="_self" style="color:blue;text-decoration: none;">首页</a>
</p>
</body>
</html>
