"use strict";
let charName;
let charAvatar;
let charVoice;
let pitch;
let rpsScoreYou = 0;
let rpsScoreIts = 0;
let hungLives = 10;
let boy = false;
let girl = false;
let hangmanWord;
let talkin = false; let discuss = false;
let lady;let jokes;
$(document).ready(function(){

  $.getJSON('assets/data/data.json',fetchSpeech);
  $.getJSON('assets/data/questions.json',fetchQuestions);

  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
      'Hello': function() {
        $('div').fadeOut();
        gameStart();
      }
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
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
  pitch = {pitch: tempPitch};
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

  $("#playB").on('click',function(){
    $("#options").fadeOut();
    $("#play").fadeIn();
    $("#games").show();
    $("#rps").hide();
    $("#hang").hide();
    $("#trivia").hide();
  });
  $("#talkB").on('click',function(){
    $("#options").fadeOut();
    $("#talk").fadeIn();
    $("#optionTalk").fadeIn();
  });

  $("#moreB").on('click',function(){
    $("#options").fadeOut();
    $("#more").fadeIn();
  });

  $("#menu").on('click',function(){
    $("#talk").hide();
    $("#play").hide();
    $("#more").hide();
    $("#jokePage").hide();
    $("#options").fadeIn();
    talkin=false;
    discuss=false;
    // clearInterval(smallTalk);
  });

  $("#playRPS").on('click',gameRPS);
  $("#playHANG").on('click',setupHang);
  // $("#hangAgain").on('click',setupHang);
  $("#playTRIV").on('click',playTrivia);

  $("#aboutB").on('click',aboutFriend);

  $("#shareB").on('click',shareFeel);
  $("#jokeB").on('click',tellJokes);
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
      rng = Math.floor(Math.random() * (10000 - 8000) ) + 8000;
      beat(Math.random() * rng, array);
        console.log(rng);
        let call = array[Math.floor(Math.random() * array.length)];
        console.log(call)
      }

    }, time)

}
function aboutFriend(){
$("#optionTalk").fadeOut();
talkin=true;
  beat(4000,test);
}
function shareFeel(){
$("#optionTalk").fadeOut();
discuss=true;
  beat(4000,test2);
}


function tellJokes(){
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



console.log(numJk);
console.log(currentJoke);

}

function gameRPS(){
  $("#games").hide();
  $("#rps").fadeIn();

  let rpsActions = ["Rock", "Paper", "Scissors"];
  $(".rpsMove").on('click',function(){
    let rpsGuess = rpsActions[Math.floor(Math.random() * rpsActions.length)];
    $("#rpsGuess").text(rpsGuess);

    //if you choose rock
    if($(this).text() === "Rock"){
      if(rpsGuess === "Paper"){
        $("#rpsResult").text("You Lost");rpsScoreIts++
      }else if(rpsGuess === "Scissors"){
        $("#rpsResult").text("You Won");rpsScoreYou++;
      }else{$("#rpsResult").text("Draw");}
    }
    //if you choose paper
    if($(this).text() === "Paper"){
      if(rpsGuess === "Paper"){
        $("#rpsResult").text("Draw");
      }else if(rpsGuess === "Scissors"){
        $("#rpsResult").text("You Lost");rpsScoreIts++
      }else{$("#rpsResult").text("You Won");rpsScoreYou++;}
    }
    //if you choose scissors
    if($(this).text() === "Scissors"){
      if(rpsGuess === "Paper"){
        $("#rpsResult").text("You Won");rpsScoreYou++;
      }else if(rpsGuess === "Scissors"){
        $("#rpsResult").text("Draw");
      }else{$("#rpsResult").text("You Lost");rpsScoreIts++}
    }
    $("#rpsYourScore").text(rpsScoreYou);
    $("#rpsItsScore").text(rpsScoreIts);
  });
}


let questions;
function fetchQuestions(data){
  questions = data.questions;
}

function playTrivia(){
  $("#games").hide();
  $("#startQuiz").show();
   $("#q-display").empty();
  $("#trivia").fadeIn();
  $("#startQuiz").on('click',nextQuestion);
}

function nextQuestion(){
  $("#startQuiz").fadeOut();
   $("#q-display").empty();
  let currentQ = getRandomElement(questions);
  console.log(currentQ.question);
  // console.log(currentQ.answers);
  // console.log(currentQ.correctAnswer);
  let q_box = $("<div></div>");
  q_box.text(currentQ.question);
  $("#q-display").append(q_box);
  console.log(currentQ.answers.length);
  for (let i = 0; i < currentQ.answers.length; i++){
    let a_box = $("<div class = 'triviaGuess'></div>");
    // q_box.text(currentQ.question);
    a_box.text(currentQ.answers[i]);
    a_box.button();
    $("#q-display").append(a_box);

  }

  $(".triviaGuess").on('click',function(){
    if($(this).text().charAt(0)===currentQ.correctAnswer){
        console.log('correct')
        let goodA = $("<div></div>");
        goodA.text("Good Answer");
        $("#q-display").append(goodA);
        setTimeout(nextQuestion,1000);
      }
      else{
        $(this).effect('shake');}

  });

}

function getRandomElement(array){
  let element = array[Math.floor(Math.random() * array.length)];
    return element;

}



let word;
let currentGuess;
let guessString;
function setupHang(){
  $("#games").hide();
  $("#hang").fadeIn();
  $("#gameHangMan").empty();
  hungLives=10;
  $("#lives").text("Lives left: " +hungLives);
  let hangWord = $("<div></div>");
  $("#gameHangMan").append(hangWord);

  word = hangmanWord[Math.floor(Math.random() * hangmanWord.length)];
  currentGuess = [];
    console.log(word);
    for (let i = 0; i < word.length; i++) {
      currentGuess.push("_ ");
    };
     guessString = currentGuess.join('');
     hangWord.text(guessString);


     $(document).on('keydown',(event) => {
       let correct = 0;
       for (let i = 0; i < word.length; i++) {
         if (event.key === word.charAt(i)) {
           currentGuess[i] = event.key + " ";
           correct++;
           console.log("yup");
         }
       }

       if  (correct === 0) {
         console.log("nope");
         hungLives--;
         $("#lives").text("Lives left: " +hungLives);
       }
       guessString = currentGuess.join('');
      hangWord.text(guessString);

       if (guessString.indexOf("_") === -1) {
         console.log("you Win");
         $("#lives").hide();
         let result = $("<div></div>");
         result.text("You won, the word was "+word);
         $("#gameHangMan").append(result);
       }

       if(hungLives===0){
         $("#lives").hide();
         let result = $("<div></div>");
         result.text("You lost, the word was "+word);
         $("#gameHangMan").append(result);
       }

     });

     $("#hangAgain").on('click',function(){
       $("#lives").show();
       $("#gameHangMan").empty();
       word = hangmanWord[Math.floor(Math.random() * hangmanWord.length)];
       hungLives=10;
       $("#lives").text("Lives left: " +hungLives);
       $("#gameHangMan").append(hangWord);
       currentGuess = [];
       console.log(word);
       for (let i = 0; i < word.length; i++) {
         currentGuess.push("_ ");
       };
        guessString = currentGuess.join('');
        hangWord.text(guessString);
     });

}

// function gameHangman(){
//   game=true;
//   if(game===true){
//      $(document).on('keydown',(event) => {
//
//        let correct = 0;
//        for (let i = 0; i < word.length; i++) {
//          if (event.key === word.charAt(i)) {
//            currentGuess[i] = event.key + " ";
//            correct++;
//            console.log("yup");
//          }
//        }
//
//        if  (correct === 0) {
//          console.log("nope");
//          hungLives--;
//          $("#lives").text("Lives left: " +hungLives);
//        }
//        let guessString = currentGuess.join('');
//       hangWord.text(guessString);
//
//        if (guessString.indexOf("_") === -1) {
//          console.log("you Win");
//        }
//        if(hungLives===0){
//          setTimeout(setupHang,100);
//        }
//      });
//    }
//      // $("#hangAgain").on('click', function(){
//      //   $("#gameHangMan").empty();
//      //   hangWord= " ";
//      //   word = " ";
//      //   currentGuess = [];
//      //   setTimeout(setupHang,100);
//      // });
// }


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
