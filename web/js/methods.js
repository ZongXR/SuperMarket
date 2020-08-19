// 判断是否为空
function isNull(element, msg) {
    let node = $(element);
    if (node.val() === ""){
        // 如果是空
        node.nextAll("span").text(msg).css("color", "red");
        return true;
    }else{
        // 如果非空
        node.nextAll("span").text("");
        return false;
    }
}

// 刷新验证码
function refreshValistr(element){
    let time = new Date().getTime();
    $(element).attr("src", "/ValiImgServlet?time=" + time);
}