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


//     setInterval(function(){
// if($ghost.attr('src')==="assets/images/ghost1.png" ){
//     $ghost.attr('src',"assets/images/ghost2.png");
//   } else{
//     $ghost.attr('src',"assets/images/ghost1.png");
//   }
// },820)

});
