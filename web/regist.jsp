<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>欢迎注册网上商城</title>
    <meta http-equiv="Content-type" content="text/html; charset=UTF-8"/>
    <link rel="stylesheet" href="<%=request.getContextPath() %>/css/regist.css"/>
    <script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-1.4.2.js"></script>
    <script type="text/javascript">
        $(function(){
            $("input[name='username']").blur(function(){
                formObj.isNull("username", "用户名不能为空");
            })
            $("input[name='password']").blur(function(){
                formObj.isNull("password", "密码不能为空");
            })
            $("input[name='password2']").blur(function(){
                formObj.isNull("password2", "确认密码不能为空");
                formObj.isEqual("password", "password2", "两次密码输入不一致");
            })
            $("input[name='nickname']").blur(function(){
                formObj.isNull("nickname", "昵称不能为空");
            })
            $("input[name='email']").blur(function(){
                formObj.isNull("email", "邮箱不能为空");
                formObj.isRegexValid("email", /^\w+(\.\w+)*@\w+(\.\w+)+$/, "邮箱格式不正确");
            })
            $("input[name='valistr']").blur(function(){
                formObj.isNull("valistr", "验证码不能为空");
            })
        })
        let formObj = {
            isNull: function (name, msg) {
                let node = $("input[name=" + name + "]");
                if (node.val() == null || node.val() === "") {
                    // 是空
                    node.nextAll("span").text(msg).css("color", "red");
                    return true;
                } else {
                    // 非空
                    node.nextAll("span").text("");
                    return false;
                }
            },
            isRegexValid: function (name, regex, msg) {
                let node = $("input[name=" + name + "]");
                if (node.val() === "") {
                    // 空值
                    return false;
                } else if (regex.test(node.val())) {
                    // 正则验证通过
                    node.nextAll("span").text("");
                    return true;
                } else {
                    // 正则不通过
                    node.val("");
                    node.nextAll("span").text(msg).css("color", "red");
                    return false;
                }
            },
            isEqual: function (name1, name2, msg) {
                let node1 = $("input[name=" + name1 + "]");
                let node2 = $("input[name=" + name2 + "]");
                if (node1.val() === node2.val() && node1.val() !== "" && node2.val() !== "") {
                    // 二者相等
                    node1.nextAll("span").text("");
                    return true;
                } else if (node1.val() === "" || node2.val() === "") {
                    // 存在为空的
                    node1.val("");
                    node2.val("");
                } else {
                    // 二者不相等
                    node1.val("");
                    node2.val("");
                    node1.nextAll("span").text(msg).css("color", "red");
                    return false;
                }
            },
            checkForm: function () {
                let result = true;
                result = (!this.isNull("username", "用户名不能为空")) && result;
                result = (!this.isNull("password", "密码不能为空")) && result;
                result = (!this.isNull("password2", "确认密码不能为空")) && result;
                result = this.isEqual("password", "password2", "两次密码输入不一致") && result;
                result = (!this.isNull("nickname", "昵称不能为空")) && result;
                result = (!this.isNull("email", "邮箱不能为空")) && result;
                result = this.isRegexValid("email", /^\w+(\.\w+)*@\w+(\.\w+)+$/, "邮箱格式不正确") && result;
                result = (!this.isNull("valistr", "验证码不能为空")) && result;
                return result;
            }
        }
    </script>
</head>
<body>
<form action="<%=request.getContextPath()%>/RegistServlet" method="POST" onsubmit="return formObj.checkForm();">
    <h1>欢迎注册网上商城</h1>
    <table>
        <tr>
            <td class="tds" colspan="2" style="color:red;text-align:center;">
                <%=request.getAttribute("msg") == null ? "" : request.getAttribute("msg")%>
            </td>
        </tr>
        <tr>
            <td class="tds">用户名：</td>
            <td>
                <input type="text" name="username"
                       value="<%=request.getAttribute("username")==null?"":request.getAttribute("username")%>"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="tds">密码：</td>
            <td>
                <input type="password" name="password"
                       value="<%=request.getAttribute("password")==null?"":request.getAttribute("password")%>"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="tds">确认密码：</td>
            <td>
                <input type="password" name="password2"
                       value="<%=request.getAttribute("password2")==null?"":request.getAttribute("password2")%>"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="tds">昵称：</td>
            <td>
                <input type="text" name="nickname"
                       value="<%=request.getAttribute("nickname")==null?"":request.getAttribute("nickname")%>"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="tds">邮箱：</td>
            <td>
                <input type="text" name="email"
                       value="<%=request.getAttribute("email")==null?"":request.getAttribute("email")%>"/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="tds">验证码：</td>
            <td>
                <input type="text" name="valistr"/>
                <img src="<%=request.getContextPath()%>/img/regist/yzm.jpg" width="" height="" alt=""/>
                <span></span>
            </td>
        </tr>
        <tr>
            <td class="sub_td" colspan="2" class="tds">
                <input type="submit" value="注册用户"/>
            </td>
        </tr>
    </table>
</form>
</body>
</html>
