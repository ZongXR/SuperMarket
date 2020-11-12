$(function () {
    //给验证码图片注册事件
    /*$("#vcode").click(
            function() {
                // $(this).attr("src","/VerifyCodeServlet?"+Math.random());
                $(this).attr("src",
                        "user_ajax/verifyCode?" + new Date().toLocaleString());
            });*/

    /**
     * 用户名输入框离焦事件
     */
    $("input[name=username]").blur(
        function () {
            let userName = $(this).val();
            if (!formObj.checkNull("username", "用户名不能为空")) {
                setMsg("username", "用户名不能为空");
            } else {
                $.ajax({
                    url: "/user/checkUserName",
                    type: "post",
                    data: {"userName": userName},
                    dataType: "json",
                    success: function (result) {
                        if (result.status === 201) {
                            // 用户名重复
                            $("#username_msg").text(result.msg);
                        } else if (result.status === 200){
                            // 用户名可用
                            $("#username_msg").text(result.msg).css("color", "green");
                        }else{
                            // 其他异常
                            alert(result.msg);
                        }
                    },
                    error: function () {
                        alert("请求失败！");
                    }
                });
            }
        });

    /**
     * 提交按钮的submit事件
     */
    $("form").submit(function () {
        return register();
    });
    function setMsg(name, msg) {
        $("#" + name + "_msg").text(msg);
    }
});

function register() {
    let userName = $("form input[name=username]").val();
    let userPassword = $("form input[name=password]").val();
    let userPassword2 = $("form input[name=password2]").val();
    let userNickName = $("form input[name=nickname]").val();
    let userEmail = $("form input[name=email]").val();
    //var vcode=$("form input[name=valistr]").val();
    let flag = formObj.checkForm();
    if (flag) {
        $.ajax({
            url: "/user/save",
            type: "post",
            data: {
                "userName": userName,
                "userPassword": userPassword,
                "userPassword2": userPassword2,
                "userNickname": userNickName,
                "userEmail": userEmail,
            },
            dataType: "json",
            success: function (result) {
                if (result.status === 200) {
                    // 注册成功
                    window.location.href = "./regist_success.html";
                }else if (result.status === 201){
                    // 后端校验出错
                    $("#alert").text(result.msg);
                } else {
                    alert(result.msg);
                }
            },
            error: function () {
                alert("请求失败！");
            }
        });
    }
    return false;
}

var formObj = {
    checkForm: function () {
        let flag = true;
        // 非空验证
        flag = this.checkNull("username", "用户名不能为空!");
        flag = this.checkNull("password", "密码不能为空") && flag;
        flag = this.checkNull("password2", "确认密码不能为空") && flag;
        flag = this.checkNull("nickname", "昵称不能为空") && flag;
        flag = this.checkNull("email", "邮箱不能为空") && flag;
        //flag = this.checkNull("valistr", "验证码不能为空") && flag;
        // 两次输入的密码是否相同
        flag = this.checkPassword("password", "两次密码不相同") && flag;
        // 邮箱格式
        flag = this.checkEmail("email", "邮箱格式不正确") && flag;
        // 返回flag
        return flag;
    },
    checkNull: function (name, msg) {
        let value = $("input[name=" + name + "]").val();
        if ($.trim(value) === "") {
            this.setMsg(name, msg);
            return false;
        }
        return true;
    },
    checkPassword: function (name, msg) {
        let pwd = $("input[name=" + name + "]").val();
        let pwd2 = $("input[name=" + name + "2]").val();
        if ($.trim(pwd) !== "" && $.trim(pwd2) !== "") {
            if (pwd !== pwd2) {
                this.setMsg(name, msg);
                return false;
            }
        }
        return true;
    },
    checkEmail: function (name, msg) {
        let value = $("input[name=" + name + "]").val();
        let reg = /^\w+(\.\w+)*@\w+(\.\w+)+$/;
        if (!reg.test(value)) {
            this.setMsg(name, msg);
            return false;
        }
        return true;
    },
    setMsg: function (name, msg) {
        $("#" + name + "_msg").text(msg);
    }
};