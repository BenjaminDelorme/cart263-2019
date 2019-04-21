"use strict";
// thanks https://github.com/dariusk/corpora/blob/master/data/words/common.json for the words
// jokes at https://thoughtcatalog.com/melanie-berliet/2016/04/50-short-corny-jokes-that-will-make-you-laugh-out-loud/

//Setting up most of the varibles for the program
let charName;
let charAvatar = "assets/images/guy1-1.png";
let charVoice = "US English Male";
let pitch = 1;
let rpsScoreYou = 0;
let rpsScoreIts = 0;
let hungLives = 10;
let boy = false;
let girl = false; let gameOn = false;

let hangmanWord;let friend;let hint;let hints = [];
let talkin = false;  let rotationHint;let hintID = 0;
//For the data getting loaded
let lady;let jokes;let talks;let films;let thoughts;let happy;let sad;
//For annyang
let commRPS;let commMain;let commHang;let commTrivia;
let commPlay;let commTalk;let commShare;let commBlah;

//This is whenever the program starts
$(document).ready(function(){
  //Fetch the data from the JSON files and put the arrays to the variables
  $.getJSON('assets/data/data.json',fetchSpeech);
  $.getJSON('assets/data/questions.json',fetchQuestions);

//Set some main commands for annyang, 1 set for each main function/page
  if (annyang) {
    //For main page
    commMain = {
          "Menu": backMenu,
          "Let's play": play,
          "Let's play something": play,
          "Let's play a game": play,
          "Let's talk": talk
        };
        //For the Let's talk page
    commTalk = {
      "Menu": backMenu,
      "Tell me a joke": tellJokes,
      "I need to share": shareFeel,
      "Let's just talk": aboutFriend,
      "Tell me something": aboutFriend,
      "You're funny": function(){
        responsiveVoice.speak("I know I'm funny", charVoice , {pitch: pitch});
      },
      "I'm done": function(){
        annyang.removeCallback();
        $("#optionTalk").fadeIn();
        hintID = 0;
        hints = ["Tell me something","Tell me a joke","Let's just talk","I need to share","Menu"];
        responsiveVoice.speak("Okay well thanks for sharing how you feel", charVoice , {pitch: pitch});

      }
    }

    //For the let's play page
    commPlay = {
     "Menu": backMenu,
     "Let's play rock paper scissors": gameRPS,
     "Let's play hangman": setupHang,
     "Let's play trivia": playTrivia
   };
    annyang.addCommands(commMain);
    annyang.start();
  }

  $("#main").hide();
  $("#intro").hide();

  //Start the animations for the images
  Ani();
  charAni();

  //If you already have a character got straight to that page, else create one page
  let game = localStorage.getItem('gameState');
  if(game === null || game === "false"){
    gameOn = false;
  } else if(game === "true"){
    gameOn = true;
  }
  console.log(gameOn);

  if(gameOn === false){
    loading();
  }else if(gameOn === true){
    $("#load").hide();
    $("#logo").show();
    charAvatar = localStorage.getItem('theSkin');
    charVoice = localStorage.getItem('theVoice');
    pitch = localStorage.getItem('thePitch');
    charName = localStorage.getItem('theName');
    responsiveVoice.speak("Welcome back", charVoice, pitch);
    main();
  }


});
//Here we fetch the data from the data.json file
function fetchSpeech(data){
  lady = data.lady;
  hangmanWord = data.words;
  jokes = data.jokes;happy = data.happy;sad = data.sad;
  talks = data.talk;films = data.film;thoughts = data.thoughts;
}

//Function for the loading screen at the start
function loading(){
  let value = 5;
  let $start = $("<div></div>");
  $start.hide();
  $("#load").append($start);
  $start.text("Start").button();

  setInterval(function(){
    $( "#loading" ).progressbar({
      value: value

    });
    value = value+2;
    if(value >= 100){
      $("#loadTitle").fadeOut();
      $start.delay(500).fadeIn();

    }
  },200);
  $start.on('click',function(){
    $("#load").fadeOut("slow");
    intro();
  });


}
//Function for the intro, where the lady explains the program
function intro(){

  $("#intro").delay(500).fadeIn();
  $("#logo").delay(500).fadeIn();
  responsiveVoice.speak(lady[0], "US English Female");
  responsiveVoice.speak(lady[1], "US English Female");
  responsiveVoice.speak(lady[2], "US English Female");

  $("#start").on('click',function(){
    responsiveVoice.cancel();
    $("#intro").fadeOut();
    $("#create").delay(500).fadeIn();
    $("#avatar").hide();$("#voice").hide();$("#name").hide();
    responsiveVoice.speak(lady[3], "US English Female");
  });

  //Checks whether you choose a boy or a girl
  $("#boy").on('click',function(){
    $("#gender").fadeOut();
    $("#avatar").delay(500).fadeIn();
    boy = true;
    characterSelection();
  });
  $("#girl").on('click',function(){
      $("#gender").fadeOut();
      $("#avatar").delay(500).fadeIn();
      girl = true;
      characterSelection();
  });
}

//Here is the function where you select the skin of you character
function characterSelection(){
  responsiveVoice.cancel();
  responsiveVoice.speak(lady[4], "US English Female");
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

  //Navigate throught the skins
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
  //Select that skin
  $("#sel").on('click',function(){
    charAvatar = skin.attr('src');
    localStorage.setItem('theSkin',charAvatar);
    $("#avatar").fadeOut();
    $("#name").delay(500).fadeIn();
    $("#check").hide();
    nameSelect();
  })
}

//Here is the function where you choose a name for your friend
function nameSelect(){
  responsiveVoice.cancel();
  responsiveVoice.speak(lady[5], "US English Female");
  $("#nameSelect").on('click',function(){
    let name = $("#charName").val()
    $("#check").fadeIn();
    $("#chosenName").text(name);
    responsiveVoice.speak(lady[6]+name, "US English Female");
    $("#no").on('click',function(){
       $("#check").fadeOut();
       responsiveVoice.cancel();
        responsiveVoice.speak(lady[5], "US English Female");
     });
    $("#yes").on('click',function(){
      charName = name;
      localStorage.setItem('theName',charName);
      $(".charName").text(charName);

      $("#name").fadeOut();
      $("#voice").delay(500).fadeIn();
      voiceSelect();
    });
  })

}
//Here is the function where you choose a voice for your friend(varies if boy or girl)
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
  responsiveVoice.speak(lady[7], "US English Female");
  responsiveVoice.speak(soundTest, tempVoice, {pitch: tempPitch});

//voice selction slider
  $( function() {
   $( "#voiceSel" ).slider({
     value:0,
     min: 0,
     max: voices.length-1,
     step: 1,
     slide: function( event, ui ) {
       $( "#amount2" ).val(ui.value);
       selectedVoice = ui.value;
       tempVoice = voices[selectedVoice];
       soundTest = $("#say").val();
        responsiveVoice.speak(soundTest, tempVoice, {pitch: tempPitch});
     }
   });
   $( "#amount2" ).val( $( "#voiceSel" ).slider( "value" ) );

  });

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
         soundTest = $("#say").val();
        responsiveVoice.speak(soundTest, tempVoice, {pitch: tempPitch});
     }
   });
   $( "#amount" ).val( $( "#pitch" ).slider( "value" ) );
   $("#testVoice").on('click',function(){
     soundTest = $("#say").val();
     responsiveVoice.speak(soundTest, tempVoice, {pitch: tempPitch});
   });

//Once you select a voice, apply all the info for your friend and store them in their variables, then send this data
//to your local browser and then start the main program with this character
  $("#chooseVoice").on('click',function(){
    soundTest = $("#say").val();
    charVoice =tempVoice;
    pitch = tempPitch;
    localStorage.setItem('theVoice',charVoice);
    localStorage.setItem('thePitch',pitch);
    $("#itsName").text(charName+"'s")
    $("#voice").fadeOut();
    responsiveVoice.speak(lady[8], "US English Female", {onend: function(){
      responsiveVoice.speak("Congratulations. You're my new friend.", charVoice, pitch);
      main();
      gameOn = true;
      localStorage.setItem('gameState',gameOn);
      localStorage.setItem('yourScore',"0");
      localStorage.setItem('itsScore',"0");
    }});
  });
 });
}

//Main program where we execute all the main functions
function main(){
  //Function to delete your friend and start over
  $("#newFriend").on('click',function(){
    $("#goodbye").fadeIn();
    talkin = false;
    $("#noBye").on('click',function(){
      $("#goodbye").fadeOut();
      talkin = true;
      });
      $("#yesBye").on('click',reset);
  });
  $("#buddy").attr('src',charAvatar);
  $("#budName").text(charName);

  //Set some variables
  friend = $("#myFriend");
  friend.attr('src',charAvatar);
  hint = $("#hint");
  hintID=0;
  hints = ["Let's play something","Let's talk"];
  rotateHints();
  //display the right things
  $("#main").fadeIn();
  $("#play").hide();
  $("#talk").hide();
  $("#more").hide();
  $("#hint").fadeIn();$("#info").fadeIn();$("#newFriend").fadeIn();
  //Play or talk functions
  $("#playB").on('click',play);
  $("#talkB").on('click',talk);
  //If you click on upgrade
  $("#moreB").on('click',function(){
    $("#options").fadeOut();
    $("#premium").fadeIn();
    $("#x").on('click',function(){
      $("#premium").fadeOut();
      $("#options").fadeIn();
    });
  });
  $(".pay").on('click',function(){
    alert("You don't have enough money! Your account is currently at: 2.68$");
  });

  //All the other sub-menu fonctions
  $("#menu").on('click',backMenu);

  $("#playRPS").on('click',gameRPS);
  $("#playHANG").on('click',setupHang);
  $("#playTRIV").on('click',playTrivia);

  $("#aboutB").on('click',aboutFriend);
  $("#shareB").on('click',shareFeel);
  $("#jokeB").on('click',tellJokes);

  //call the function to randomly say stuff when you're not active in a while
  talkin = true;
  if(talkin === true){
      beat(20000,smallTalk);
  }
}

//Function when you say Let's talk
function talk(){
  hintID=0;
  hints = ["Tell me something","Tell me a joke","Let's just talk","I need to share","You're funny","Menu"];
  talkin = false;
  $("#options").fadeOut();
  $("#talk").fadeIn();
  $("#optionTalk").fadeIn();
  friend.animate({left: "30vw",top: "6vw",width: "30%"},500);
  responsiveVoice.cancel();
  responsiveVoice.speak("What do you want to talk about", charVoice , {pitch: pitch});
  annyang.removeCommands();
  annyang.addCommands(commTalk);
}

//Function when you say Let's play something
function play(){
  talkin = false;
  hintID=0;
  hints = ["Let's play rock paper scissors","Let's play hangman","Let's play trivia","Menu"];
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

//function called when you go back to the main menu, resets everything mainly(like main again)
function backMenu(){
  friend.animate({left: "30vw",width: "20%"},500);
  hintID=0;
  hints = ["Let's play something","Let's talk"];
  $("#talk").hide();
  $("#play").hide();
  $("#more").hide();
  $("#heSaid").empty();
  $("#jokePage").hide();
  $("#options").fadeIn();
  talkin = true;
  annyang.removeCallback();
  annyang.removeCommands();
  annyang.addCommands(commMain);
  if(talkin === true){
      beat(20000,smallTalk);
  }
}

//The neverending function that effects when talkin=true where if you're in the main menu and haven't done
//anything in a while, it will randomly say stuff like "hey you there" or "boring"
let smallTalk = ["boring","let's do something","hey","you there?"];
const beat = (time, array) => {
  setTimeout(()=> {
    let rng;
    if(talkin===true){
    rng = Math.floor(Math.random() * (20000 - 15000) ) + 15000;
    beat(Math.random() * rng, array);
      let call = array[Math.floor(Math.random() * array.length)];
      responsiveVoice.speak(call, charVoice , {pitch: pitch});
    }
  }, time)
}

//function when you say Let's just talk or Tell me something. Randomly tells you something from the array
function aboutFriend(){
  $("#jokePage").empty();
  //if the call is about a movie, he will also choose a random movie from the list
  let call1;let call2;
  let call = talks[Math.floor(Math.random() * talks.length)];
  if(call.subject.slice(-4)==="film"){
    let rngFilm = films[Math.floor(Math.random() * films.length)];
    call1 = call.subject +" "+ rngFilm;
  }else{call1 = call.subject}
  $("#heSaid").text(call1);
  responsiveVoice.speak(call1, charVoice , {pitch: pitch});

  //Waits for you to say something back and then say the related line to the call
  //Once again, if it's about a film, it will say a random feeling from the array
  annyang.addCallback('result', function() {
  if(call.thought.slice(-3)==="was"){
    let rngThought = thoughts[Math.floor(Math.random() * thoughts.length)];
    call2 = call.thought +" "+ rngThought;
  }else{call2 = call.thought}
  responsiveVoice.speak(call2, charVoice , {pitch: pitch});
  $("#heSaid").text(call2);
  annyang.removeCallback();
  });
}


//Function when you say I need to share. Just listens to you and whenever you stop talking, it says a line from this array
let sorry = ["Hmmmm","I know","wow really","sorry","Yeah","true","Seriously","You're kidding","Oh my god","Damn","Wow"];
function shareFeel(){
$("#optionTalk").fadeOut();
hintID=0;
hints = ["I'm done","I'm sad about...","I really don't know..."];
responsiveVoice.speak("Sure, tell me everything and let me know when you're done", charVoice , {pitch: pitch});
$("#jokePage").empty();
$("#heSaid").empty();
annyang.addCallback('result', function() {
  let call = sorry[Math.floor(Math.random() * sorry.length)];
  responsiveVoice.speak(call, charVoice , {pitch: pitch});

  });
hint.text('Say "Im done" when you are done sharing');
}

//When you say tell me a joke, it will tell you a random joke from the array, wait a bit then tell you the follow upto the joke
function tellJokes(){
  //Display
  talkin=false;
  $("#jokePage").empty();
  $("#heSaid").empty();
  $("#jokePage").show();
  //Select random joke
  let numJk = Math.floor(Math.random() * jokes.length);
  let currentJoke = jokes[numJk].joke;
  let currentAns = jokes[numJk].answer;
  let $joke = $("<div></div>");
  let $answer = $("<div></div>");
  $("#jokePage").append($joke).append($answer);

  $joke.attr('id', 'joke');
  $answer.attr('id', 'jkAns');
  $joke.text(currentJoke);

  responsiveVoice.speak(currentJoke, charVoice , {pitch: pitch, onend: function(){
    responsiveVoice.speak(currentAns,charVoice, {pitch: pitch});
    $answer.hide().text(currentAns).fadeIn();
  }});
}

//Setup function for the rock paper scissors game
function gameRPS(){

  responsiveVoice.speak("Okay let's play",charVoice, {pitch: pitch});
  friend.animate({left: "40vw",top: "6vw",width: "30%"},500);

  hintID=0;
  hints = ["I call rock","I call paper","I call scissors", "Menu"];
  let myCall;
  //Set annyang commands for this game
  commRPS = {
    'Menu': backMenu,
   'I call *myCall':checkRPS
  };
  annyang.removeCommands();
  annyang.addCommands(commRPS);
//visual display
  $("#games").hide();
  $("#rps").fadeIn();
  rpsScoreYou = localStorage.getItem('yourScore');
  rpsScoreIts = localStorage.getItem('itsScore');
  $("#rpsYourScore").text(rpsScoreYou);
  $("#rpsItsScore").text(rpsScoreIts);


  $(".rpsMove").on('click',function(event){
    checkRPS($(this).text());
  });
}

//Every time you make a call in the game
function checkRPS(myCall){
responsiveVoice.cancel();
$("#rpsGuess").hide();
$("#rpsResult").hide();
  let call = myCall.toLowerCase();
  let good = happy[Math.floor(Math.random() * happy.length)];
  let bad = sad[Math.floor(Math.random() * sad.length)];

  //Checks for your call vs his call (random call between the 3)
if(call === "rock" || call === "paper" || call === "scissors" ){
  let rpsActions = ["Rock", "Paper", "Scissors"];
  let rpsGuess = rpsActions[Math.floor(Math.random() * rpsActions.length)];
  $("#rpsGuess").fadeIn("fast").text('"'+rpsGuess+'"');
  //if you choose rock
  if($(this).text() === "Rock" || call === "rock"){
    if(rpsGuess === "Paper"){
      responsiveVoice.speak("I call paper", charVoice , {pitch: pitch, onend: function(){
        responsiveVoice.speak(good,charVoice, {pitch: pitch});}});
      $("#rpsResult").fadeIn("fast").text("You Lost");rpsScoreIts++
    }else if(rpsGuess === "Scissors"){
      responsiveVoice.speak("I call scissors", charVoice , {pitch: pitch, onend: function(){
        responsiveVoice.speak(bad,charVoice, {pitch: pitch});}});
      $("#rpsResult").fadeIn("fast").text("You Won");rpsScoreYou++;
    }else{
      responsiveVoice.speak("I call rock", charVoice , {pitch: pitch, onend: function(){
        responsiveVoice.speak("Draw",charVoice, {pitch: pitch});}});
      $("#rpsResult").fadeIn("fast").text("Draw");}
  }
  //if you choose paper
  if($(this).text() === "Paper" || call === "paper"){
    if(rpsGuess === "Paper"){
      responsiveVoice.speak("I call paper", charVoice , {pitch: pitch, onend: function(){
        responsiveVoice.speak("Draw",charVoice, {pitch: pitch});}});
      $("#rpsResult").fadeIn("fast").text("Draw");
    }else if(rpsGuess === "Scissors"){
      responsiveVoice.speak("I call scissors", charVoice , {pitch: pitch, onend: function(){
        responsiveVoice.speak(good,charVoice, {pitch: pitch});}});
      $("#rpsResult").fadeIn("fast").text("You Lost");rpsScoreIts++
    }else{
      responsiveVoice.speak("I call rock", charVoice , {pitch: pitch, onend: function(){
        responsiveVoice.speak(bad,charVoice, {pitch: pitch});}});
      $("#rpsResult").fadeIn("fast").text("You Won");rpsScoreYou++;}
  }
  //if you choose scissors
  if($(this).text() === "Scissors" || call === "scissors"){
    if(rpsGuess === "Paper"){
      responsiveVoice.speak("I call paper", charVoice , {pitch: pitch, onend: function(){
        responsiveVoice.speak(bad,charVoice, {pitch: pitch});}});
      $("#rpsResult").fadeIn("fast").text("You Won");rpsScoreYou++;
    }else if(rpsGuess === "Scissors"){
      responsiveVoice.speak("I call scissors", charVoice , {pitch: pitch, onend: function(){
        responsiveVoice.speak("Draw",charVoice, {pitch: pitch});}});
      $("#rpsResult").fadeIn("fast").text("Draw");
    }else{
      responsiveVoice.speak("I call paper", charVoice , {pitch: pitch, onend: function(){
        responsiveVoice.speak(good,charVoice, {pitch: pitch});}});
      $("#rpsResult").fadeIn("fast").text("You Lost");rpsScoreIts++}
  }

    //Update score in local storage
  localStorage.setItem('yourScore',rpsScoreYou);
  localStorage.setItem('itsScore',rpsScoreIts);

  $("#rpsYourScore").text(rpsScoreYou);
  $("#rpsItsScore").text(rpsScoreIts);
}else{responsiveVoice.speak("Play the game man", charVoice ,{pitch:pitch});}
}


//Fecth data from the questions.json file
let questions;
function fetchQuestions(data){
  questions = data.questions;
}

//Setup for Trivia game
let finalGuess;
function playTrivia(){
  hintID=0;
  hints = ["Start","Menu"];
  responsiveVoice.cancel();
  responsiveVoice.speak("Are you ready?", charVoice , {pitch: pitch});
  friend.animate({left: "40vw",top: "6vw",width: "30%"},500);
  //annyang commands for trivia
  commTrivia = {
    "Menu": backMenu,
   "I think it's *finalGuess":checkAnswer,
   "Start":nextQuestion
  };

  annyang.removeCommands();
  annyang.addCommands(commTrivia);
  //display for this game
  $("#games").hide();
  $("#startQuiz").show();
   $("#q-display").empty();
  $("#trivia").fadeIn();
  $("#startQuiz").on('click',nextQuestion);
}

//function for every round(every new question)
let currentQ;
function nextQuestion(){
  hintID=0;
  hints = ["I think it's c","I think it's b","I think it's a","Menu"];
  annyang.removeCommands('Start');
  $("#startQuiz").fadeOut();
   $("#q-display").empty();

  //Get a random question
  currentQ = getRandomElement(questions);
  let q_box = $("<div></div>");
  q_box.text(currentQ.question);
  q_box.addClass("question");
  $("#q-display").append(q_box);
  responsiveVoice.cancel();
  responsiveVoice.speak(currentQ.question, charVoice , {pitch: pitch});
  //display its 3 possible answers
  for (let i = 0; i < currentQ.answers.length; i++){
    let a_box = $("<div class = 'triviaGuess'></div>");
    a_box.text(currentQ.answers[i]);
    a_box.button();
    $("#q-display").append(a_box);

  }

  $(".triviaGuess").on('click',function(event){
    checkAnswer($(this).text().charAt(0));
  });
}

//Checks if your answer is good or not
function checkAnswer(finalGuess){
  let guess = finalGuess.toLowerCase();
  console.log(guess);
  if(guess === currentQ.correctAnswer){
      responsiveVoice.cancel();
      responsiveVoice.speak("Good answer", charVoice , {pitch: pitch});
      let goodA = $("<div></div>");
      goodA.addClass("fbQna");
      goodA.text("Good Answer");
      $("#q-display").append(goodA);
      setTimeout(nextQuestion,3000);
    }
    else{
      responsiveVoice.cancel();
      responsiveVoice.speak("Wrong", charVoice , {pitch: pitch});
}
//function where it gets a random element from the array
function getRandomElement(array){
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}



//Setup for hangman game
let word;
let currentGuess;
let guessString;
let hangWord;
let $againHang;
let result;
let letter;
let $letterTryed;
function setupHang(){
  responsiveVoice.speak("Sure", charVoice , {pitch: pitch});
  //Annyang commands for hangman
  commHang = {
    'Menu': backMenu,
   'Is there a *letter':checkLetter,
   'Is there an *letter':checkLetter,
   'Try again':tryAgainHung,
  };

  annyang.removeCommands();
  annyang.addCommands(commHang);


  $("#games").hide();
  $("#hang").fadeIn();
  gameHangman();
}

//Running function for Hangman
function gameHangman(letter){
  hintID=0;
  hints = ["Is there a s ","Is there an o ","Try again","Menu"];
  friend.animate({left: "40vw",top: "6vw",width: "30%"},500);
  responsiveVoice.speak("Let's do this", charVoice , {pitch: pitch});
  annyang.removeCommands('Play');
  $("#hangPlay").hide();

  //Create all the necessary divs to store the data of the word
  $letterTryed = $("<div></div>");
  $letterTryed.text("");
  $letterTryed.addClass("tryed");
  $againHang = $("<div></div>");
  $againHang.text("Try Again");
  $againHang.button();$againHang.addClass("tryAgain");
  $("#gameHangMan").empty();
  hungLives=10;
  $("#lives").text("Lives left: " +hungLives);
  hangWord = $("<div></div>");
  hangWord.addClass("underlines");
  result = $("<div></div>");
  result.addClass("resultHang");
  $("#gameHangMan").append(result);
  $("#gameHangMan").append(hangWord);
  $("#gameHangMan").append($letterTryed);
  $("#gameHangMan").append($againHang);

  //chooses a random word from the array
  let tempWord;
  tempWord = hangmanWord[Math.floor(Math.random() * hangmanWord.length)];
  word = tempWord.toLowerCase();
  currentGuess = [];
  //For every letter of the word, dislpay a "_ "
  console.log(word);
  for (let i = 0; i < word.length; i++) {
    currentGuess.push("_ ");
  };

   guessString = currentGuess.join('');
   hangWord.text(guessString);
   //If you play on keyboard, send the value of your keypress instead
   $(document).on('keydown',function(event){
     checkLetter(event.key);
   });
   $againHang.on('click', tryAgainHung);

}

//Function thats checks if the letter you called is in the word
function checkLetter(letter){
  responsiveVoice.cancel();
  let myLetter = letter.toLowerCase();
  //Check if the call is a letter from the alphabet
  if("abcdefghijklmnopqrstuvwxyz".indexOf(myLetter) === -1){
    responsiveVoice.speak("What", charVoice , {pitch: pitch});
    return;
  }
  console.log(myLetter);

  //If the letter is in the word
  let correct = 0;
  for (let i = 0; i < word.length; i++) {
    if (myLetter === word.charAt(i)) {
      currentGuess[i] = myLetter + " ";
      correct++;
    }
  }
  if (word.indexOf(myLetter) != -1) {
    responsiveVoice.speak("Yup", charVoice , {pitch: pitch});
  }

//If the letter is not in the word
  if  (correct === 0) {
    responsiveVoice.speak("Nope", charVoice , {pitch: pitch});
    hungLives--;
    $("#lives").text("Lives left: " +hungLives);
    let tryed =   $letterTryed.text();
    if(tryed.indexOf(myLetter) === -1){
      $letterTryed.text(tryed + myLetter+" ");
    }
  }
  guessString = currentGuess.join('');
  hangWord.text(guessString);

//If you found all the letters
  if (guessString.indexOf("_") === -1) {
    $("#lives").hide();
    responsiveVoice.speak("You won, the word was "+word, charVoice , {pitch: pitch});
    result.text('You won, the word was "'+word+'"');
  }

//If you lost all your lives
  if(hungLives===0){
    $("#lives").hide();
    responsiveVoice.speak("You lost, the word was "+word, charVoice , {pitch: pitch});
    result.text('You lost, the word was "'+word+'"');
  }
}

//Function when you try a new word / resets everything and start over with a new word
function tryAgainHung(){
  responsiveVoice.cancel();
  responsiveVoice.speak("Okay, here we go again", charVoice , {pitch: pitch});

  $("#lives").show();
  result.text("");
  let tempWord;
  tempWord = hangmanWord[Math.floor(Math.random() * hangmanWord.length)];
  word = tempWord.toLowerCase();
  hungLives=10;
  $letterTryed.text("");
  $("#lives").text("Lives left: " +hungLives);
  $("#gameHangMan").append(hangWord);
  $("#gameHangMan").append($letterTryed);
  $("#gameHangMan").append($againHang);

  currentGuess = [];
  console.log(word);
  for (let i = 0; i < word.length; i++) {
    currentGuess.push("_ ");
  };
   guessString = currentGuess.join('');
   hangWord.text(guessString);
}

//Rotate the hints on the screen depending on which page you're on (helps you with what to say)
function rotateHints(){
  rotationHint = setInterval(function(){
    hint.text('Try saying "'+hints[hintID]+'"');
    hintID++;

    if(hintID === hints.length){
      hintID = 0;
    }
    hint.fadeIn("500").delay(6000).fadeOut("500");
  },7000);
}

//Animation for the skins
function charAni(){
  //Animation for the skins in the character selection page
   setInterval(function(){
     let path = $(".skin").attr('src');
     if(path.slice(-5)==="1.png"){
        let path2 = path.replace("1.png","2.png");
        $(".skin").attr('src',path2);
      }else{
        let path2 = path.replace("2.png","1.png");
        $(".skin").attr('src',path2);
      }
    },500);

//Animation for the skins in the main page
  setInterval(function(){
   let path = $("#myFriend").attr('src');
    if(path.slice(-5)==="1.png"){
       let path2 = path.replace("1.png","2.png");
       $("#myFriend").attr('src',path2);
     }else{
       let path2 = path.replace("2.png","1.png");
       $("#myFriend").attr('src',path2);
     }
   },500);

}
//Function if you reset the game and create a new character
function reset(){
  localStorage.clear();
  location.reload();
}
//Other animations
function Ani(){
  //Ani for the info/hints logo
  setInterval(function(){
    if($("#info").attr('src') === "assets/images/info-1.png"){
        $("#info").attr('src',"assets/images/info-2.png");
      }else{
        $("#info").attr('src',"assets/images/info-1.png");
      }
    },500);
//Ani for the logo in the lading screen
    setInterval(function(){
      if($("#logoLoad").attr('src') === "assets/images/logo1.png"){
          $("#logoLoad").attr('src',"assets/images/logo2.png");
        }else{
          $("#logoLoad").attr('src',"assets/images/logo1.png");
        }
      },500);
}
