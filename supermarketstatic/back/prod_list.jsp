<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
<head>
<style type="text/css">
body {
	background: #F5F5F5;
	text-align: center;
}

table {
	text-align: center;
	margin: 0px auto;
}

th {
	background-color: silver;
}
</style>
<script type="text/javascript" src="${app}/js/jquery-1.4.2.js"></script>
<script type="text/javascript">
$(function(){
	$(".del").click(function(){
		if(confirm("您确定删除吗？")){
			//获取当前删除的商品的id
			var id = $(this).parent().prev().prev().
				children("[type=text]").attr("id");
			//var id = $(this).attr("id");
			//跳转到删除的servlet
			window.location.href="${app}/BackProdDeleteServlet?id="+id;
		}
	});
$("input[name=pnum]").blur(function(){
	//获取输入框中的值
	var val = $(this).val();
	//获取原来的值
	var oldVal = $(this).next().val();
	if(val!=oldVal){//数量被修改
	    var reg = /^[1-9][0-9]*$/;
	    if(reg.test(val)){
	    	//获取商品的id
	    	var id = $(this).attr("id");
	    	//获取隐藏域对应input节点的对象
	    	var $oldPnum = $(this).next();
	    	$.post("${app}/AjaxChangePnumServlet",
	    		{"id":id,"pnum":val},
	    		function(result){
	    			if("true"==result){
	    				alert("商品数量修改成功");
	    				//修改对应隐藏域中的数量
	    				$oldPnum.val(val);
	    			}else{
	    				alert("商品数量修改失败");
	    			}
	    		}
	    	);
	    }else{//不合法
	    	alert("请输入正整数");
	    	$(this).val(oldVal);
	    }
	}
});
});
</script>
</head>
<body>
	<h1>商品管理</h1>
	<a href="${app}/back/manageAddProd.jsp">添加商品</a>
	<hr>
	<table bordercolor="black" border="1" width="95%" cellspacing="0px" cellpadding="5px">
		<tr>
			<th>商品图片</th>
			<th>商品id</th>
			<th>商品名称</th>
			<th>商品种类</th>
			<th>商品单价</th>
			<th>库存数量</th>
			<th>描述信息</th>
			<th>操作</th>
		</tr>
		<c:forEach items="${list }" var="prod">
			<tr>
				<td><img width="120px" height="120px" src="${app}/ProdImgServlet?imgurl=${prod.imgurl}"/></td>
				<td>${prod.id }</td>
				<td>${prod.name }</td>
				<td>${prod.category }</td>
				<td>${prod.price }</td>
				<td>
				<input type="text" name="pnum" id="${prod.id }" value="${prod.pnum }" style="width: 50px"/>
				<input type="hidden" name="oldPnum" value="${prod.pnum}"/>
				</td>
				<td>${prod.description }</td>
				<td><a href="javascript:void(0)" class="del" <%-- id="${prod.id }" --%>>删除</a></td>
			</tr>
		</c:forEach>
	</table>
</body>
</html>
