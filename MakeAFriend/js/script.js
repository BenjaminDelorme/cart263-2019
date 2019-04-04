"use strict";

$(document).ready(function(){
  // if (annyang) {
  //   // Let's define our first command. First the text we expect, and then the function it should call
  //   var commands = {
  //     'Hello': function() {
  //       $('div').fadeOut();
  //       gameStart();
  //     }
  //   };
  //
  //   // Add our commands to annyang
  //   annyang.addCommands(commands);
  //
  //   // Start listening. You can call this here, or attach this call to an event, button, etc.
  //   annyang.start();
  // }



$("#start").on('click',function(){
  $("#intro").fadeOut();
  $("#create").delay(500).fadeIn();
  $("#avatar").hide();$("#voice").hide();$("#name").hide();
});

$("#boy").on('click',characterSelection);

});

function characterSelection(){
  $("#gender").fadeOut();
  $("#avatar").delay(500).fadeIn();
  let bois = ["assets/images/guy1-1.png","assets/images/guy2-1.png","assets/images/guy3-1.png"]
  let skin = $('<img class="skin" src=""></img>');
  skin.attr('src',bois[0]);
  $('#avatar').append(skin);
  charAni();
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
