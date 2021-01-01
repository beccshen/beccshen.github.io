function nohover(x, y){
    x.style.opacity = 1;
    document.getElementById(y).style.visibility = 'hidden';
}

function yeshover(x, y) {
  x.style.opacity = 0.5;
  document.getElementById(y).style.visibility = 'visible';
}


$(document).ready(function(){

  x = document.getElementById("about");
  $(".btn1").hide();
  $(".btn2").show();
  
$(".btn1").click(function(){ //click hide
  $(x).slideUp();
  $(".btn1").hide();
  $(".btn2").show();
});
$(".btn2").click(function(){ //click show
  $(x).slideDown(800, "swing");
  $(".btn2").hide();
  $(".btn1").show();
  
});

});