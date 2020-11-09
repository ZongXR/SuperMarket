<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="/js/jquery.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script
	src="/js/bootstrap.min.js"></script>
<head>
<title>秒杀列表页面</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- 引入 Bootstrap -->
<link
	href="/css/seckill.css"
	rel="stylesheet">
</head>

<body>

  <!-- 页面显示部分 -->
  <div class="container">
    <div class="panel header-default">
      <div class="panel-heading text-center">
        <h1>秒杀商品列表</h1>
      </div>
      <div class="panel-body">
        <table class="table table-hover">
          <thead>
            <tr class="danger">
              <th>名称</th>
              <th>库存</th>
              <th>原价</th>
              <th>秒杀价</th>
              <th>商品卖点</th>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>商品详情页</th>
            </tr>
          </thead>
          <tbody>
            <c:forEach var="sk" items="${list}">
              <tr class="success">
                <td>${sk.name}</td>
                <td>${sk.number}</td>
                <td>${sk.initialPrice}</td>
                <td>${sk.seckillPrice}</td>
                <td>${sk.sellPoint}</td>
                <td>
                  <fmt:formatDate value="${sk.startTime}" pattern="yyyy-MM-dd HH:mm:ss"/>
                </td>
                <td>
                  <fmt:formatDate value="${sk.endTime}" pattern="yyyy-MM-dd HH:mm:ss"/>
                </td>
                <td>
                  <a class="btn btn-primary btn-md" href="/seckill/${sk.seckillId}/detail" target="_blank">详情页面</a>
                </td>
              </tr>
            </c:forEach>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</body>

</html>