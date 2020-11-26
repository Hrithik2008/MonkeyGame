var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground, groundImage, invisibleGround;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground2.png");
}



function setup() {
  createCanvas(500, 400);

  monkey = createSprite(100, 298, 10, 10);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.15;

  ground = createSprite(250, 350, 500, 10);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -3;

  invisibleGround = createSprite(250, 355, 500, 10);
  invisibleGround.visible = false;

  FoodGroup = new Group();
  obstacleGroup = new Group();

}


function draw() {
  background(255);

  score = Math.round(frameCount / getFrameRate());
  textSize(20);
  textFont("cursive");
  text("Survival Time :" + score, 200, 50);

  ground.velocityX = -5;

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (keyDown("space") && monkey.y > 298) {
    monkey.velocityY = -17;
  }

  //console.log(monkey.y);

  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleGround);

  ground.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;

  spawnBananas();
  spawnObstacles();

  drawSprites();
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(500, random(120, 200), 10, 10);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 167;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(500, 320, 10, 10);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.16;
    obstacle.velocityX = -5;
    obstacleGroup.add(obstacle);
  }
}