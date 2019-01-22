"use strict";
let avatar;
let food = [];


// setup()
//
// Description of setup

function setup() {
  createCanvas(windowWidth,windowHeight);
  avatar = new Avatar(mouseX,mouseY,75,0.5);
  food.push(new Food(random(0,width),random(0,height),20,100));
  food.push(new Food(random(0,width),random(0,height),20,100));
  food.push(new Food(random(0,width),random(0,height),20,100));
  food.push(new Food(random(0,width),random(0,height),20,100));
  food.push(new Food(random(0,width),random(0,height),20,100));

  noCursor();
}


// draw()
//
// Description of draw()

function draw() {
  background(170);

avatar.update();
avatar.display();

for (let i = 0; i < food.length; i++) {
  food[i].update();

  if(avatar.collide(food[i])){
    avatar.eating(food[i]);
  }
  food[i].display();
  }

}
