barWidth = 50
speed = 0.1
time = 30
timer = -1
score = 0
lastLevelScore = 0
level = 1
var position
gameRuning = true;

function setup(){
	createCanvas(800, 600);
	
	bigArea = createSprite(400, 0, barWidth, 1200)
	smallArea = createSprite(400, 0, barWidth/5, 1200)
	
	bigArea.shapeColor = color(150, 0, 255)
	smallArea.shapeColor = color(255, 0, 0)
	bigArea.mouseActive = true;
	smallArea.mouseActive = true;
	
}

function draw(){
	background(220)
	update()
	drawSprites()
	
	textSize(25);
	text('Score: '+score, 10, 25);
	nextLevel()
	textSize(25)
	textAlign(CENTER, BASELINE)
	text('Level: '+level, 400, 25);
	textAlign(LEFT, BASELINE)
	text('Time: '+time, 700, 25);
	
	
	if(gameRuning == false){
		gameOver()
	}

	if(keyWentDown('r') == true && gameRuning == false){
		reset();
	}
}


function update(){
	console.log(timer)
	if(bigArea.position.x - barWidth/2 <= 0){
		setVel(speed)
	}
	
	if(bigArea.position.x + barWidth/2 >= width){
		setVel(-speed)
	}
	
	vel = random(-speed, speed)
	
	bigArea.velocity.x += vel
	smallArea.velocity.x += vel	
	
	if(time <= 0){
		if(score - lastLevelScore >= 10){
			lastLevelScore = score
			speed += 0.2
			barWidth -= 2
			level++
			timer = 3
		
			bigArea.mouseActive = true;
			smallArea.mouseActive = true;
			
			if(barWidth < 5){
				barWidth = 5
			}
		} else {
			gameRuning = false;
			time = 0;
		}
	}
}


function mouseClicked(){
	if(gameRuning == true){
		if(bigArea.mouseIsPressed == true && smallArea.mouseIsPressed == false){
			score += 1
		}

		if(smallArea.mouseIsPressed == true){
			score += 5
		} 

		if(bigArea.mouseIsPressed == false && smallArea.mouseIsPressed == false){
			time -= 5
		}
	}
}


function setPos(x){
	bigArea.position.x = x
	smallArea.position.x = x
}

function setVel(x){
	bigArea.velocity.x = x
	smallArea.velocity.x = x
}

window.setInterval(function(){
  time -= 1
  timer -= 1
}, 1000);

function gameOver(){
	textSize(70)
	textAlign(CENTER, CENTER)
	text('Game Over', 400, 225)
	textSize(50)
	text('Score: ' + score, 400, 280)
	textSize(30)
	text('Press r to reset', 400, 325)
}

function nextLevel(){
	if(timer >= 0){
		textSize(70)
		textAlign(CENTER, CENTER)
		text('Level '+level, 400, 250)
		bigArea.mouseActive = false;
		smallArea.mouseActive = false;
		time = 30
	} else {
		bigArea.mouseActive = true;
		smallArea.mouseActive = true;		
	}
}

function reset(){
	gameRuning = true;
	time = 30
	level = 1
	barWidth = 50
	speed = 0.1
	score = 0
	lastLevelScore = 0
}