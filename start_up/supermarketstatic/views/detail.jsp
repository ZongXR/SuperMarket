<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="/js/jquery.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="/js/bootstrap.min.js"></script>
<head>
<title>商品详情页</title>
<style>
	.disappearBtn{
		display:none;
	}
	
	.showBtn{
		display:block;
	}
</style>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- 引入 Bootstrap -->
<link
	href="/css/seckill.css"
	rel="stylesheet">



<script type="text/javascript">
	$(function() {
		$("#seckill-btn").click(function() {
			$.ajax({
				url: '/seckill/${seckill.seckillId}',
				type: 'GET',
				dataType: 'text',
				success: function(result) {
					alert(result);
					console.log(result)
				}
			});
		});
	});
</script>

</head>
<body>
<div class="container">
    <div class="panel panel-default text-center">
        <div class="pannel-heading">
            <h1>${seckill.name}<small>（秒杀价${seckill.seckillPrice}元）</small></h1>
        </div>
        <div class="panel-body"  id="countdown-div">
 			<button type="button" class="btn  btn-lg btn-block btn-danger" id="countdown-btn"></button>
        </div>
        <div class="panel-body disappearBtn"  id="seckill-div">
 			<button type="button" class="btn btn-primary btn-lg btn-block btn-info" id="seckill-btn">开始进入商品秒杀环节</button>
        </div>
        <div id="showSuccess"></div>
    </div>
</div>
</body>
<!-- jQuery countDown倒计时插件 -->
<script src="/js/jquery.countdown.js"></script>

<!-- 计时交互逻辑 -->
<script type="text/javascript">
var startTime = ${seckill.startTime.time};
var endTime = ${seckill.endTime.time};
    $.get('/seckill/time/now',function(nowTime){
            countdown(nowTime,startTime,endTime);
    });


	function countdown(nowTime,startTime,endTime){
		var countdownBtn = $('#countdown-btn');
	    if(nowTime>endTime){
	    	countdownBtn.html('秒杀结束');
	    }else if(nowTime<startTime){

	        var killTime = new Date(startTime);
	        countdownBtn.countdown(killTime,function(event){
	            var format = event.strftime('秒杀倒计时：%D天 %H时 %M分 %S秒');
	            countdownBtn.html(format);
	        }).on('finish.countdown',function(){
	        	//倒计时结束后回调事件
	       	 	$('#countdown-div').addClass('disappearBtn');
	       	 	$('#seckill-div').addClass('showBtn');
	        })
	    }else{
	       //执行秒杀
	   		 $('#countdown-div').addClass('disappearBtn');
	   	 	$('#seckill-div').addClass('showBtn');
	    }
	}

</script>

<script>
    function success(){
    	$.ajax({
			url: '/seckill/${seckill.seckillId}/userPhone',
			type: 'GET',
			dataType: 'json',
			success: function(result) {
				 console.log(result);
				 var i=0;
				 var str ="";
				 for(i=0;i<result.length;i++){
					 str += "非常感谢您参与本次秒杀活动，恭喜手机号为"+result[i]+"的幸运用户${seckill.sellPoint}<br/>";
				 }
				 document.getElementById("showSuccess").innerHTML=str;
			}
		});
    }
    //重复执行success方法；生产环境下不建议使用，很耗费性能
    window.setInterval("success()",1000);
</script>

</html>