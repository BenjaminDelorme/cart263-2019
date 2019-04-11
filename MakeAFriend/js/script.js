"use strict";
let charName;
let charAvatar;
let charVoice;
let pitch;
let rpsScoreYou = 0;
let rpsScoreIts = 0;
let boy = false;
let girl = false;
let lady1;let lady2;let lady3;let lady4;let lady5;let lady6;
$(document).ready(function(){

  $.getJSON('assets/data/speech.json',fetchSpeech);


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

  // $("#intro").hide();
  // setTimeout(intro,500);
  main();
});

function fetchSpeech(data){
  lady1 = data.lady[0];lady4 = data.lady[3];
  lady2 = data.lady[1];lady5 = data.lady[4];
  lady3 = data.lady[2];lady6 = data.lady[5];
}

function intro(){

  // console.log(lady1);
  $("#intro").delay(500).fadeIn();
  // responsiveVoice.speak(lady1, "US English Female");

  $("#start").on('click',function(){
    responsiveVoice.cancel();
    $("#intro").fadeOut();
    $("#create").delay(500).fadeIn();
    $("#avatar").hide();$("#voice").hide();$("#name").hide();
    responsiveVoice.speak(lady2, "US English Female");
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
  responsiveVoice.speak(lady3, "US English Female");
  let skins=[];
  let charID = 1;
  if(boy===true){
    skins = ["","assets/images/guy1-1.png","assets/images/guy2-1.png","assets/images/guy3-1.png"];
  } else if(girl === true){
    skins =["","assets/images/girl1-1.png","assets/images/girl2-1.png"];
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
  responsiveVoice.speak(lady4, "US English Female");
  $("#nameSelect").on('click',function(){
    let name = $("#charName").val()
    $("#check").fadeIn();
    $("#chosenName").text(name);
    responsiveVoice.speak(lady5+name, "US English Female");
    $("#no").on('click',function(){
       $("#check").fadeOut();
       responsiveVoice.cancel();
        responsiveVoice.speak(lady4, "US English Female");
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
     responsiveVoice.speak(lady6, "US English Female");
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
    $("#tic").hide();
  });
  $("#talkB").on('click',function(){
    $("#options").fadeOut();
    $("#talk").fadeIn();
  });

  $("#moreB").on('click',function(){
    $("#options").fadeOut();
    $("#more").fadeIn();
  });

  $("#menu").on('click',function(){
    $("#talk").hide();
    $("#play").hide();
    $("#more").hide();
    $("#options").fadeIn();
  });

  $("#playRPS").on('click',gameRPS);
  $("#playTIC").on('click',gameTic);

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

function gameTic(){
  $("#games").hide();
  $("#tic").fadeIn();
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
