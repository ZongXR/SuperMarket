function logout(){
    $.ajax({
       url:"http://www.supermarket.com/user/logout",
       dataType:"json",
       type:"GET",
       success:function (data) {
           if(data.status===200){
               window.location.href="http://www.supermarket.com/";
           }else{
               alert("登出失败");
           }
       },
       error:function () {
           alert("登出请求发送失败");
       }
    });
}