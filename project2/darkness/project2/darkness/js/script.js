"use strict";

let $mouseX = 0, $mouseY = 0;
let $xp = 0, $yp =0;
let $avatar;
let $left;
let $up;
let $right;
let $down;
let correctGuess;
let point;
let guess = ["left","up","right","down"];
let $points = $('<div class="points"></div>');
let voices = [
"UK English Female",
"UK English Male",
"US English Female",
"Spanish Female",
"French Female",
"Deutsch Female",
"Italian Female",
"Greek Female",
"Hungarian Female",
"Turkish Female",
"Russian Female",
"Dutch Female",
"Swedish Female",
"Norwegian Female",
"Japanese Female",
"Korean Female",
"Chinese Female",
"Hindi Female",
"Serbian Male",
"Croatian Male",
"Bosnian Male",
"Romanian Male",
"Catalan Male",
"Australian Female",
"Finnish Female"
];
let goodVoice;
let rng;
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
     startGame();
   })

   $(document).mousemove(function(e){

       $mouseX = e.pageX-10;
       $mouseY = e.pageY-10;
   });
  });


function startGame(){
  // $avatar.fadeIn();
  // $('html').css({cursor:"none"});
  point=5;
  goodVoice = voices[Math.floor(Math.random() * voices.length)];
  console.log(goodVoice);
  update();
  newRound();
}




function update(){
  let $loop = setInterval(function(){
  // change 12 to alter damping higher is slower
  $xp += (($mouseX - $xp)/12);
  $yp += (($mouseY - $yp)/12);
  $("#avatar").css({left:$xp +'px', top:$yp +'px'});
  }, 20);


  setInterval(hint,Math.floor(Math.random() * 5000));
  // setInterval(function(){
  // },Math.floor(Math.random() * 2000) );



// $left.hover(function(){
//   console.log("onLeft!");
// });
// $up.hover(function(){
//   console.log("onUp!");
// });
// $right.hover(function(){
//   console.log("onRight!");
// });
// $down.hover(function(){
//   console.log("onDown!");
// });





$(".light").on('click',function(){
  if($(this).text()===correctGuess){
      console.log('correct');
      point++;
      console.log(point);
      $('body').append($points);
      setTimeout(newRound,1000);
    }else{
      point--;
      console.log(point);
      $(this).effect('shake');
    }
  });
  $points.text("points: "+point);
$('body').append($points);
}


function newRound(){
correctGuess = guess[Math.floor(Math.random() * guess.length)];
console.log(correctGuess);
}

function hint(){
  let randomVoice = voices[Math.floor(Math.random() * voices.length)];
  let randomDirect = guess[Math.floor(Math.random() * guess.length)];
  let options = {
    pitch: 0.2,
    rate: 1
  };

    rng=Math.random();
    console.log(rng);

  if(rng>= 0.7){
    responsiveVoice.speak(correctGuess,goodVoice);

  }else{
    responsiveVoice.speak(randomDirect,randomVoice,options);
  }

}

//
// function addCall(label){
//   let $callBox = $('<div class="callBox"></div>');
//   $callBox.text(label);
//   $('body').append($callBox);
// }
