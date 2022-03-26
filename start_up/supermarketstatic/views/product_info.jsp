<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
  <head>
    <title>商品详情页面</title>
    <link href="${app }/css/prodInfo.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="${app}/js/common/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="${app}/js/productinfo.js"></script>
	
</head>
<body>
<%@include file="/head.jsp" %>
	<div id="warp">
		<div id="left">
			<div id="left_top">
				<img src="${product.productImgurl}"/>
			</div>
			<div id="left_bottom">
				<img id="lf_img" src="${app}/img/prodInfo/lf.jpg"/>
				<img id="mid_img" src="${product.productImgurl}" width="60px" height="60px"/>
				<img id="rt_img" src="${app }/img/prodInfo/rt.jpg"/>
			</div>
		</div>
		<div id="right">
			<div id="right_top">
				<span id="prod_name">${product.productName}<br/></span>
				<br>
				<span id="prod_desc">${product.productDescription }<br/></span>
			</div>
			<div id="right_middle">
				<span id="right_middle_span">
						EasyMall 价：<span class="price_red">￥${product.productPrice }<br/>
			            运     费：满 100 免运费<br />
			            服     务：由EasyMall负责发货，并提供售后服务<br />
			            库     存：${product.productNum }
			            购买数量：
	            <a href="javascript:void(0)" id="delNum" onclick="change(-1)">-</a>
	            <input id="buyNumInp" name="buyNum" type="text" value="1" />
		        <a href="javascript:void(0)" id="addNum" onclick="change(1)">+</a>
			</div>
			<div id="right_bottom">
				<input class="add_cart_but" type="button" onclick="toCart('${app}/cart/addCart/${product.productId}')"/>	
			</div>
		</div>
	</div>
<%@include file="/foot.jsp" %>
</body>
</html>
