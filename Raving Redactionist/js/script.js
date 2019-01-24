
let $spansCensor;
let $spansSecret;
let wordFound;
$(document).ready(setup);


function setup() {
  $spansCensor = $(".redacted");
  $spansSecret = $(".secret");
  wordFound=0;

$("#wordFound").text(wordFound);
setInterval(update,500);

$spansCensor.on('click',spanClicked);
$spansSecret.on('mouseover',hoverSecret);
}

function update(){
  $("#wordFound").text(wordFound);
  console.log("Update!");
  $spansCensor.each(updateSpan);
}

function updateSpan(){
  let random = Math.random();
  if(random<= 0.1){
$(this).removeClass("redacted");
$(this).addClass("revealed");

  }

  if(wordFound===10){
    $('h3').text("You found all the secret words! Congrats.");
  }
  console.log("Updating span!");
}

function spanClicked(){
  $(this).addClass("redacted");
  $(this).removeClass("revealed");
}
function hoverSecret(){
  console.log("onit!");
$(this).addClass("found");
wordFound++;
$(this).off('mouseover');
}
