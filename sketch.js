var bananaImg, bananaGroup, obstacleImg, obstacleGroup, bgImg, bg;

var monkey, monkeyRunning, invisGround;

var score = 0;

function preload() {
  bgImg = loadImage("jungle.jpg");
  monkeyRunning = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_01.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  bg = createSprite(200, 200);
  bg.addImage("bg", bgImg);

  monkey = createSprite(50, 350);
  monkey.addAnimation("running", monkeyRunning);
  monkey.scale = 0.1;

  invisGround = createSprite(200, 390, 400, 20)
  invisGround.visible = false;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {

  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    score = score + 2;
  }

  if (monkey.isTouching(obstacleGroup)) {
    monkey.scale -= 0.001;
  }

  if (monkey.scale < 0) {
    monkey.scale = 0.01;
  }

  monkey.collide(invisGround);

  monkey.velocityY = monkey.velocityY + 0.8;

  bg.velocityX = -5;
  if (bg.x < 0) {
    bg.x = 500;
  }

  switch (score) {
    case 10:
      monkey.scale = 0.12;
      break;
    case 20:
      monkey.scale = 0.14;
      break;
    case 30:
      monkey.scale = 0.16;
      break;
    case 40:
      monkey.scale = 0.18;
      break;
    default:
      break;
  }
  
  if (keyDown("space") && monkey.y > 350) {
     monkey.velocityY = -18;
  }
  
  spawnBanana();
  spawnObstacles();
  
  drawSprites();
  fill("white")
  textFont("Jokerman")
  textSize(20)
  text("Score : " + score, 200, 35);
}

function spawnBanana() {
  if (frameCount % 120 == 0) {
    var banana = createSprite(410, random(120, 200), 10, 10);
    banana.addImage("banana", bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 400 / 3;
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 == 0) {
    var obstacle = createSprite(410, 350, 10, 10);
    obstacle.addImage("Stone", obstacleImg);
    obstacle.scale = 0.15;
    obstacle.velocityX = -4;
    obstacle.lifetime = 400 / 4;
    obstacleGroup.add(obstacle);
  }
}