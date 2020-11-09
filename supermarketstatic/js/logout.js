function logout(){
    $.ajax({
       url:"http://www.easymall.com/user/logout",
       dataType:"json",
       type:"GET",
       success:function (data) {
           if(data.status==200){
               window.location.href="http://www.easymall.com/";
               return;
           }else{
               alert("登出失败");
               return;
           }
       },
       erro:function () {
           alert("登出请求发送失败");
       }
    });
}