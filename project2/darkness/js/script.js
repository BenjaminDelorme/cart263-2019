"use strict";
//Setting up jquery variables
let $mouseX = 0, $mouseY = 0;
let $xp = 0, $yp =0;
let $avatar;
let $left;
let $up;
let $right;
let $down;
let $ghost = $('<img class="ghost" src=""></img>');
let $lights;

//Stting up arrays
let guess = ["left","up","right","down"];
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

//Setting up game functionality variables
let correctGuess;
let point;
let goodVoice;
let rng;
let flickInterval;
let hintInterval;
let randomVoice;
let randomLaugh;
let randomDirect;
let options;

//Setting up sounds and music
let music = new Audio('assets/sounds/music.mp3');
let fire = new Audio('assets/sounds/fire.mp3');
let flame = new Audio('assets/sounds/flame.mp3');
let wrong = new Audio('assets/sounds/screech.mp3');

//When the page load, assign the variables to their Jquery elements and hide everything
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

   //When you click on the text, the game starts
   $("#start").on('click', function(){
     $("#start").remove();
     startGame();
   })
   //Used to follow the mouse position on the page
   // Code found on: stackoverflow.com/questions/3385936/jquery-follow-the-cursor-with-a-div
   $(document).mousemove(function(e){
     $mouseX = e.pageX-10;
     $mouseY = e.pageY-10;
   });
});

//Function to happen once when the game starts
function startGame(){
  //Playing the music and sfx and setting them to loop
  music.play();
  music.loop = true;
  fire.play();
  fire.loop=true;

  $('html').css({cursor:"none"});
  point=5;
  //Selecting the voice in the array that will be the correct voice and removing it from the arrays
  //so it's not an option for the random voices to tell random directions
  goodVoice = voices[Math.floor(Math.random() * voices.length)];
  voices.splice($.inArray(goodVoice, voices),1);
  console.log(goodVoice);

  newRound();
  update();
}



//Function that applies all throughout the game
function update(){

  //Set our ghost character in the avatar div and let this div follow our mouse position
  //  again, code found on: stackoverflow.com/questions/3385936/jquery-follow-the-cursor-with-a-div
  let $loop = setInterval(function(){
  $xp += (($mouseX - $xp)/12);
  $yp += (($mouseY - $yp)/12);
  $("#avatar").css({left:$xp +'px', top:$yp +'px'});
  }, 20);
  $ghost.attr("src","assets/images/ghost1.png");
  $avatar.append($ghost);

  //Animation for our avatar
  setInterval(function(){
  if($ghost.attr('src')==="assets/images/ghost1.png" ){
      $ghost.attr('src',"assets/images/ghost2.png");
    } else{
      $ghost.attr('src',"assets/images/ghost1.png");
    }
  },820)

  //Animation for the girl ghost (at the end)
  setInterval(function(){
  if($("#girl").attr('src')==="assets/images/ghostFe1.png" ){
        $("#girl").attr('src',"assets/images/ghostFe2.png");
    } else{
      $("#girl").attr('src',"assets/images/ghostFe1.png");
    }
  },730)


  //Hover functions for the design: when your avatar hovers on one of the torch, a text showing
  //which direction you're headed
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



//Function for when you click on one of the light(direction)
  $lights.on('click',function(){
    //Things that apply when you click on the good direction
    if($(this).attr("id")===correctGuess){
      //If a correct guess is made, add a point to your score counter, play a flaming sound, remove the avatar
      //and stop the intervals(the one giving hints and the lights flickering)(they will restart next round)
        console.log('correct');
        point++;
        $(".direction").hide();
        $avatar.fadeOut();
        flame.play();
        clearInterval(flickInterval);
        clearInterval(hintInterval);


          //Style and design effect for when you click on on the the directions
          //The light turns blue and the screen goes in that direction
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

        //If you get enough point and win the game, go to win scene
        if(point>=10){
          gameWon();
          console.log("u won bro");
        }
        //else just start a new round
        if(point<10){
          setTimeout(newRound,1000);
        }

    //Things that happen when you don't click on the correct direction
    }else{
        //If you're out of lives(score count goes to 0), go to losing end scene
        if(point<=0){
          $avatar.fadeOut();
          gameOver();
          console.log("u ded bro");
        }
        // Else flash the light in red, remove a point, play the screeching sound wrong and shake the whole screen
        if(point<10){
          $(this).attr('src',"assets/images/redLight1.png");
          point--;
          wrong.play();
          $("body").effect('shake');
        }
    }
  });
}

//Animation for the lights to flicker
function flicker(){
  if($lights.attr('src')==="assets/images/light1.png" ){
        $lights.attr('src',"assets/images/light2.png");
    } else{
      $lights.attr('src',"assets/images/light1.png");
    }
}


//Function called every new round
//Fade in the zone and the character, set a new correct guess, and reset the interval
//where the light flicker adn the random voices give random direction every 1500 milliseconds
function newRound(){
  $("#zones").fadeIn();
  flickInterval = setInterval(flicker,500);
  correctGuess = guess[Math.floor(Math.random() * guess.length)];
  console.log(correctGuess);
  hintInterval = setInterval(hint,1500);
  $avatar.delay(500).fadeIn(700);

}


//Function where a random direction his given by a random voice from the array
function hint(){
   randomVoice = voices[Math.floor(Math.random() * voices.length)];
   randomDirect = guess[Math.floor(Math.random() * guess.length)];
   options = {
     pitch: 0.1,
     rate: 0.8,
     volume: 0.4
   };

   //Get a random value so the hint has 1 chance out of 4 to give the good direction with the good voice
  rng=Math.random();
  if(rng>= 0.75){
    responsiveVoice.speak(correctGuess,goodVoice,options);
  }else{
    responsiveVoice.speak(randomDirect,randomVoice,options);
  }
}


//Function called when you lose the game (0 points)
//Revomes the lights, the fire sounds and the hints
//Start the interval where voices laugh at you
function gameOver(){
    $("#zones").fadeOut(500);
    $("#direct").fadeOut(500);
    fire.pause();
    $avatar.delay(500).fadeIn(700);
    $("#end").delay(1200).fadeIn(1000);
    setInterval(laugh,1800);
    clearInterval(hintInterval);
}

//Function called when you win the game (10 points)
//Open the final scene with the girl ghost in it waiting for you
//On hover, the game will reset
function gameWon(){
    $("#zones").fadeOut(500);
    $("#zoneWon").delay(1200).fadeIn(1000);
    flickInterval = setInterval(flicker,500);
    $avatar.fadeIn();
    $("#girl").hover(function(){location.reload();});
}

//Function called when you lose the game, voices laugh at you
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
