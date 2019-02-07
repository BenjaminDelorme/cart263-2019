

"use strict";

// Set variables and constants to use later in the code
let words;
let $wrongZone;
let $rightZone;
let $textBox;
let lives;
const MinDelayTime = 1000;
const MaxDelayTime = 3000;


$(document).ready(setup);
  //Setup the sounds to be used
  let buzzerSFX = new Audio("assets/sounds/buzzer.mp3");
  let blopSFX = new Audio("assets/sounds/blop.mp3");
  let failSFX = new Audio("assets/sounds/fail.mp3");



  function setup(){

    //Setting up variables of commonly used jQuery elements
    $rightZone = $("#right");
    $wrongZone = $("#wrong");


    //Array of words that will randomly appear on the screen. the first half and wrong and the secong half is right
    words = [
      //Wrong
      'Wellfare', 'Speach', 'Sumary', 'Beleive', 'Colum', 'Writting', 'Maraton',
      'Voluntear', 'Garantee', 'Acheivement', 'Narow', 'Disapear', 'Wierd', 'Preceed', 'Cemetary', 'Restrein','Dilema','Tommorrow',
      'Tomatos', 'Brocoli', 'Inovate', 'Retirment', 'Knowledgeable','Vaccuum','Maintnance', 'Retoric', 'Plagerize',
      'Legislatur','Curiculum','Quarentine',
      //Right
      'Tyranny', 'Colleague', 'Absence', 'Vehicle', 'Underrate', 'Rhythm', 'Sofisticated',
      'Seize', 'Secretary', 'Acquaintance', 'Relevant', 'Receipt', 'Publicly','Deceive','Expand',
      'Lightning', 'Perseverance', 'Address', 'Occurred', 'Neighbor', 'Fashionable', 'Judgment', 'Intelligence', 'Noticeable', 'Belief','Hierarchy','Foreign','Fiery',
      'Changeable','Conscience'
    ];

  //Set up the functions to randomly popup a word in an interval and continuously do the update function
  setTimeout(wordPopup,600);
  update();
  }



  function wordPopup(){

    // Generate a div that will contain the random word and go inside the designated zone
    $textBox= $('<div></div>');
    let $wordZone = $('#wordZone');
    //Using the random function on the index, that way we can generate a random word and
    //keep track of its index, to check if it's in the right or wrong catergory
    let index = Math.floor(Math.random() * words.length);
    let randomWord = words[index];

    $textBox.append("<p id="+index+">" + randomWord + "</p>");
    $wordZone.append($textBox);
    $textBox.addClass("textBox");

    //The word appears at a random location on the screen
    $textBox.offset({
      top: Math.random() * ($(window).height()/100*80 - $textBox.height()),
      left: Math.random() * ($(window).width() - $textBox.width())
    });

    //Making the div a draggable and changing the style of the cursor when hovered
    $textBox.draggable();
    $textBox.on('mouseover',function(){
      $('body').css("cursor","pointer");

    });
    //Setting the random interval delay for the words to popup, the time being between these two constant.
    let delay = MinDelayTime + Math.random() * (MaxDelayTime - MinDelayTime);
    setTimeout(wordPopup,delay);
  }


  //Continuously run this function to check whether the word was dropped in the right catergory and
  //keep track of your remaining lives
  function update(){

    //Starting amount of lives
    lives = 5;
    //Check when the word is dropped in the "Right" zone
    $rightZone.droppable({
      drop:function onDrop(event,ui) {
        //Retreive the dropped word's ID
        let element2 = $(ui.draggable[0] ).html();
        let idCheckRight = parseInt($(element2).attr("id"));
        //Check if the word's ID is bellow half of the arrays lenght (29), thus written wrong
        if(idCheckRight > 29){
          ui.draggable.remove();
          blopSFX.play();
        //If not, remove one life
        } else{
          ui.draggable.remove();
          lives--;
          buzzerSFX.play();
          $("h5").text("Lives: " + lives)
          }
        //If the live count gets to 0, play the fail music and then restart the game
        if(lives===0){
          failSFX.play();
          $("#wordZone").fadeOut();
          $(failSFX).on('ended', function() {
            location.reload();
          });
        }
      }});

      //Check when the word is dropped in the "Wrong" zone
      $wrongZone.droppable({
        drop:function onDrop(event,ui) {
          //Retreive the dropped word's ID
          let element = $(ui.draggable[0] ).html();
          let idCheckWrong = parseInt($(element).attr("id"));
          //Check if the word's ID is over half of the arrays lenght (29), thus written right
          if(idCheckWrong <= 29){
            ui.draggable.remove();
            blopSFX.play();
            //If not, remove one life
          } else{
            ui.draggable.remove();
            lives--;
            buzzerSFX.play();
            $("h5").text("Lives: " + lives)
            }
          //If the live count gets to 0, play the fail music and then restart the game
          if(lives===0){
            failSFX.play();
            $("#wordZone").fadeOut();
            $(failSFX).on('ended', function() {
              location.reload();
            });
          }
        }});
      }
