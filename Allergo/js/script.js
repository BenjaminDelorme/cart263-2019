"use strict";

$(document).ready(function(){
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



});

function gameStart(){
  responsiveVoice.speak("Hi. Wellcome to my story. Well your story. This is me. You. Us. Whatever.", "UK English Male", {pitch: 1.5});

}
