function change(n) {
    var amount = parseInt($("#buyNumInp").val());
    if(amount<=1 && n<0) {
      return;
    }
    
    $("#buyNumInp").val(amount + n);
}


