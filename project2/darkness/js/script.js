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
let randomVoice;
let randomLaugh;
let randomDirect;
let options;
let music = new Audio('assets/sounds/music.mp3');
let fire = new Audio('assets/sounds/fire.mp3');
let flame = new Audio('assets/sounds/flame.mp3');
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
   //      responsiveVoice.speak("left up right down","Thai Female",options);
   // });


  });


function startGame(){
   music.play();
   music.loop = true;
  fire.play();
  fire.loop=true;
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
setInterval(function(){
  if($ghost.attr('src')==="assets/images/ghost1.png" ){
        $ghost.attr('src',"assets/images/ghost2.png");
    } else{
      $ghost.attr('src',"assets/images/ghost1.png");
    }
},820)

setInterval(function(){
  if($("#girl").attr('src')==="assets/images/ghostFe1.png" ){
        $("#girl").attr('src',"assets/images/ghostFe2.png");
    } else{
      $("#girl").attr('src',"assets/images/ghostFe1.png");
    }
},730)
//

$left.hover(function(){
  $("#goleft").fadeIn();
  },function(){$("#goleft").fadeOut();});

$up.hover(function(){
  $("#goup").fadeIn();
  },function(){$("#goup").fadeOut();});

$right.hover(function(){
  $("#goright").fadeIn();
},function(){$("#goright").fadeOut();});

$down.hover(function(){
  $("#godown").fadeIn();
  },function(){$("#godown").fadeOut();});





$(".light").on('click',function(){

  if($(this).attr("id")===correctGuess){
      console.log('correct');
      point++;
      $(".direction").hide();
      $avatar.fadeOut();
        flame.play();
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
      if(point<10){
        $(this).attr('src',"assets/images/redLight1.png");
      point--;
      }

      console.log(point);
      if(point<=0){
        $avatar.fadeOut();
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
  hintInterval = setInterval(hint,1500);
  $avatar.delay(500).fadeIn(700);




}



function hint(){
   randomVoice = voices[Math.floor(Math.random() * voices.length)];
   randomDirect = guess[Math.floor(Math.random() * guess.length)];
  options = {
    pitch: 0.1,
    rate: 0.8,
    volume: 0.4
  };
    console.log(randomVoice);
    rng=Math.random();
    console.log(rng);

  if(rng>= 0.75){
    responsiveVoice.speak(correctGuess,goodVoice,options);

  }else{
    responsiveVoice.speak(randomDirect,randomVoice,options);
  }

}

function gameOver(){
    $("#zones").fadeOut(500);
    $("#direct").fadeOut(500);
    fire.pause();
    $avatar.delay(500).fadeIn(700);
    $("#end").delay(1200).fadeIn(1000);
    setInterval(laugh,1800);
    clearInterval(hintInterval);
}

function gameWon(){
    $("#zones").fadeOut(500);
    $("#zoneWon").delay(1200).fadeIn(1000);
    flickInterval = setInterval(flicker,500);
    $avatar.fadeIn();
    $("#girl").hover(function(){location.reload();});
}

function laugh(){
  let laughs = ["hihi", "hihihihhh", "hihihih","hhiihi","hihihi","hihihihihi"]
  randomVoice = voices[Math.floor(Math.random() * voices.length)];
  randomLaugh = laughs[Math.floor(Math.random() * laughs.length)];

  options = {
    pitch: 0.07,
    rate: 0.6,
    volume: 0.4
  };

  responsiveVoice.speak(randomLaugh,randomVoice,options);
}
