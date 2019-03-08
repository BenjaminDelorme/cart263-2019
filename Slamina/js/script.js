"use strict";
let   animals=[
      "aardvark",
      "alligator",
      "alpaca",
      "antelope",
      "ape",
      "armadillo",
      "baboon",
      "badger",
      "bat",
      "bear",
      "beaver",
      "bison",
      "boar",
      "buffalo",
      "bull",
      "camel",
      "canary",
      "capybara",
      "cat",
      "chameleon",
      "cheetah",
      "chimpanzee",
      "chinchilla",
      "chipmunk",
      "cougar",
      "cow",
      "coyote",
      "crocodile",
      "crow",
      "deer",
      "dingo",
      "dog",
      "donkey",
      "dromedary",
      "elephant",
      "elk",
      "ewe",
      "ferret",
      "finch",
      "fish",
      "fox",
      "frog",
      "gazelle",
      "gila monster",
      "giraffe",
      "gnu",
      "goat",
      "gopher",
      "gorilla",
      "grizzly bear",
      "ground hog",
      "guinea pig",
      "hamster",
      "hedgehog",
      "hippopotamus",
      "hog",
      "horse",
      "hyena",
      "ibex",
      "iguana",
      "impala",
      "jackal",
      "jaguar",
      "kangaroo",
      "koala",
      "lamb",
      "lemur",
      "leopard",
      "lion",
      "lizard",
      "llama",
      "lynx",
      "mandrill",
      "marmoset",
      "mink",
      "mole",
      "mongoose",
      "monkey",
      "moose",
      "mountain goat",
      "mouse",
      "mule",
      "muskrat",
      "mustang",
      "mynah bird",
      "newt",
      "ocelot",
      "opossum",
      "orangutan",
      "oryx",
      "otter",
      "ox",
      "panda",
      "panther",
      "parakeet",
      "parrot",
      "pig",
      "platypus",
      "polar bear",
      "porcupine",
      "porpoise",
      "prairie dog",
      "puma",
      "rabbit",
      "raccoon",
      "ram",
      "rat",
      "reindeer",
      "reptile",
      "rhinoceros",
      "salamander",
      "seal",
      "sheep",
      "shrew",
      "silver fox",
      "skunk",
      "sloth",
      "snake",
      "squirrel",
      "tapir",
      "tiger",
      "toad",
      "turtle",
      "walrus",
      "warthog",
      "weasel",
      "whale",
      "wildcat",
      "wolf",
      "wolverine",
      "wombat",
      "woodchuck",
      "yak",
      "zebra"
    ]
let correctAnimal;
let reverseName;
let answers = [];
let answer;
let $guess;
let myGuess;
let score = 0;
// let myGuess;
const NUM_OPTIONS = 5;
$(document).ready(function(){



// $(document).on('click', function(){
//   let options = {
//     rate:1,
//     pitch:20
//   };
//   responsiveVoice.speak("Hello World","UK English Male",options);
//
// })


$("#start").on('click',function(){
  $("#start").remove();
  startGame();

  });


});


function startGame(){
console.log("Yay game starts");
$("#score").fadeIn();
newRound();

}

function addButton(label){
  $guess = $('<div class="guess" id=""></div>');
  $guess.text(label);
  $guess.button();
  $guess.on('click', function(){
    if($(this).text()===correctAnimal){
      console.log('correct')
      setTimeout(newRound,1000);
    }else{
      $(this).effect('shake');
      speakAnimal(correctAnimal);}
  });


  $('body').append($guess);
}


function newRound(){
  $("#score").text("Your score = "+score);
  $(".guess").remove();
  answers = [];
 for (let i = 0; i < NUM_OPTIONS; i++) {
    answer = animals[Math.floor(Math.random() * animals.length)];
    addButton(answer);
    answers.push(answer);

  };
correctAnimal = answers[Math.floor(Math.random() * answers.length)];

speakAnimal(correctAnimal);



  if (annyang) {
    // Let's define a command.
    var commands = {
      'I give up': function() {
        $guess.text(correctAnimal).effect('shake');
        setTimeout(newRound,1000);
        score=0;
      },

       'Say it again': function() {
         speakAnimal(correctAnimal);
       },
       'I think it is *myGuess': callGuess
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening.
    annyang.start();
  }



}

function callGuess(myGuess){


  if(myGuess===correctAnimal){
    console.log('correct')
    setTimeout(newRound,1000);
    score++;
  }else{
    console.log(myGuess);
      $guess.text(myGuess).effect('shake');
    speakAnimal(correctAnimal);
  }
}

function speakAnimal(name){
  let reverseAnimal = name.split('').reverse().join('');
    let options = {
      pitch: Math.random(),
      rate: Math.random()
    };
    responsiveVoice.speak(reverseAnimal,'UK English Male',options);
}
