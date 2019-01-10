"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload


let avatar ={
  x:0,
  y:0,
  maxSize:100,
  size:50,
  alive:true,
  color:"#ff0000"
}

let food ={
  x:0,
  y:0,
  vx:9,
  vy:9,
  size:60,
  color:"#000"
}



function preload() {

}


// setup()
//
// Description of setup

function setup() {

  createCanvas(windowWidth,windowHeight);
  food.x= random(0,width);
  food.y= random(0,height);
  noCursor();

}


// draw()
//
// Description of draw()

function draw() {
  background("#c5c5c5");

if(avatar.alive){
  displayAvatar();
  updateAvatar();
  displayFood();
  updateFood();
  checkCollision();
}
}




function displayAvatar(){
  push();
  noStroke();
  fill(avatar.color);
  ellipse(avatar.x,avatar.y,avatar.size,avatar.size);
  pop();

}

function updateAvatar(){
  avatar.x=mouseX;
  avatar.y=mouseY;
  avatar.size-=0.4;
  avatar.size = constrain(avatar.size,0,avatar.maxSize);

  if(avatar.size===0){
    avatar.alive=false;
  }
}

function displayFood(){
  push();
  noStroke();
  fill(food.color);
  ellipse(food.x,food.y,food.size,food.size);
  pop();
}
function updateFood(){
push();
food.x+=food.vx;
food.y+=food.vy;

if(food.x-food.size/2<=0 ||food.x+food.size/2>=width){
  food.vx= -food.vx;
}
if(food.y-food.size/2<=0 ||food.y+food.size/2>=height){
  food.vy= -food.vy;
}


pop();


}



function checkCollision(){

  let d = dist(avatar.x,avatar.y,food.x,food.y);

  if(d<=food.size/2+avatar.size/2){
    avatar.size += 30;
    food.x= random(0,width);
    food.y= random(0,height);
    food.vx= random(2,15);
    food.vy= random(2,15);
    food.vy= -food.vy;
    food.vx= -food.vx;
  }
}
