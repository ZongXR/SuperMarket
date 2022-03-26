<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
  <head>
    <title>订单添加页</title>
 	<link href="${app }/css/addOrder.css" rel="stylesheet" type="text/css">
</head>
<body>
<%@include file="/head.jsp" %>
	<div class="warp">
		<form name="form1" method="post" action="${app}/order/addOrder">
			<h3>增加订单</h3>
			<div id="forminfo">
				<span class="lf">收货地址：</span> <label for="textarea"></label>
				<textarea name="orderReceiverinfo" id="textarea" cols="45" rows="5"></textarea>
				<br> 支付方式：<input name="" type="radio" value="" checked="checked">&nbsp;在线支付
			</div>
			<table width="1200" height="80" border="1" cellpadding="0" cellspacing="0" bordercolor="#d8d8d8">
				<tr>
					<th width="276">商品图片</th>
					<th width="247">商品名称</th>
					<th width="231">商品单价</th>
					<th width="214">购买数量</th>
					<th width="232">小计</th>
				</tr>
		<c:set var="money" value="0"/>
		<c:forEach items="${cartList}" var="cartItem" varStatus="status">
				<tr>
					<input type="hidden" name="orderItems[${status.index}].productImage" value="${cartItem.productImage}"/>
					<td><img src="${cartItem.productImage}" width="90" height="90" /></td>
					<input type="hidden" name="orderItems[${status.index}].productId" value="${cartItem.productId}"/>
					<td>${cartItem.productName}</td>
					<input type="hidden" name="orderItems[${status.index}].productName" value="${cartItem.productName}"/>
					<td>${cartItem.productPrice}元</td>
					<input type="hidden" name="orderItems[${status.index}].productPrice" value="${cartItem.productPrice}"/>
					<td>${cartItem.num}件</td>
					<input type="hidden" name="orderItems[${status.index}].num" value="${cartItem.num}"/>
					<td>${cartItem.productPrice*cartItem.num}元</td>
					<c:set var="money" value="${money+cartItem.productPrice*cartItem.num}"/>
				</tr>
		</c:forEach>
			<input type="hidden" name="orderMoney" value="${money }"/>
			</table>
			<div class="Order_price">总价：${money }元</div>
			<div class="add_orderbox">
				<input name="" type="submit" value="增加订单" class="add_order_but">
			</div>
		</form>
	</div>
<%@include file="/foot.jsp" %>
</body>
</html>
