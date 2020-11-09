<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
  <head>
    <title>我的订单</title>
    <link href="${app}/css/orderList.css" rel="stylesheet" type="text/css">
</head>
<body style="text-align:center;">
<%@include file="/head.jsp" %>
<c:forEach items="${orderList}" var="order">
		<dl class="Order_information">
			<dt>
				<h3>订单信息</h3>
			</dt>
			<dd>
				订单编号：${order.orderId }<br />
				 下单时间：${order.orderTime }<br /> 
				 订单金额：${order.orderMoney }<br /> 
				 支付状态：
				 <c:if test="${order.orderPaystate==0 }" var="flag">
						<font color="red">未支付</font>&nbsp;&nbsp;&nbsp;
						<a href="${app}/order/deleteOrder/${order.orderId}"><img src="${app}/img/orderList/sc.jpg" width="69" height="19"></a> 
				 		<a href="${app}/pay.jsp?id=${order.orderId}&money=${order.orderMoney}"> <img src="${app}/img/orderList/zx.jpg" width="69" height="19"></a><br /> 
				 </c:if>
				 <c:if test="${!flag }">
						<font color="blue">已支付</font><br/>
				 </c:if>
				 收货地址：${order.orderReceiverinfo }<br/> 
				支付方式：在线支付
			</dd>
		</dl>
		<table width="1200" border="0" cellpadding="0"
			cellspacing="1" style="background:#d8d8d8;color:#333333">
			<tr>
				<th width="276" height="30" align="center" valign="middle" bgcolor="#f3f3f3">商品图片</th>
				<th width="247" align="center" valign="middle" bgcolor="#f3f3f3">商品名称</th>
				<th width="231" align="center" valign="middle" bgcolor="#f3f3f3">商品单价</th>
				<th width="214" align="center" valign="middle" bgcolor="#f3f3f3">购买数量</th>
				<th width="232" align="center" valign="middle" bgcolor="#f3f3f3">小计</th>
			</tr>
		<c:set var="money" value="0"/>
		<c:forEach items="${order.orderItems}" var="product">
			<tr>
				<td align="center" valign="middle" bgcolor="#FFFFFF">
					<img src="${app}/${product.productImage }" width="90" height="105">
				</td>
				<td align="center" valign="middle" bgcolor="#FFFFFF">${product.productName}</td>
				<td align="center" valign="middle" bgcolor="#FFFFFF">${product.productPrice}元</td>
				<td align="center" valign="middle" bgcolor="#FFFFFF">${product.productName}件</td>
				<td align="center" valign="middle" bgcolor="#FFFFFF">${product.productPrice*product.num}元</td>
			</tr>
			<c:set var="money" value="${money+product.productPrice*product.num}"/>
		</c:forEach>
		</table>
		<div class="Order_price">${money}元</div>
</c:forEach>
<div>
	<!-- 分页条开始 -->
	<c:if test="${requestScope.page.totalPage>1}">
		  【${page.currentPage}/${page.totalPage}】
		  <!-- 前第一页情形 -->
		  <a href="${app}/order/list/${page.previousPage}">前一页</a>
		  	
		  <!-- 中间的超链接-->
		  <c:forEach var="pageNum" items="${page.aNum}">
		  	<a href="${app}/order/list/${pageNum}">${pageNum}</a>
		  </c:forEach>
		  
		  <!-- 后一页情形 -->
		  <a href="${app}/order/list/${page.nextPage}">后一页</a>
	</c:if>
	<!-- 分页条结束 -->
</div>
<%@include file="/foot.jsp" %>
</body>
</html>
