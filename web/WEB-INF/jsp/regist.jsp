<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>欢迎注册</title>
    <meta http-equiv="Content-type" content="text/html; charset=UTF-8"/>
    <link rel="icon" type="image/x-icon" href="${pageContext.request.contextPath}/img/index/icon.ico"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/regist.css"/>
    <noscript>抱歉，你的浏览器不支持 JavaScript!</noscript>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.4.2.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/methods.js"></script>
    <script type="text/javascript">

        /**
         * 用户名校验
         * @param element 元素
         * @returns {boolean} 用户名是否可用
         */
        function isUsernameValid(element) {
            // 非空校验
            if (isNull(element, "用户名不能为空"))
                return false;
            // ajax校验
            return isAvailable(element, "用户名可以使用", "用户名已被注册", decodeURI("${pageContext.request.contextPath}/user/username.action"));
        }

        /**
         * 密码有效性校验
         * @param element1 刚刚输入的密码
         * @param node2 要比对的密码
         * @returns {boolean} 是否合法
         */
        function isPasswordValid(element1, node2) {
            // 非空校验
            if (isNull(element1, "密码不能为空"))
                return false;
            // 一致性校验
            return isEqual(element1, node2, "两次密码输入不一致");
        }

        /**
         * 邮箱校验
         * @param element 元素
         * @returns {boolean} 邮箱是否合法
         */
        function isEmailAvailable(element) {
            // 非空校验
            if (isNull(element, "邮箱不能为空"))
                return false;
            // 正则校验
            return isRegexValid(element, /^\w+(\.\w+)*@\w+(\.\w+)+$/, "邮箱格式不正确");
        }

        /**
         * 表单校验
         * @returns {boolean|boolean} 表单信息是否有效
         */
        function checkForm() {
            let result = true;
            result = isUsernameValid($("input[name='username']").get(0)) && result;
            result = isPasswordValid($("input[name='password']").get(0), $("input[name='password2']")) && result;
            result = isPasswordValid($("input[name='password2']").get(0), $("input[name='password']")) && result;
            result = (!isNull($("input[name='nickname']").get(0), "昵称不能为空")) && result;
            result = isEmailAvailable($("input[name='email']").get(0)) && result;
            result = (!isNull($("input[name='valistr']").get(0), "验证码不能为空")) && result;
            return result;
        }
    </script>
</head>
<body>
<img src="${pageContext.request.contextPath}/img/login/logo.png" alt="logo"
     style="position: absolute;top: 8%;left: 12%;">
<form action="${pageContext.request.contextPath}/user/regist.action" method="POST" onsubmit="return checkForm();">
    <h1>欢迎注册网上商城</h1>
    <table>
        <tr>
            <td class="tds" colspan="2" style="color:red;text-align:center;">${requestScope.msg}</td>
        </tr>
        <tr>
            <td class="tds"><label for="username">用户名：</label></td>
            <td>
                <input type="text" name="username" id="username" value="${requestScope.username}" required="required"
                       onblur="isUsernameValid(this)" onfocus="clearMsg(this)"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="tds"><label for="password">密码：</label></td>
            <td>
                <input type="password" name="password" id="password" required="required"
                       onblur="isPasswordValid(this, $('input[name=password2]'))" onfocus="clearMsg(this)"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="tds"><label for="password2">确认密码：</label></td>
            <td>
                <input type="password" name="password2" id="password2" required="required"
                       onblur="isPasswordValid(this, $('input[name=password]'))" onfocus="clearMsg(this)"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="tds"><label for="nickname">昵称：</label></td>
            <td>
                <input type="text" name="nickname" id="nickname" value="${requestScope.nickname}" required="required"
                       onblur="isNull(this, '昵称不能为空')" onfocus="clearMsg(this)"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="tds"><label for="email">邮箱：</label></td>
            <td>
                <input type="email" name="email" id="email" value="${requestScope.email}" required="required"
                       onblur="isEmailAvailable(this)" onfocus="clearMsg(this)"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="tds"><label for="valistr">验证码：</label></td>
            <td>
                <input type="text" name="valistr" id="valistr" required="required" onblur="isNull(this, '验证码不能为空')"
                       onfocus="clearMsg(this)"/>
                <img src="${pageContext.request.contextPath}/valicode/valistr.action" width="" height="" alt="验证码"
                     onclick="refreshValistr(this)"/>
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
