class Avatar extends Agent{

  constructor(x,y,size,sizeLoss){
  super(x,y,size,"#cccc55");
  this.maxSize = size;
  this.sizeLoss = sizeLoss;
  }

update(){
  if(this.alive){
    this.x = mouseX;
    this.y = mouseY;
    this.size = constrain(this.size - this.sizeLoss,0,this.maxSize);
  }
  if(this.size <=0){
    this.alive=false;
  }

  }

eating(other){
  if(this.alive){
this.size = constrain(this.size+other.size,0,this.maxSize);
other.reset();
  }
}

}
