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
let $ghost = $('<img class="ghost" src=""></img>');
let voices = [


"Hungarian Female",
"Turkish Female",


"Norwegian Female",

"Australian Female",

"Arabic Male",


"Danish Female",


"Polish Female",

"Portuguese Female",

"Thai Female",
"Vietnamese Male"

];
let goodVoice;
let rng;
let $lights;
let light1 = "assets/images/light1.png";
let light2 = "assets/images/light2.png";
let flickInterval;
let hintInterval;
//stackoverflow.com/questions/3385936/jquery-follow-the-cursor-with-a-div

 $(document).ready(function(){
    $avatar = $("#avatar");
    $left = $("#left");
    $up = $("#up");
    $right = $("#right");
    $down = $("#down");
    $lights = $(".light");
   $avatar.hide();
   $("#zones").hide();
   $("#start").hover(function(){$("#start").css({cursor: "pointer"}) });

   $("#start").on('click', function(){
     $("#start").remove();
     startGame();
   })

   $(document).mousemove(function(e){

       $mouseX = e.pageX-10;
       $mouseY = e.pageY-10;
   });

   ////voice text

   // $('html').on('click',function(){
   //   let options = {
   //     pitch: 0.1,
   //     rate: 0.8,
   //     volume: 0.4
   //   };
   //
   //     responsiveVoice.speak("left up right down","Vietnamese Male",options);
   // });


  });


function startGame(){
  $avatar.fadeIn();
  $('html').css({cursor:"none"});
  point=5;
  goodVoice = voices[Math.floor(Math.random() * voices.length)];
  console.log(goodVoice);
  newRound();
  update();

}




function update(){
  let $loop = setInterval(function(){
  // change 12 to alter damping higher is slower
  $xp += (($mouseX - $xp)/12);
  $yp += (($mouseY - $yp)/12);
  $("#avatar").css({left:$xp +'px', top:$yp +'px'});
  }, 20);




$ghost.attr("src","assets/images/ghost1.png");
$avatar.append($ghost);


//
// $left.hover(function(){
// });
//
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

  if($(this).attr("id")===correctGuess){
      console.log('correct');
      point++;

      console.log(point);
      clearInterval(flickInterval);
      clearInterval(hintInterval);

      if(point>=10){
        gameWon();
        console.log("u won bro");
      }
      $('body').append($points);
        if($(this).attr("id")==="left"){
          $(this).attr('src',"assets/images/blueLight1.png");
          $("#zones").delay(500).animate({left: '100%'},{ duration: 500}).fadeOut().animate({left: '0%'},{ duration: 100});
        }if($(this).attr("id")==="up"){
          $(this).attr('src',"assets/images/blueLight1.png");
          $("#zones").delay(500).animate({top: '100%'},{ duration: 500}).fadeOut().animate({top: '0%'},{ duration: 100});
        }if($(this).attr("id")==="right"){
          $(this).attr('src',"assets/images/blueLight1.png");
          $("#zones").delay(500).animate({left: '-100%'},{ duration: 500}).fadeOut().animate({left: '0%'},{ duration: 100});
        }if($(this).attr("id")==="down"){
          $(this).attr('src',"assets/images/blueLight1.png");
          $("#zones").delay(500).animate({top: '-100%'},{ duration: 500}).fadeOut().animate({top: '0%'},{ duration: 100});
        }
        if(point<10){
          setTimeout(newRound,1000);
        }

    }else{
        $(this).attr('src',"assets/images/redLight1.png");
      point--;
      console.log(point);
      if(point<=0){
        gameOver();
        console.log("u ded bro");
      }
      // $(this).effect('shake');
    }
  });



  // $points.text("points: "+point);
  // $('body').append($points);
}


function flicker(){
  if($lights.attr('src')===light1 ){
        $lights.attr('src',light2);
    } else{
      $lights.attr('src',light1);
    }
}




function newRound(){
  $("#zones").fadeIn();
flickInterval = setInterval(flicker,500);
correctGuess = guess[Math.floor(Math.random() * guess.length)];
console.log(correctGuess);
  hintInterval = setInterval(hint,1000);




}



function hint(){
  let randomVoice = voices[Math.floor(Math.random() * voices.length)];
  let randomDirect = guess[Math.floor(Math.random() * guess.length)];
  let options = {
    pitch: 0.15,
    rate: 0.9,
    volume: 0.4
  };

    rng=Math.random();
    console.log(rng);

  if(rng>= 0.7){
    responsiveVoice.speak(correctGuess,goodVoice,options);

  }else{
    responsiveVoice.speak(randomDirect,randomVoice,options);
  }

}

function gameOver(){
    $("#zones").fadeOut(500);
    $("#end").delay(1200).fadeIn(1000);

}
function gameWon(){
    $("#zones").fadeOut(500);
    $("#zoneWon").delay(1200).fadeIn(1000);

}
