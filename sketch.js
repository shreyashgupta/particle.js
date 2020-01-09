var nodes=[];
var r_nodes=[];
var u_nodes=[];
var speed=[1.2,-1.2];
function setup() {
  createCanvas(400, 400);
  for(let i=0;i<40;i++)
    nodes.push(new Node(random(390),random(390)));
}

function draw() {
  background(0);
  for(let i=0;i<nodes.length;i++)
  {
   nodes[i].display();
    nodes[i].move();
  }
    r_nodes=[];
  u_nodes=[];
  for(let i=0;i<nodes.length;i++)
  {
    nodes[i].connections=[];
    u_nodes.push(nodes[i]);
  }
  r_nodes.push(u_nodes[0]);
  u_nodes.splice(0,1);
  while(u_nodes.length>0)
  {
    let record=100000;
    let ri,ui;
    for(let i=0;i<r_nodes.length;i++)
    {
      for(let j=0;j<u_nodes.length;j++)
      {
        let v1=r_nodes[i];
        let v2=u_nodes[j];
        let d=dist(v1.x,v1.y,v2.x,v2.y);
        if(d<record)
        {
          record=d;
          ri=i;
          ui=j;
        }
      }
    }
    r_nodes[ri].connect(u_nodes[ui]);
    r_nodes.push(u_nodes[ui]);
    u_nodes.splice(ui,1);
  }
}
function mousePressed()
{
  //nodes.push(new Node(mouseX,mouseY));
}
class Node
{
  constructor(x,y)
  {
    this.x=x;
    this.y=y;
    this.r=3;
    this.vx=speed[floor(random(2))];
    this.vy=speed[floor(random(2))];
    this.connections=[];
    this.col=color(0,255,0);
  }
  connect(obj)
  {
    this.connections.push(obj);
  }
  display()
  {
    fill(this.col);
    noStroke();
    ellipse(this.x,this.y,2*this.r,2*this.r);
    for(let i=0;i<this.connections.length;i++)
    {
      stroke(this.col); 
      strokeWeight(1);   line(this.x,this.y,this.connections[i].x,this.connections[i].y);   
    }
  } 
  move()
  {
    this.x=this.x-this.vx;
    this.y=this.y-this.vy;
    if(this.x<this.r)
    {
      this.vx=this.vx*-1;
    }
        if(this.y<this.r)
    {
      this.vy=this.vy*-1;
    }
        if(this.x>width-this.r)
    {
      this.vx=this.vx*-1;
    }
        if(this.y>width-this.r)
    {
      this.vy=this.vy*-1;
    }
  }
}
