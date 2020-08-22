<%@ page import="com.supermarket.utils.WebUtils" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-type" content="text/html; charset=UTF-8"/>
    <meta name="keywords" content="网上商城, 电商平台, 能源互联网">
    <meta name="description" content="能源互联网, 网上商城, 电商平台, 电子商务, 掌上e宝, 科技金服, 不正经网站研究中心">
    <link rel="icon" type="image/x-icon" href="${pageContext.request.contextPath}/img/index/icon.ico" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/index.css"/>
    <title>网上商城-能源工业云平台_国电网商|网上金融科技|电子金服</title>
    <noscript>抱歉，你的浏览器不支持 JavaScript!</noscript>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.4.2.js"></script>
</head>
<body>
<%@include file="_head.jsp" %>
<div class="fixed">
    <%--用于右下角的漂浮显示--%>
    <a href="https://github.com/GoogleLLP/SuperMarket" target="_blank">
        <img src="${pageContext.request.contextPath}/img/index/qr.jpg" width="100"/>
    </a>
    <a href="#common_head" class="toTop"></a>
</div>
<div id="index">
    <div id="line1">
        <img src="${pageContext.request.contextPath}/img/index/banner_big.jpg"/>
    </div>
    <div id="line2">
        <img id="line2_1" src="${pageContext.request.contextPath}/img/index/adv1.jpg"/>
        <img id="line2_2" src="${pageContext.request.contextPath}/img/index/adv2.jpg"/>
        <img id="line2_3" src="${pageContext.request.contextPath}/img/index/adv_l1.jpg"/>
    </div>
    <div id="line3">
        <img id="line3_1" src="${pageContext.request.contextPath}/img/index/adv3.jpg"/>
        <img id="line3_2" src="${pageContext.request.contextPath}/img/index/adv4.jpg"/>
        <div id="line3_right">
            <img id="line3_3" src="${pageContext.request.contextPath}/img/index/adv_l2.jpg"/>
            <img id="line3_4" src="${pageContext.request.contextPath}/img/index/adv_l3.jpg"/>
        </div>
    </div>
    <div id="line4">
        <img src="${pageContext.request.contextPath}/img/index/217.jpg"/>
    </div>
    <div id="line5">
        <span id="line5_1">
            <img src="${pageContext.request.contextPath}/img/index/icon_g1.png"/>&nbsp;&nbsp;500强企业 品质保证
        </span>
        <span id="line5_2">
            <img src="${pageContext.request.contextPath}/img/index/icon_g2.png"/>&nbsp;&nbsp;7天退货 15天换货
        </span>
        <span id="line5_3">
            <img src="${pageContext.request.contextPath}/img/index/icon_g3.png"/>&nbsp;&nbsp;100元起免运费
        </span>
        <span id="line5_4">
            <img src="${pageContext.request.contextPath}/img/index/icon_g4.png"/>&nbsp;&nbsp;448家维修网点 全国联保
        </span>
    </div>
</div>
<%@include file="_foot.jsp" %>
</body>
</html>
