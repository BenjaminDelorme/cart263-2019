"use strict"
let condiment;
let cat;
let room;
let material;
let verb;
let a;
let a2;
let description;

$(document).ready(function(){
  $.getJSON('assets/data/data.json',dataLoaded);
$(document).on('click',function(){
  $.getJSON('assets/data/data.json',dataLoaded);

});

});

function dataLoaded(data){
   condiment = getRandomElement(data.condiments);
   cat = getRandomElement(data.cats);
   room = getRandomElement(data.rooms);
   material = getRandomElement(data.materials);
   verb = " is";
  if(condiment.charAt(condiment.length-1)==="s"){
    verb = " are";
  }
   a = "a";
   a2 = "a";
  if(cat.charAt(0)==="A"||cat.charAt(0)==="E"||cat.charAt(0)==="U"||cat.charAt(0)==="I"||cat.charAt(0)==="Ha"||cat.charAt(0)==="He"){
    a = "an";
  }
  if(room.charAt(0)==="a"||room.charAt(0)==="e"||room.charAt(0)==="u"||room.charAt(0)==="i"){
    a2 = "an";
  }

  description = `${condiment} ${verb} like ${a} ${cat} in ${a2} ${room} made of ${material}`;
  $("div").text(description);
}

function getRandomElement(array){
  let element = array[Math.floor(Math.random() * array.length)];
    return element;

}
