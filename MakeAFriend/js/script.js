"use strict";
let charName;
let charAvatar;
let charVoice ="US English Male";
let pitch = 1.8;
let rpsScoreYou = 0;
let rpsScoreIts = 0;
let hungLives = 10;
let boy = false;
let girl = false;
let hangmanWord;
let talkin = false; let discuss = false;
let lady;let jokes;
let commRPS;let commMain;let commHang;let commTrivia;
let commPlay;let commTalk;let commShare;let commBlah;
$(document).ready(function(){
  $.getJSON('assets/data/data.json',fetchSpeech);
  $.getJSON('assets/data/questions.json',fetchQuestions);

  if (annyang) {
    commMain = {
          "Menu": backMenu,
          "Let's play": play,
          "Let's play something": play,
          "Let's play a game": play,
          "Let's talk": talk
        };
    commTalk = {
      "Menu": backMenu,
      "Tell me a joke": tellJokes,
      "I need to share": shareFeel,
      "Let's just talk": aboutFriend,
      "Stop": function(){
        talkin=false;
        discuss=false;
      },
      "I'm done": function(){
        talkin=false;
        discuss=false;
      }
    }
    // commShare = {
    //   'Menu': backMenu,
    //   'Tell me a joke': tellJokes
    // }
    // commBlah = {
    //   'Menu': backMenu,
    //   'Tell me a joke': tellJokes
    // }
    commPlay = {
     "Menu": backMenu,
     "Let's play rock paper scissors": gameRPS,
     "Let's play hangman": setupHang,
     "Let's play trivia": playTrivia
   };
    annyang.addCommands(commMain);
    annyang.start();
  }

  $("#intro").hide();
  setTimeout(intro,500);
  main();
});

function fetchSpeech(data){
  lady = data.lady;
  hangmanWord = data.words;
  jokes = data.jokes;

}

function intro(){

  // console.log(lady1);
  $("#intro").delay(500).fadeIn();
  // responsiveVoice.speak(lady[0], "US English Female");

  $("#start").on('click',function(){
    responsiveVoice.cancel();
    $("#intro").fadeOut();
    $("#create").delay(500).fadeIn();
    $("#avatar").hide();$("#voice").hide();$("#name").hide();
    responsiveVoice.speak(lady[1], "US English Female");
  });

  $("#boy").on('click',function(){
    $("#gender").fadeOut();
    $("#avatar").delay(500).fadeIn();
    boy = true;
    console.log(boy);
    characterSelection();
    });
    $("#girl").on('click',function(){
      $("#gender").fadeOut();
      $("#avatar").delay(500).fadeIn();
      girl = true;
      console.log(girl);
      characterSelection();
      });

}

function characterSelection(){
  responsiveVoice.cancel();
  responsiveVoice.speak(lady[2], "US English Female");
  let skins=[];
  let charID = 1;
  if(boy===true){
    skins = ["","assets/images/guy1-1.png","assets/images/guy2-1.png","assets/images/guy3-1.png"];
  } else if(girl === true){
    skins =["","assets/images/girl1-1.png","assets/images/girl2-1.png","assets/images/girl3-1.png","assets/images/girl4-1.png","assets/images/girl5-1.png"];
  }
  let skin = $('<img class="skin" src=""></img>');
  skin.attr('src',skins[charID]);

  $('#avatar').append(skin);
  charAni();

  $("#next").on('click',function(){
    charID++;
    if(charID === skins.length){charID=1;}
    skin.attr('src',skins[charID]);
    $('#avatar').append(skin);
  });
  $("#prev").on('click',function(){
    charID--;
    if(charID === 0){charID=skins.length-1;}
    skin.attr('src',skins[charID]);
    $('#avatar').append(skin);
  });
  $("#sel").on('click',function(){
    charAvatar = skin.attr('src');
    console.log(charAvatar);
    $("#avatar").fadeOut();
    $("#name").delay(500).fadeIn();
    $("#check").hide();
    nameSelect();
  })

}

function nameSelect(){
  responsiveVoice.cancel();
  responsiveVoice.speak(lady[3], "US English Female");
  $("#nameSelect").on('click',function(){
    let name = $("#charName").val()
    $("#check").fadeIn();
    $("#chosenName").text(name);
    responsiveVoice.speak(lady[4]+name, "US English Female");
    $("#no").on('click',function(){
       $("#check").fadeOut();
       responsiveVoice.cancel();
        responsiveVoice.speak(lady[3], "US English Female");
     });
    $("#yes").on('click',function(){
      charName = name;
      console.log(charName);
      $(".charName").text(charName);

      $("#name").fadeOut();
      $("#voice").delay(500).fadeIn();
      voiceSelect();
     });
  })

}

function voiceSelect(){
  let voices = [];
  if(boy===true){
    voices = [
    "UK English Male",
    "US English Male",
    "Spanish Male",
    "French Male",
    "Italian Male",
    "Russian Male",
    "Swedish Male",
    "Norwegian Male",
    "Australian Male",
    "Finnish Male",
    "Arabic Male",
    "Polish Male"
    ];
  } else if (girl===true){
    voices = [
      "UK English Female",
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
      "Australian Female",
      "Finnish Female"
      ];
  }
    let selectedVoice = 0;
    let tempVoice = voices[selectedVoice];
    let tempPitch = 1;
    let defaultLine = `Hey. I'm ${charName}`;
    $("#say").val(defaultLine);
    let soundTest = $("#say").val();
     responsiveVoice.speak(lady[5], "US English Female");
    responsiveVoice.speak(soundTest, tempVoice, {pitch: tempPitch});

//vocie selction slider
    $( function() {
 $( "#voiceSel" ).slider({
   value:0,
   min: 0,
   max: voices.length-1,
   step: 1,
   slide: function( event, ui ) {
     $( "#amount2" ).val(ui.value);
     selectedVoice = ui.value;
     console.log(ui.value);
     tempVoice = voices[selectedVoice];
     console.log(tempVoice);
     soundTest = $("#say").val();
      responsiveVoice.speak(soundTest, tempVoice, {pitch: tempPitch});
   }
 });
 $( "#amount2" ).val( $( "#voiceSel" ).slider( "value" ) );

} );

//pitch function slider
      $( function() {
   $( "#pitch" ).slider({
     value:1,
     min: 0,
     max: 2,
     step: 0.05,
     slide: function( event, ui ) {
       $( "#amount" ).val(ui.value);
       tempPitch = ui.value;
       console.log(tempPitch);
         soundTest = $("#say").val();
        responsiveVoice.speak(soundTest, tempVoice, {pitch: tempPitch});
     }
   });
   $( "#amount" ).val( $( "#pitch" ).slider( "value" ) );
$("#testVoice").on('click',function(){
  soundTest = $("#say").val();
  responsiveVoice.speak(soundTest, tempVoice, {pitch: tempPitch});
});

$("#chooseVoice").on('click',function(){
  soundTest = $("#say").val();
  charVoice =tempVoice;
  pitch = tempPitch;
  $("#voice").fadeOut();
  responsiveVoice.speak("Congratulations. You're my new friend.", charVoice, pitch);
});
 } );



}


function main(){
  $("#main").fadeIn();
  $("#play").hide();
  $("#talk").hide();
  $("#more").hide();

  $("#playB").on('click',play);

  $("#talkB").on('click',talk);

  $("#moreB").on('click',function(){
    $("#options").fadeOut();
    $("#more").fadeIn();
  });

  $("#menu").on('click',backMenu);

  $("#playRPS").on('click',gameRPS);
  $("#playHANG").on('click',setupHang);
  // $("#hangAgain").on('click',setupHang);
  $("#playTRIV").on('click',playTrivia);

  $("#aboutB").on('click',aboutFriend);

  $("#shareB").on('click',shareFeel);
  $("#jokeB").on('click',tellJokes);
}

function talk(){
  $("#options").fadeOut();
  $("#talk").fadeIn();
  $("#optionTalk").fadeIn();

  responsiveVoice.cancel();
  responsiveVoice.speak("What do you want to talk about", charVoice , {pitch: pitch});
  annyang.removeCommands();
  annyang.addCommands(commTalk);
}
function play(){
  $("#options").fadeOut();
  $("#play").fadeIn();
  $("#games").show();
  $("#rps").hide();
  $("#hang").hide();
  $("#trivia").hide();
  responsiveVoice.cancel();
  responsiveVoice.speak("What do you want to play", charVoice , {pitch: pitch});
  annyang.removeCommands();
  annyang.addCommands(commPlay);

}

function backMenu(){
  $("#talk").hide();
  $("#play").hide();
  $("#more").hide();
  $("#jokePage").hide();
  $("#options").fadeIn();
  talkin=false;
  discuss=false;

  annyang.removeCommands();
  annyang.addCommands(commMain);
  // clearInterval(smallTalk);
}


let test = ["yo","hi","wassup","bro"];
let test2 = ["Hmm","I know","wow really","sorry"];
const beat = (time, array) => {

    setTimeout(()=> {
      let rng;
      if(talkin===true){
      rng = Math.floor(Math.random() * (7000 - 4000) ) + 4000;
      beat(Math.random() * rng, array);
        console.log(rng);
        let call = array[Math.floor(Math.random() * array.length)];
        console.log(call)
      }
      if(discuss===true){
      rng = Math.floor(Math.random() * (13000 - 10000) ) + 10000;
      beat(Math.random() * rng, array);
        console.log(rng);
        let call = array[Math.floor(Math.random() * array.length)];
        console.log(call)
        responsiveVoice.speak(call, charVoice , {pitch: pitch, volume: 0.7});

      }

    }, time)

}
function aboutFriend(){
// $("#optionTalk").fadeOut();
// annyang.removeCommands("Tell me a joke");
// annyang.removeCommands("I need to share");
$("#jokePage").empty();
talkin=true;
discuss=false;
  beat(4000,test);
}
function shareFeel(){
// $("#optionTalk").fadeOut();
// annyang.removeCommands("Tell me a joke");
// annyang.removeCommands("Let's just talk");
responsiveVoice.speak("Sure, tell me everything", charVoice , {pitch: pitch, volume: 0.7});
$("#jokePage").empty();
discuss=true;
talkin=false;
  beat(8000,test2);
}


function tellJokes(){
  talkin=false;
  discuss=false;
  $("#jokePage").empty();
  $("#jokePage").show();
  let numJk = Math.floor(Math.random() * jokes.length);
let currentJoke = jokes[numJk].joke;
let currentAns = jokes[numJk].answer;

let $joke = $("<div></div>");
let $answer = $("<div></div>");
$("#jokePage").append($joke).append($answer);


$joke.text(currentJoke);
$answer.hide().text(currentAns).delay(2000).fadeIn();

responsiveVoice.speak(currentJoke, charVoice , {pitch: pitch, onend: function(){
  console.log(currentAns);
  responsiveVoice.speak(currentAns,charVoice, {pitch: pitch});
}});

console.log(numJk);
console.log(currentJoke);

}

function gameRPS(){
  responsiveVoice.speak("Okay let's play",charVoice, {pitch: pitch});
  let myCall;
  commRPS = {
    'Menu': backMenu,
   'I call *myCall':checkRPS
  };

  annyang.removeCommands();
  annyang.addCommands(commRPS);

  $("#games").hide();
  $("#rps").fadeIn();

  $(".rpsMove").on('click',function(event){
    checkRPS($(this).text());
  });
}
function checkRPS(myCall){
responsiveVoice.cancel();
  console.log(myCall);
  // if(myCall != annyang){console.log("clicked")}
  let call = myCall.toLowerCase();

  console.log(call)
if(call === "rock" || call === "paper" || call === "scissors" ){
  let rpsActions = ["Rock", "Paper", "Scissors"];
    let rpsGuess = rpsActions[Math.floor(Math.random() * rpsActions.length)];
    $("#rpsGuess").text(rpsGuess);
    //if you choose rock
    if($(this).text() === "Rock" || call === "rock"){
      if(rpsGuess === "Paper"){
        responsiveVoice.speak("I call paper", charVoice , {pitch: pitch, onend: function(){
          responsiveVoice.speak("Easy",charVoice, {pitch: pitch});}});
        $("#rpsResult").text("You Lost");rpsScoreIts++
      }else if(rpsGuess === "Scissors"){
        responsiveVoice.speak("I call scissors", charVoice , {pitch: pitch, onend: function(){
          responsiveVoice.speak("Fuck",charVoice, {pitch: pitch});}});
        $("#rpsResult").text("You Won");rpsScoreYou++;
      }else{
        responsiveVoice.speak("I call rock", charVoice , {pitch: pitch, onend: function(){
          responsiveVoice.speak("Okay",charVoice, {pitch: pitch});}});
        $("#rpsResult").text("Draw");}
    }
    //if you choose paper
    if($(this).text() === "Paper" || call === "paper"){
      if(rpsGuess === "Paper"){
        responsiveVoice.speak("I call paper", charVoice , {pitch: pitch, onend: function(){
          responsiveVoice.speak("Draw",charVoice, {pitch: pitch});}});
        $("#rpsResult").text("Draw");
      }else if(rpsGuess === "Scissors"){
        responsiveVoice.speak("I call scissors", charVoice , {pitch: pitch, onend: function(){
          responsiveVoice.speak("Yeah",charVoice, {pitch: pitch});}});
        $("#rpsResult").text("You Lost");rpsScoreIts++
      }else{
        responsiveVoice.speak("I call rock", charVoice , {pitch: pitch, onend: function(){
          responsiveVoice.speak("Shit",charVoice, {pitch: pitch});}});
        $("#rpsResult").text("You Won");rpsScoreYou++;}
    }
    //if you choose scissors
    if($(this).text() === "Scissors" || call === "scissors"){
      if(rpsGuess === "Paper"){
        responsiveVoice.speak("I call paper", charVoice , {pitch: pitch, onend: function(){
          responsiveVoice.speak("Cmon",charVoice, {pitch: pitch});}});
        $("#rpsResult").text("You Won");rpsScoreYou++;
      }else if(rpsGuess === "Scissors"){
        responsiveVoice.speak("I call scissors", charVoice , {pitch: pitch, onend: function(){
          responsiveVoice.speak("Hmm",charVoice, {pitch: pitch});}});
        $("#rpsResult").text("Draw");
      }else{
        responsiveVoice.speak("I call paper", charVoice , {pitch: pitch, onend: function(){
          responsiveVoice.speak("Hurray",charVoice, {pitch: pitch});}});
        $("#rpsResult").text("You Lost");rpsScoreIts++}
    }
    $("#rpsYourScore").text(rpsScoreYou);
    $("#rpsItsScore").text(rpsScoreIts);
  }else{console.log("Play the game man")}
}


let questions;
function fetchQuestions(data){
  questions = data.questions;
}
let finalGuess;
function playTrivia(){
  responsiveVoice.cancel();
  responsiveVoice.speak("Are you ready?", charVoice , {pitch: pitch});

  commTrivia = {
    "Menu": backMenu,
   "I think it's *finalGuess":checkAnswer,
   "Start":nextQuestion
  };

  annyang.removeCommands();
  annyang.addCommands(commTrivia);

  $("#games").hide();
  $("#startQuiz").show();
   $("#q-display").empty();
  $("#trivia").fadeIn();
  $("#startQuiz").on('click',nextQuestion);
}
let currentQ;
function nextQuestion(){
  annyang.removeCommands('Start');
  $("#startQuiz").fadeOut();
   $("#q-display").empty();
  currentQ = getRandomElement(questions);
  console.log(currentQ.question);
  // console.log(currentQ.answers);
  // console.log(currentQ.correctAnswer);
  let q_box = $("<div></div>");
  q_box.text(currentQ.question);
  $("#q-display").append(q_box);
  console.log(currentQ.answers.length);
  responsiveVoice.cancel();
  responsiveVoice.speak(currentQ.question, charVoice , {pitch: pitch});
  for (let i = 0; i < currentQ.answers.length; i++){
    let a_box = $("<div class = 'triviaGuess'></div>");
    // q_box.text(currentQ.question);
    a_box.text(currentQ.answers[i]);
    a_box.button();
    $("#q-display").append(a_box);

  }

  $(".triviaGuess").on('click',function(event){
    checkAnswer($(this).text().charAt(0));
  });
}

function checkAnswer(finalGuess){
  let guess = finalGuess;
  console.log(guess);
  if(guess === currentQ.correctAnswer){
      console.log('correct')
      responsiveVoice.cancel();
      responsiveVoice.speak("Good answer", charVoice , {pitch: pitch});
      let goodA = $("<div></div>");
      goodA.text("Good Answer");
      $("#q-display").append(goodA);
      setTimeout(nextQuestion,1000);
    }
    else{
      responsiveVoice.cancel();
      responsiveVoice.speak("Wrong", charVoice , {pitch: pitch});
      $(this).effect('shake');}
}

function getRandomElement(array){
  let element = array[Math.floor(Math.random() * array.length)];
    return element;

}



let word;
let currentGuess;
let guessString;
let hangWord;
let $againHang;
let result;
let letter;
function setupHang(){

  commHang = {
    'Menu': backMenu,
   'Is there a *letter':checkLetter,
   'Is there an *letter':checkLetter,
   'Try again':tryAgainHung,
   'Play':gameHangman
  };

  annyang.removeCommands();
  annyang.addCommands(commHang);


  $("#games").hide();
  $("#hang").fadeIn();
  $("#hangPlay").on('click',gameHangman);
}
function gameHangman(letter){
  responsiveVoice.speak("Let's do this", charVoice , {pitch: pitch});
  annyang.removeCommands('Play');
  $("#hangPlay").hide();
  $againHang = $("<div></div>");
  $againHang.text("Try Again");
  $againHang.button();
  $("#gameHangMan").empty();
  hungLives=10;
  $("#lives").text("Lives left: " +hungLives);
  hangWord = $("<div></div>");
  result = $("<div></div>");
  $("#gameHangMan").append(result);
  $("#gameHangMan").append(hangWord);
  $("#gameHangMan").append($againHang);
  let tempWord;
  tempWord = hangmanWord[Math.floor(Math.random() * hangmanWord.length)];
  word = tempWord.toLowerCase();
  currentGuess = [];
    console.log(word);
    for (let i = 0; i < word.length; i++) {
      currentGuess.push("_ ");
    };
     guessString = currentGuess.join('');
     hangWord.text(guessString);


     $(document).on('keydown',function(event){
       checkLetter(event.key);
     });
     $againHang.on('click', tryAgainHung);

}

function checkLetter(letter){
  responsiveVoice.cancel();
  let myLetter = letter.toLowerCase();
  if("abcdefghijklmnopqrstuvwxyz".indexOf(myLetter) === -1){
    console.log("What");
    return;
  }
  console.log(myLetter);
  let correct = 0;
  for (let i = 0; i < word.length; i++) {
    if (myLetter === word.charAt(i)) {
      currentGuess[i] = myLetter + " ";
      correct++;
      console.log("yup");
      responsiveVoice.speak("Yup", charVoice , {pitch: pitch});
    }
  }

  if  (correct === 0) {
    responsiveVoice.speak("Nope", charVoice , {pitch: pitch});
    console.log("nope");
    hungLives--;
    $("#lives").text("Lives left: " +hungLives);
  }
  guessString = currentGuess.join('');
  hangWord.text(guessString);

  if (guessString.indexOf("_") === -1) {
    console.log("you Win");
    $("#lives").hide();
    // result = $("<div></div>");
    responsiveVoice.speak("You won, the word was "+word, charVoice , {pitch: pitch});
    result.text("You won, the word was "+word);
    // $("#gameHangMan").append(result);
  }

  if(hungLives===0){
    $("#lives").hide();
    // result = $("<div></div>");
    responsiveVoice.speak("You lost, the word was "+word, charVoice , {pitch: pitch});
    result.text("You lost, the word was "+word);
    // $("#gameHangMan").append(result);
  }
// } else{console.log("What");}
}
function tryAgainHung(){
  responsiveVoice.cancel();
  responsiveVoice.speak("Okay, here we go again", charVoice , {pitch: pitch});

    $("#lives").show();
    result.text("");
    let tempWord;
    tempWord = hangmanWord[Math.floor(Math.random() * hangmanWord.length)];
    word = tempWord.toLowerCase();
    hungLives=10;
    $("#lives").text("Lives left: " +hungLives);
    $("#gameHangMan").append(hangWord);
    $("#gameHangMan").append($againHang);
    currentGuess = [];
    console.log(word);
    for (let i = 0; i < word.length; i++) {
      currentGuess.push("_ ");
    };
     guessString = currentGuess.join('');
     hangWord.text(guessString);
}


function charAni(){
  setInterval(function(){
let path = $("img").attr('src');
    if(path.slice(-5)==="1.png"){
        let path2 = path.replace("1.png","2.png");
          $("img").attr('src',path2);
      }else{
        let path2 = path.replace("2.png","1.png");
        $("img").attr('src',path2);
      }
    },500)
}
