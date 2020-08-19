<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<html>
<head>
    <meta http-equiv="Content-type" content="text/html; charset=UTF-8"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/login.css"/>
    <title>欢迎登陆</title>
    <noscript>抱歉，你的浏览器不支持 JavaScript!</noscript>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.4.2.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/methods.js"></script>
    <script type="text/javascript">
        // 文档就绪事件
        $(function () {
            // 如果cookie中存有username，则显示用户名，勾选记住用户名
            $("input[name=username]").val(decodeURI("${cookie.username.value}"));
            let username = $("input[name='username']").val();
            if (username === "") {
                // 如果用户名为空，则不记住用户名
                $("input[name='remname']").attr("checked", "");
            } else {
                // 如果用户名不为空，则记住用户名
                $("input[name='remname']").attr("checked", "checked");
            }
        })

        // 提交表单的检查函数
        function checkForm(element) {
            let node = $(element);
            let result = true;
            result = !isNull(node.find("input[name='username']").get(0), "用户名不能为空") && result;
            result = !isNull(node.find("input[name='password']").get(0), "密码不能为空") && result;
            result = !isNull(node.find("input[name='valistr']").get(0), "验证码不能为空") && result;
            return result;
        }
    </script>
</head>
<body>
<img src="${pageContext.request.contextPath}/img/login/logo.png" alt="logo"
     style="position: absolute;top: 8%;left: 12%;">
<h1>欢迎登陆网上商城</h1>
<form action="${pageContext.request.contextPath}/LoginServlet" method="POST" onsubmit="return checkForm(this);">
    <table>
        <tr>
            <td colspan="2" style="color: red;text-align: center;">${requestScope.msg}</td>
        </tr>
        <tr>
            <td class="tdx">用户名：</td>
            <td>
                <input type="text" name="username" value="" onblur="isNull(this, '用户名不能为空')"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="tdx">密&nbsp;&nbsp; 码：</td>
            <td>
                <input type="password" name="password" onblur="isNull(this, '密码不能为空')"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="tdx">验证码：</td>
            <td>
                <input type="text" name="valistr" onblur="isNull(this, '验证码不能为空')"/>
                <img src="${pageContext.request.contextPath}/ValiImgServlet" width="" height="" alt="验证码"
                     onclick="refreshValistr(this)"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <input type="checkbox" name="remname" value="true" checked="checked"/>记住用户名
                <input type="checkbox" name="autologin" value="true"/>30天内自动登陆
            </td>
        </tr>
        <tr>
            <td colspan="2" style="text-align:center">
                <input type="submit" value="登 陆"/>
            </td>
        </tr>
    </table>
</form>
</body>
</html>
