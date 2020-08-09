function refreshValistr(element){
    let time = new Date().getTime();
    $(element).attr("src", "/ValiImgServlet?time=" + time);
}