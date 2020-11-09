<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
  <head>
    <title>全部商品</title>
 	<link href="${app}/css/prodList.css" rel="stylesheet" type="text/css">
</head>
<body>
<%@include file="/head.jsp" %>
	<div id="content">
		<div id="search_div">
			<%-- <form method="post" action="${app}/product/page/">
			    <input type="hidden" name="currentPage" value="1"/>
				<span class="input_span">商品名：<input type="text" name="productName" value="${requestScope.productName}"/></span>
				<span class="input_span">商品种类：<input type="text" name="productCategory" value="${requestScope.productCategory}"/></span>
				<span class="input_span">商品价格区间：<input type="text" name="minPrice" value="${requestScope.minPrice}"/> - <input type="text" name="maxPrice" value="${requestScope.maxPrice}"/></span>
				<input type="submit" value="查询">
			</form> --%>
		</div>
		<!-- 显示分页数据开始部分 -->
		<c:if test="${page.totalPage>0}">
		<div id="prod_content">			
				
			    <c:forEach items="${page.products}" var="product">
					<div id="prod_div">
					<a href="/web/item/${product.productId}">
						<img src="${product.productImgurl}"></img>
					</a>
					<div id="prod_name_div">
					<a href="/web/item/${product.productId}">
							${product.productName}
					</a>
						</div>
						<div id="prod_price_div">
							￥${product.productPrice}元
						</div>
						<div>
							<div id="gotocart_div">
								<a href="${app}/cart/addCart/${product.productId}/1">加入购物车</a>
							</div>					
							<div id="say_div">
								库存${product.productNum}
							</div>					
						</div>
					</div>
				</c:forEach>
		</div>
		<div style="clear:both"></div>
		</c:if>	
		<!-- 显示分页数据结束部分 -->
		<!-- 分页开始 -->
		<div id="spulist-pager">
			<!-- 分页条1开始 -->
			<div id="spulist-pager">
			      <!-- 分页条1开始 -->
				  <div class="pager1">
				  <span>				  	    
						    【${page.currentPage}/${page.totalPage}】
						  </span>
				 <%--  	<c:if test="${requestScope.page.totalPage>1}"> --%>
                          
						  <!-- 第一页情形 -->
						  <c:if test="${page.currentPage eq 1}">
						    <a href="${app}/product/page/?currentPage=2&rows=5">下一页</a>
						  	<a href="${app}/product/page/?currentPage=${page.totalPage}&rows=5">尾页</a>
						  </c:if>
						  <!-- 非第一页也非最后一页-->
						  <c:if test="${page.currentPage>1 and page.currentPage<page.totalPage}">
						  	<a href="${app}/product/page/?currentPage=1&rows=5">首页</a>
						  	<a href="${app}/product/page/?currentPage=${page.currentPage-1}&rows=5">上一页</a>
						  	<a href="${app}/product/page/?currentPage=${page.currentPage+1 }&rows=5">下一页</a>
						  	<a href="${app}/product/page/?currentPage=${page.totalPage}&rows=5">尾页</a>
						  </c:if>
						  <!-- 最后一页情形 -->
						  <c:if test="${page.currentPage==page.totalPage}">
						  	<a href="${app}/product/page/?currentPage=1&rows=5">首页</a>
						  	<a href="${app}/product/page/?currentPage=${page.currentPage-1}&rows=5">上一页</a>
						  </c:if>
					
				  	
				  </div>	
				  <!-- 分页条1结束 -->
				  <!-- 分页条2开始 -->	
				  
				  <!-- 分页条2结束 -->
			</div>
			
		</div>
		<!-- 分页结束 -->
		<c:if test="${requestScope.size<=0}">
			    没有符合条件的数据,请更换查询条件
	    </c:if>
	</div>
<%@include file="/foot.jsp" %>
</body>
</html>
