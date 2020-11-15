function change(n) {
    let amount = parseInt($("#buyNumInp").val());
    if(amount<=1 && n<0) {
      return;
    }
    $("#buyNumInp").val(amount + n);
}


