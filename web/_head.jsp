<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<link rel="stylesheet" href="<%=request.getContextPath() %>/css/head.css"/>
<meta http-equiv="Content-type" content="text/html; charset=UTF-8"/>
<script type="text/javascript">
    $(function () {
        //标记登录状态
        let username = "<%=session.getAttribute("username")%>";
        if (username === "null") {
            // 如果还未登录
            $("#unlogin").show();
            $("#login").hide();
        } else {
            // 如果已经登录
            $("#unlogin").hide();
            $("#login").show();
            $("#login").children("a").eq(0).text(username);
        }
    })
    function logout(element) {
        if (window.confirm("是否退出登录?") === true) {
            $.ajax({
                "url": "<%=request.getContextPath()%>/LogoutServlet",
                "async": true,
                "type": "POST",
                "success": function (result) {
                    // 注销后跳转首页
                    window.location.href = "<%=request.getContextPath()%>"
                }
            })
        }
    }
</script>
<div id="common_head">
    <div id="line1">
        <div id="content">
            <span id="unlogin">
                <a href="<%=request.getContextPath() %>/login.jsp">登录</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="<%=request.getContextPath()%>/regist.jsp">注册</a>
            </span>
            <span id="login">
                <a href="javascript:void(0)">用户名</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="javascript:void(0)" onclick="logout(this)">注销</a>
            </span>
        </div>
    </div>
    <div id="line2">
        <img id="logo" src="<%=request.getContextPath() %>/img/login/logo.png"/>
        <input type="text" name=""/>
        <input type="button" value="搜 索"/>
        <span id="goto">
			<a id="goto_order" href="#">我的订单</a>
			<a id="goto_cart" href="#">我的购物车</a>
		</span>
        <img id="erwm" src="<%=request.getContextPath() %>/img/head/e2.png" width="76"/>
    </div>
    <div id="line3">
        <div id="content">
            <ul>
                <li><a href="#">首页</a></li>
                <li><a href="#">全部商品</a></li>
                <li><a href="#">手机数码</a></li>
                <li><a href="#">电脑平板</a></li>
                <li><a href="#">家用电器</a></li>
                <li><a href="#">汽车用品</a></li>
                <li><a href="#">食品饮料</a></li>
                <li><a href="#">图书杂志</a></li>
                <li><a href="#">服装服饰</a></li>
                <li><a href="#">理财产品</a></li>
            </ul>
        </div>
    </div>
</div>