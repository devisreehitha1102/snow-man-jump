var PLAY = 1;
var END = 0;
var gameState = PLAY;

 
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, backgroundimg, bg;
var trexImg;

var score = 0;

var gameOver, restart;



function preload(){
   
  backgroundimg=loadImage("background.jpg")
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
   
  trexImg = loadImage("trex.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  bg=createSprite(windowWidth-1500,windowHeight-463,2967,560)
  bg.addImage("bg",backgroundimg)
  //bg.scale=7;
  trex = createSprite(windowWidth-1500,windowHeight-20,20,50);
  trex.addImage("trex",trexImg)
  //trex.addAnimation("running", trex_running);
  //trex.addAnimation("collided", trex_collided);
  trex.setCollider("rectangle",0,0);
  trex.scale = 0.15;
   
  ground = createSprite(windowWidth-200,windowHeight-20,1000,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  ground.scale=1.5,
  
  gameOver = createSprite(windowWidth-800,windowHeight-450);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(windowWidth-800,windowHeight-300);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.4;
  restart.scale = 0.15;

  gameOver.visible =  false;
  restart.visible = false;
  
  invisibleGround = createSprite(windowWidth-1500,windowHeight-10,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
   
  background(backgroundimg);
  textSize(20)
  text("Score: "+ score, windowWidth-150,windowHeight-700)  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
     
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 190 === 0) {
    var cloud = createSprite(windowWidth-90,windowHeight-100,40,10);
    cloud.y = Math.round(random(80,150));
    cloud.addImage(cloudImage);
    cloud.scale = 0.1;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 500;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
   
     

    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(windowWidth-100,windowHeight-75,110,110);
     
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle1);
              break;
      case 3: obstacle.addImage(obstacle1);
              break;
      case 4: obstacle.addImage(obstacle1);
              break;
      case 5: obstacle.addImage(obstacle1);
              break;
      case 6: obstacle.addImage(obstacle1);
              break;
      default: break;
    }
    obstacle.depth = trex.depth;
    trex.depth = trex.depth + 1;
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.022;
    
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
   
  
 
  
  score = 0;
  
}