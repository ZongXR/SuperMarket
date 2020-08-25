// 判断是否为空
function isNull(element, msg) {
    let node = $(element);
    if (node.val() === "") {
        // 如果是空
        node.nextAll("span").text(msg).css("color", "red");
        return true;
    } else {
        // 如果非空
        node.nextAll("span").text("");
        return false;
    }
}

// 正则校验
function isRegexValid(element, regex, msg) {
    let node = $(element);
    if (node.val() === "") {
        // 空值
        return false;
    } else if (regex.test(node.val())) {
        // 正则验证通过
        node.nextAll("span").text("");
        return true;
    } else {
        // 正则不通过
        node.nextAll("span").text(msg).css("color", "red");
        return false;
    }
}

// 值相等校验
function isEqual(element1, node2, msg) {
    let node1 = $(element1);
    if (node1.val() === node2.val() && node1.val() !== "" && node2.val() !== "") {
        // 二者相等
        node1.nextAll("span").text("");
        node2.nextAll("span").text("");
        return true;
    } else if (node1.val() === "" || node2.val() === "") {
        // 存在为空的
    } else {
        // 二者不相等，对离焦控件做出提示
        node1.nextAll("span").text(msg).css("color", "red");
        return false;
    }
}

// 刷新验证码
function refreshValistr(element) {
    let time = new Date().getTime();
    $(element).attr("src", "/ValiImgServlet?time=" + time);
}

// 可用性校验
function isAvailable(element, msg1, msg2, path) {
    let node = $(element);
    if (node.val() === "") {
        // 如果没通过非空校验，直接返回false
        node.nextAll("span").text("");
        return false;
    }
    $.ajax({
        "url": path,
        "data": {[node.attr("name")]: node.val()},
        "async": true,
        "type": "POST",
        "success": function (result) {
            if (eval(result)) {
                // 用户名可以使用
                node.nextAll("span").text(msg1).css("color", "#00716d");
            } else {
                // 用户名不可以使用
                node.nextAll("span").text(msg2).css("color", "red");
            }
        }
    });
}