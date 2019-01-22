  class Food extends Agent{

    constructor(x,y,minSize,maxSize){
    super(x,y,random(minSize,maxSize),"#c5c5c5");
    this.maxSize = maxSize;
    this.minSize = minSize;
    this.vx = random(2,15);
    this.vy = random(2,15);
    }

  reset(){
    this.x = random(0,width);
      this.y = random(0,height);
      this.vx = random(2,15);
      this.vy = random(2,15);
      this.size = random(this.minSize,this.maxSize);

  }
  update(){

    this.x+= this.vx;
    this.y+= this.vy;

    if(this.x-this.size/2<=0 ||this.x+this.size/2>=width){
      this.vx= -this.vx;
    }
    if(this.y-this.size/2<=0 ||this.y+this.size/2>=height){
      this.vy= -this.vy;
    }
  }



  }
