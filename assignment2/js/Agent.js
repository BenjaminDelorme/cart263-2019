class Agent{

constructor(x,y,size,color){
  this.x = x;
  this.y = y;
  this.size=size;
  this.color= color;
  this.alive = true;
  }
display(){
  if(this.alive){
    push();
    noStroke();
    fill(this.color);
    ellipse(this.x,this.y,this.size);
    pop();
    }
  }

  collide(other){
    if(this.alive){
      let d = dist(this.x,this.y,other.x,other.y);
      if (d < this.size/2 + other.size/2) {
      return true;
    }
    else {
      return false;
    }
    }
  }

}
