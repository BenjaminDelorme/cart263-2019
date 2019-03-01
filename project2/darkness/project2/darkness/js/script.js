"use strict";

let $mouseX = 0, $mouseY = 0;
let $xp = 0, $yp =0;
let $avatar;
let $left;
let $up;
let $right;
let $down;
//stackoverflow.com/questions/3385936/jquery-follow-the-cursor-with-a-div

 $(document).ready(function(){
    $avatar = $("#avatar");
    $left = $("#left");
    $up = $("#up");
    $right = $("#right");
    $down = $("#down");
   $avatar.hide();
   $("#start").hover(function(){$("#start").css({cursor: "pointer"}) });
   $("#start").on('click', function(){
     $("#start").remove();
     $avatar.fadeIn();
     $('html').css({cursor:"none"});
   })

   $(document).mousemove(function(e){
       $mouseX = e.pageX-10;
       $mouseY = e.pageY-10;
   });
   update();
  });





function update(){
  let $loop = setInterval(function(){
  // change 12 to alter damping higher is slower
  $xp += (($mouseX - $xp)/12);
  $yp += (($mouseY - $yp)/12);
  $("#avatar").css({left:$xp +'px', top:$yp +'px'});
  }, 20);

$left.hover(function(){
  console.log("onLeft!");
});
$up.hover(function(){
  console.log("onUp!");
});
$right.hover(function(){
  console.log("onRight!");
});
$down.hover(function(){
  console.log("onDown!");
});

}

function addCall(label){
  let $callBox = $('<div class="callBox"></div>');
  $callBox.text(label);
  $('body').append($callBox);
}
