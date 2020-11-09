<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
  <head>
    <title>我的购物车</title>
 	<link href="${app}/css/cart.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="${app }/js/common/jquery-1.11.3.min.js"></script>
	<script type="text/javascript">
		$(function(){
			$(".del").click(function(){
				if(confirm("您确定删除吗？")){
					var id = $(this).parent().parent().find("input[class=buyNumInp1]").attr("id");
					window.location.href="${app}/cart/deleteCart/"+id;
				}
			});
			$(".delNum").click(function(){
				//1获取商品的id
				var id = $(this).next().attr("id");
				//2获取输入框中数量
				var num = $(this).next().val();
				//3、计算减1后的值
				num = num-1;
				if(num>0){
					//4、跳转
					window.location.href="${app}/cart/editCart/"+id+"/"+num;
				}else{
					if(confirm("您确认删除吗？")){
						window.location.href="${app}/cart/deleteCart/"+id;
					}
				}
			});
			$(".addNum").click(function(){
				//alert("addmum");
				//1.获取商品id
				var id = $(this).prev().attr("id");
				//2获取输入框中数量
				var num = $(this).prev().val();
				//3计算数量
				num = parseInt(num)+1;
				//alert(id+"   "+num);
				//4跳转
				window.location.href="${app}/cart/editCart/"+id+"/"+num;;
			});
			$(".buyNumInp1").blur(function(){
				//获取输入框中的数量
				var num = $(this).val();
				//获取商品id
				var id = $(this).attr("id");
				//获取隐藏域中的值
				var oldNum = $("#hid_"+id).val();
				//如果num!=oldNum才执行修改操作
				if(num!=oldNum){
					//判断是否为0，
					if(num==0){//执行删除
						window.location.href="${app}/cart/deleteCart/"+id;
					}else if(/^[1-9][0-9]*$/.test(num)){
						//判断输入的数据是否合法
						window.location.href="${app}/cart/editCart/"+id+"/"+num;;
					}else{
						alert("请输入大于等于0的整数！");
						//回显  text() html() attr("..")
						$(this).val(oldNum);
					}
				}
			});
		});
	
	</script>
	</head>
<body>
<%@include file="/head.jsp" %>
	<div class="warp">
	${msg }
		<!-- 标题信息 -->
		<div id="title">
			<input name="allC" type="checkbox" value="" onclick=""/>
			<span id="title_checkall_text">全选</span>
			<span id="title_name">商品</span>
			<span id="title_price">单价（元）</span>
			<span id="title_buynum">数量</span>
			<span id="title_money">小计（元）</span>
			<span id="title_del">操作</span>
		</div>
		<!-- 购物信息 -->
	<c:set var="money" value="0"/>
	<c:forEach items="${cartList}" var="cartItem">
		<div id="prods">
			<input name="prodC" type="checkbox" value=""/>
			<img src="${cartItem.productImage}" width="90" height="90" />
			<span id="prods_name">${cartItem.productName}</span>
			<span id="prods_price">${cartItem.productPrice}</span>
			<span id="prods_buynum"> 
				<input type="hidden" id="hid_${cartItem.productId}" value="${cartItem.num }"/>
				<a href="javascript:void(0)" class="delNum" >-</a>
				<input class="buyNumInp1" id="${cartItem.productId}"  type="text" value="${cartItem.num}" >
				<a href="javascript:void(0)" class="addNum" >+</a>
			</span>
			<span id="prods_money">${cartItem.productPrice*cartItem.num}</span>
			<c:set var="money" value="${money+cartItem.productPrice*cartItem.num}"/>
			<span id="prods_del">
			  <a href="javascript:void(0)" class="del">删除</a>
			</span>
		</div>
	</c:forEach>
		<!-- 总计条 -->
		<div id="total">
			<div id="total_1">
				<input name="allC" type="checkbox" value=""/> 
				<span>全选</span>
				<a id="del_a" href="#">删除选中的商品</a>
				<span id="span_1">总价：</span>
				<span id="span_2">￥${money}</span>
			</div>
			<div id="total_2">	
				<a id="goto_order" href="${app }/order/order-cart">去结算</a>
			</div>
		</div>
	</div>
<%@include file="/foot.jsp" %>
</body>
</html>