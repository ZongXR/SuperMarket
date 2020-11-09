/* 
* @Author: anchen
* @Date:   2017-09-25 10:14:18
* @Last Modified by:   anchen
* @Last Modified time: 2017-09-28 10:08:36
*/

$(function(){
/* 遮罩层显示 */
    function xianshi(china){
        $(".zhedang").show();
        $(".shouji").show();
        $(".shouji div").show();
        $(".shouji div p").empty();
        $(".shouji div p").append(china);
        $(".shouji span input").hide();
        $(".shouji span input:nth-child(2)").show();
        
    }

    $(".tijiao").click(function(){
        var shopName=$(".main_down div:nth-child(2) label input").val();
        var ico=$(".main .main_down img#photo").attr("src");
        var sel=$(".main .main_down div.selec select").val();
        var textarea=$(".main .main_down textarea").val();
        var textarea1=$(".main .main_down textarea").val().length;

    /* 判断名称 */
        if(shopName==""){
            xianshi("店铺名称不能为空");
            $(".main_down div:nth-child(2) label input").css({
                border: '1px solid #f00'
            });
            return;
        }else{
            $(".main_down div:nth-child(2) label input").css({
                border: '1px solid #DDD'
            });
        }

    /* 判断店铺logo */
        if(ico=="images/shangchuanBg.png"){
            xianshi("店铺logo不能为空");
            $(".main_down div:nth-child(3) img").css({
                border: '1px solid #f00'
            });
            return;
        }else{
            $(".main_down div:nth-child(3) img").css({
                border: '1px solid #DDD'
            });
        }

    /* 判断主营类型 */
        if(sel=="请选择"){
            xianshi("主营类型不能为空");
            $(".main_down div.selec select").css({
                border: '1px solid #f00'
            });
            return;
        }else{
            $(".main_down div.selec select").css({
                border: '1px solid #DDD'
            });
        }

    /* 判断文本框 */
        if(textarea==""){
            xianshi("店铺详情不能为空");
            $(".main_down div:nth-child(4) textarea").css({
                border: '1px solid #f00'
            });
            return;
        }else{
            $(".main_down div:nth-child(4) textarea").css({
                border: '1px solid #DDD'
            });
        }

        if(textarea1>200){
            xianshi("店铺详情文字过多");
            $(".main_down div:nth-child(4) textarea").css({
                border: '1px solid #f00'
            });
            return;
        }else{
            $(".main_down div:nth-child(4) textarea").css({
                border: '1px solid #DDD'
            });
        }

        window.location.href="zizhi.html";
    });

/* 关注我们 */
    $("footer .top span.gzwm").mouseenter(function(){
        $("footer p.zhong").stop(true , true).show(400);
    }).mouseleave(function(){
        $("footer p.zhong").stop(true , true).hide(400);
    });
});