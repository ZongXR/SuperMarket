$(function () {
    var h = $(document).height();
    $(".zhedang").height(h + "px");
    $(".mainZizhi").height(h - 285 + "px");
    console.log(h - 140);

    $(".main_down label input").click(function () {
        $(".main_down p.tishi").hide();
    });
    $(".main_down label.name input").click(function () {
        $(".main_down p.tishi").show();
    });

    /* 点击关闭按钮 */
    $(".shouji span input:nth-child(2)").click(function () {
        $(".zhedang").hide();
        $(".shouji").hide();
        $(".shouji div").hide();
    });

    /* 点击外层阴影 */
    $(".main_down div label input").focus(function () {
        $(this).addClass('active').parent("label").parent("div").siblings().children('label').children('input').removeClass('active');
        $(".main .main_down div label input.dian").removeClass("active");
    });

    $(".main_down div label input").blur(function () {
        $(this).addClass('active').removeClass('active');
        $(".main_down p.tishi").hide();
    });




    /* 遮罩层显示 */
    function xianshi(china, i) {
        $(".zhedang").show();
        $(".shouji").show();
        $(".shouji div").show();
        $(".shouji div p").empty();
        $(".shouji div p").append(china);
        $(".shouji span input").hide();
        $(".shouji span input:nth-child(2)").show();
        $(".main_down div:nth-child(" + i + ") label input").css({
            border: '1px solid #f00'
        });
    }

    /* 图片 */
    function xianshi1(china) {
        $(".zhedang").show();
        $(".shouji").show();
        $(".shouji div").show();
        $(".shouji div p").empty();
        $(".shouji div p").append(china);
        $(".shouji span input").hide();
        $(".shouji span input:nth-child(2)").show();
    }


    /* 手机号码 */
    $(".regist").click(function () {
        var name = $(".main_down div:nth-child(2) label input").val();
        /* 姓名 */
        var chang = $(".main_down div:nth-child(3) label input").val().length;
        /* 手机号 */
        var pass = $(".main_down div:nth-child(4) label input").val().length;
        /* 密码 */
        var chang2 = $(".main_down div:nth-child(5) label input").val().length;
        /* 身份证号 */
        var list = $("input:radio[name='one']:checked").val();

        /* 下拉菜单 */
        var picture = $(".main .main_down .main_downTwo img").attr("src");
        var picture1 = $(".main .main_down .main_downTwo div:nth-child(2) img").attr("src");

        var name = /^[\u4E00-\u9FA5]{1,6}$/;
        /* 姓名 */
        var ret = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        /* 手机号 */
        var pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/;
        /* 密码 */
        var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        /* 15~18位的身份验证 */


        /* 姓名 */
        if (name !== "" || name!==null ) {
            var name = $(".main_down div:nth-child(2) label input").val();
            var name1 = /^[\u4E00-\u9FA5]{1,6}$/;
            /* 姓名 */
            if (name1.test(name)) {
                $(".main_down div:nth-child(2) label input").css({
                    border: '1px solid #E5E5E5'
                });
            } else {
                xianshi("姓名输入错误", 2);
                return;
            }
        } else {
            xianshi("姓名不能为空", 2);
            return;
        }


        /* 手机号码 */
        if (chang == 11) {
            var str = $(".main_down div:nth-child(3) label input").val();
            var ret = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            if (ret.test(str)) {
                $(".main_down div:nth-child(3) label input").css({
                    border: '1px solid #E5E5E5'
                });

            } else {
                xianshi("手机号码输入错误", 3);
                return;
            }
        } else if (chang <= 10 && chang >= 1 || chang >= 12) {
            xianshi("手机号输入有误", 3);
            return;
        } else if (chang === 0 || chang==="") {
            xianshi("手机号不能为空", 3);
            return;
        }

        /*密码*/
        if(pass >= 8 && pass <= 15){

            if(pwd.test($("#password").val())){

                $(".main_down div:nth-child(5) label input").css({
                    border: '1px solid #E5E5E5'
                });
            } else {
                xianshi("密码输入错误", 4);
                return;
            }
        }else {
            xianshi("密码应为8-15位", 4);
            return;
        }



        /* 验证身份证 */
        if (chang2 == 18) {
            var str1 = $(".main_down div:nth-child(5) label input").val();
            var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            /* 15~18位的身份验证 */
            if (isIDCard1.test(str1)) {
                $(".main_down div:nth-child(5) label input").css({
                    border: '1px solid #E5E5E5'
                });
            } else {
                xianshi("身份证号码输入错误", 5);
                return;
            }
        } else if (chang <= 17 && chang >= 1 || chang >= 19) {
            xianshi("身份证号输入有误", 5);
            return;
        } else if (chang <= 0) {
            xianshi("身份证号不能为空", 5);
            return;
        }

        /* 照片 */
        if (picture === "images/shangchuanBg.png") {
            xianshi1("身份证正面图片不能为空");
            return;
        }

        if (picture1 === "images/shangchuanBg.png") {
            xianshi1("身份证反面图片不能为空");
            return;
        }

        /* 正确弹出 */
        $(".zhedang").show();
        $(".shouji").show();
        $(".shouji div").show();
        $(".shouji div p").empty();
        $(".shouji div p").append("您输入的姓名将会绑定店铺提现账户名，且不能更改，确认您的姓名是否正确？");
        $(".shouji span input").show();
        $(".shouji span input:nth-child(2)").hide();


    });

    /* 点击取消 */
    $(".shouji input:last-child").click(function () {
        $(".shouji div").hide();
        $(".zhedang").hide();
        $(".shouji").hide();
    });

    var imgurl1;
    var imgurl2;
    /* 点击确定 */
    $(".shouji input:first-child").click(function () {


        imgurl1=imgUpload("imgOne");
        imgurl2=imgUpload("imgOne1");

        $.ajax({
            type: 'POST',
            data: {
                vdrName: $("#name").val(),
                vdrMobile: $("#phone").val() ,
                vdrPwd: $("#password").val(),
                vdrIdNumber:$("#idNumber").val(),
                vdrIdNumberFrontPhoto:imgurl1,
                vdrIdNumberBackPhoto:imgurl2
            },

            dataType: 'json',
            url: 'http://web.ecshop.com/doVendorsRegist',

            success: function (a) {
                if(a.success===true){
                              alert(imgurl1)
                    alert("发送成功");
                }
                alert(a.msg)

            },
            // error: function (e) {
            //     // alert($("#name").val()+"-----"+ $("#phone").val()+"--------"+$("#password").val()+"===="+$("#idNumber").val()+"====="+$("#imgOne").val()+"==="+$("#imgOne1").val())
            //     alert(e.msg);
            //     alert("发送失败");
            //
            // }
        });
        function imgUpload(sourceId) {
            var imgurl;
            var formData = new FormData();
            formData.append("pic", document.getElementById(sourceId).files[0]);
            $.ajax({
                type: "POST",
                url:  'http://web.ecshop.com/uploadImg',
                data: formData,
                async: false,
                processData: false,
                contentType: false,
                success : function (a) {
                    if(a){
                        imgurl=a;
                    }else{
                        alert("发送失败 ")
                    }
                }
            });
            return imgurl;
        }

        // window.location.href = "shoppingDetail.html";
    });


});
