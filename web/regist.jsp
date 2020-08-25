<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>欢迎注册</title>
    <meta http-equiv="Content-type" content="text/html; charset=UTF-8"/>
    <link rel="icon" type="image/x-icon" href="${pageContext.request.contextPath}/img/index/icon.ico" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/regist.css"/>
    <noscript>抱歉，你的浏览器不支持 JavaScript!</noscript>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.4.2.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/methods.js"></script>
    <script type="text/javascript">
        // 文档就绪事件
        $(function () {
            if (window.applicationCache){
                // 如果支持html5
                $("[onblur]").removeAttr("onblur");
                $("input[name='username']").blur(function () {
                    isAvailable($("input[name='username']").get(0), "用户名可以使用", "用户名已被注册", decodeURI("${pageContext.request.contextPath}/AjaxUsernameServlet"));
                });
                $("input[name='password']").blur(function () {
                    isEqual($("input[name='password']").get(0), $("input[name='password2']"), "两次密码输入不一致");
                });
                $("input[name='password2']").blur(function () {
                    isEqual($("input[name='password2']").get(0), $("input[name='password']"), "两次密码输入不一致");
                });
            }
        });

        // 用户名校验
        function isUsernameValid(element){
            // 非空校验
            if (isNull(element, "用户名不能为空"))
                return false;
            // ajax校验
            return isAvailable(element, "用户名可以使用", "用户名已被注册", decodeURI("${pageContext.request.contextPath}/AjaxUsernameServlet"));
        }

        // 密码校验
        function isPasswordValid(element1, node2){
            // 非空校验
            if (isNull(element1, "密码不能为空"))
                return false;
            // 一致性校验
            return isEqual(element1, node2, "两次密码输入不一致");
        }

        // 邮箱校验
        function isEmailAvailable(element){
            // 非空校验
            if (isNull(element, "邮箱不能为空"))
                return false;
            // 正则校验
            return isRegexValid(element, /^\w+(\.\w+)*@\w+(\.\w+)+$/, "邮箱格式不正确");
        }

        // 表单检查
        function checkForm(){
            if (window.applicationCache){
                // 如果支持html5
                let result = true;
                result = result & isAvailable($("input[name='username']").get(0), "用户名可以使用", "用户名已被注册", "AjaxUsernameServlet");
                result = result & isEqual($("input[name='password']").get(0), $("input[name='password2']"), "两次密码输入不一致");
                result = result & isEqual($("input[name='password2']").get(0), $("input[name='password']"), "两次密码输入不一致");
                return result;
            }else {
                // 如果不支持html5
                let result = true;
                result = result & isUsernameValid($("input[name='username']").get(0));
                result = result & isPasswordValid($("input[name='password']").get(0), $("input[name='password2']"));
                result = result & isPasswordValid($("input[name='password2']").get(0), $("input[name='password']"));
                result = result & (!isNull($("input[name='nickname']").get(0), "昵称不能为空"));
                result = result & isEmailAvailable($("input[name='email']").get(0));
                result = result & (!isNull($("input[name='valistr']").get(0), "验证码不能为空"));
                return result;
            }
        }
    </script>
</head>
<body>
<img src="${pageContext.request.contextPath}/img/login/logo.png" alt="logo" style="position: absolute;top: 8%;left: 12%;">
<form action="${pageContext.request.contextPath}/RegistServlet" method="POST" onsubmit="return checkForm();">
    <h1>欢迎注册网上商城</h1>
    <table>
        <tr>
            <td class="tds" colspan="2" style="color:red;text-align:center;">${requestScope.msg}</td>
        </tr>
        <tr>
            <td class="tds">用户名：</td>
            <td>
                <input type="text" name="username" value="${requestScope.username}" required="required" onblur="isUsernameValid(this)"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="tds">密码：</td>
            <td>
                <input type="password" name="password" value="${requestScope.password}" required="required" onblur="isPasswordValid(this, $('input[name=password2]'))"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="tds">确认密码：</td>
            <td>
                <input type="password" name="password2" value="${requestScope.password2}" required="required" onblur="isPasswordValid(this, $('input[name=password]'))"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="tds">昵称：</td>
            <td>
                <input type="text" name="nickname" value="${requestScope.nickname}" required="required" onblur="isNull(this, '昵称不能为空')"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="tds">邮箱：</td>
            <td>
                <input type="email" name="email" value="${requestScope.email}" required="required" onblur="isEmailAvailable(this)"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="tds">验证码：</td>
            <td>
                <input type="text" name="valistr" required="required" onblur="isNull(this, '验证码不能为空')"/>
                <img src="${pageContext.request.contextPath}/ValiImgServlet" width="" height="" alt="验证码" onclick="refreshValistr(this)"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td colspan="2" class="tds">
                <input type="submit" value="注册用户"/>
            </td>
        </tr>
    </table>
</form>
</body>
</html>
