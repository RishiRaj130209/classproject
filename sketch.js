const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

let engine;
let world;

var chain;
var ball;
var balli;
var ground;

function setup() {
  createCanvas(600,600);
  engine = Engine.create();
  
  world = engine.world;

  var ball_options={
    "restitution":0.9,
    //"isStatic":true
  }
  ball = Bodies.circle(200,220,20,ball_options)
  World.add(world,ball)


  balli = Bodies.circle(200,260,40,ball_options)
  World.add(world,balli)
  
  var ground_options={
    "isStatic":true
  }
  ground = Bodies.rectangle(200,400,210,10,ground_options)
  World.add(world,ground)

  chain = Constraint.create({
    pointA:{x:200,y:50},
    bodyB:ball,
    pointB:{x:0,y:0},
    length:100,
    stiffness:0.5
  })
  World.add(world,chain)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  
}

function draw() {
  background(51);
  Engine.update(engine);

  ellipse(ball.position.x,ball.position.y,20)
  ellipse(balli.position.x,balli.position.y,40)
  
  rect(ground.position.x,ground.position.y,210,10)
  push()
  strokeWeight(4)
  stroke(255)
  line (chain.pointA.x,chain.pointA.y,ball.position.x,ball.position.y)
  line(ball.position.x,ball.position.y,balli.position.x,balli.position.y)
  pop()

}

function keyPressed(){
  if(keyCode === RIGHT_ARROW) {
   Matter.Body.applyForce(ball,{x:0,y:0},{x:0.05,y:0})
  }
}
