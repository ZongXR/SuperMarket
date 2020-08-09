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