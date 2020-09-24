/**
 * 非空校验，只用于旧版浏览器。新版浏览器使用html5的require属性
 * @param element 校验的元素
 * @param msg 提示信息
 * @returns {boolean} 是否为空
 */
function isNull(element, msg) {
    let node = $(element);
    if ($.trim(node.val()) === "") {
        // 如果是空
        node.nextAll("span").text(msg).css("color", "red");
        return true;
    } else {
        // 如果非空
        node.nextAll("span").text("");
        return false;
    }
}

/**
 * 正则校验，只用于旧版浏览器。新版浏览器用html5的pattern属性
 * @param element 校验的元素
 * @param regex 正则表达式
 * @param msg 提示信息
 * @returns {boolean} 是否满足正则
 */
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

/**
 * 刷新验证码
 * @param element img标签元素
 */
function refreshValistr(element) {
    let time = new Date().getTime();
    $(element).attr("src", "/valicode/valistr.action?time=" + time);
}

/**
 * ajax可用性校验
 * @param element 校验的元素
 * @param msg1 校验通过的提示信息
 * @param msg2 校验没通过的提示信息
 * @param path ajax路径
 * @returns {boolean} 是否可用
 */
function isAvailable(element, msg1, msg2, path) {
    let node = $(element);
    node.attr("oninvalid", "this.setCustomValidity('hhhh')");
    node.attr("oninput", "this.setCustomValidity('')");
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

/**
 * 判断是否支持html5新属性
 * @param tagName 标签名
 * @param attrName 属性名
 * @returns {boolean} 是否支持
 */
function supportHtml5(tagName, attrName) {
    let elem = document.createElement(tagName);
    return attrName in elem;
}

/**
 * 清除提示消息
 * @param element 元素
 */
function clearMsg(element){
    let node = $(element);
    node.nextAll("span").text("");
}