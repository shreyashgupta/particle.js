var nodes=[];
var r_nodes=[];
var u_nodes=[];
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(70);
  for(let i=0;i<nodes.length;i++)
  {
   nodes[i].display();
  }
}
function mousePressed()
{
  nodes.push(new Node(mouseX,mouseY));
  r_nodes.length=0;
  u_nodes.length=0;
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
class Node
{
  constructor(x,y)
  {
    this.x=x;
    this.y=y;
    this.r=10;
    this.connections=[];
  }
  connect(obj)
  {
    this.connections.push(obj);
  }
  display()
  {
    fill(255);
    noStroke();
    ellipse(this.x,this.y,2*this.r,2*this.r);
    for(let i=0;i<this.connections.length;i++)
    {
      stroke(255); 
      strokeWeight(3); 
      line(this.x,this.y,this.connections[i].x,this.connections[i].y);   
    }
  } 
}