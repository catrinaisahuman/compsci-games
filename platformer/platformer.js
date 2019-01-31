gravity = 0.5
friction = 0.9
maxVel = 17
platDist = 0
posX = 50.00
oldPos = 0
timer = 0

maxHeight = 300
minHeight = 20
platWidth = 70
maxDist = 250
minDist = 150
playerSpeed = 1

obsPosX = 0
obsDist = 0
distance = 0
gameOver = false
showScore = false
score = 0


function preload() {
	jump = loadSound('audio/jump.wav')
	jump.setVolume(0.3)
	jump.playMode('untilDone')
	backgroundMusic = loadSound('audio/background.wav')
	backgroundMusic.playMode('untilDone')
	playerSprite = loadImage('ball.png')
}


function setup(){
	createCanvas(1080, 720);
	platforms = new Group
	platEdgesL = new Group
	platEdgesR = new Group
	obsticals = new Group
	player = createSprite(50, 25, 25, 25)
	player.addImage(playerSprite)

	for(i=0;i<Math.ceil(width/150);i++){
		platColor = color(random(0,255),random(0,255),random(0,255))
		heightA = random(minHeight, maxHeight)
		posX += platDist

		platform = createSprite(posX, height - heightA/2, platWidth, heightA)
		platform.shapeColor = platColor

		platDist = random(minDist, maxDist)
		platform.immovable = true
		platforms.add(platform)

		if(Math.ceil(width/150)%i == 0){
			obsDist = random(500, 1000)
			obsHeight = random(200, 300)
			obsPosX += obsDist

			obstical = createSprite(obsPosX, obsHeight, 50, 50)
			obstical.shapeColor = color(200, 0, 0)
			obstical.immovable = true

			obsticals.add(obstical)
		}
	}
}


function draw(){
	background(220)

	distance = Math.ceil(player.position.x/50)
	textAlign(CENTER, BASELINE)
	textSize(30)
	text('Distance: '+ distance, camera.position.x, 35);

	
	update()
	if(player.position.x >= camera.position.x){
		camera.position.x = player.position.x;
	}
	player.velocity.y += gravity



	drawSprites()
}


function update(){
	backgroundMusic.play()
	player.velocity.x = player.velocity.x * friction
	
	for(i=0;i<platforms.length;i++){
		if(player.collide(platforms[i])){
			if(player.position.y <= platforms[i].position.y - platforms[i].height/2){
				player.velocity.y = -abs(player.velocity.y) -gravity
				jump.play()
			} else{
				player.velocity.x = 0
			} 
		}

	}
	
	if(player.collide(obsticals)){
		gameOver = true
		timer = 0
	}

	if(player.velocity.y > maxVel){
		player.velocity.y = maxVel
	}



	for(i=0;i<platforms.length;i++){
		if(platforms[i].position.x < player.position.x - (width/2 + 100)){
			changePlatform(i)
		}
	}

	for(i=0;i<obsticals.length;i++){
		if(obsticals[i].position.x < player.position.x - (width/2 + 100)){
			changeObsticals(i)
		}
	}

	if(keyDown('d') == true){
      player.velocity.x += playerSpeed;
    }

    if(keyDown('a')){
       player.velocity.x -= playerSpeed;
    }

	minDist = player.position.x/50
	if(minDist < 150){
		minDist = 150
	}

	maxDist = minDist + 100

	if(minDist > 700){
		minDist = 700
	}

	if(maxDist > 900){
		maxDist = 900
	}

	if(player.position.y > 1000){
		gameOver = true
		timer = 0
	}

	if(gameOver == true){
		reset()
		
	}


	if(showScore == true){
		textAlign(CENTER, CENTER)
		textSize(50)
		text('Score: ' + score, width/2, height/2)
	} 
}

function changePlatform(i){
	heightA = random(minHeight, maxHeight)
	platDist = random(minDist, maxDist)
	platforms[i].height = heightA 

	posX += platDist
	platforms[i].position.x = posX
	platforms[i].position.y = height - heightA/2
}


function reset(){
	player.position.x = 50
	player.position.y = 25
	player.velocity.x = 0
	player.velocity.y = 0

	camera.position.x = width/2

	maxDist = 250
	minDist = 150
	posX = 50
	platDist = 0
	obsPosX = 0
	obsDist = 0

	for(i=0;i<platforms.length;i++){
		resetPlatform(i)
	}

	for(i=0;i<obsticals.length;i++){
		changeObsticals(i)
	}

	score = distance
	distance = 0
	gameOver = false
	showScore = true
}


function resetPlatform(i){
	heightA = random(minHeight, maxHeight)
	platforms[i].height = heightA 


	posX += platDist
	platforms[i].position.x = posX
	platforms[i].position.y = height - heightA/2

	platDist = random(minDist, maxDist)

}


function changeObsticals(i){
	obsHeight = random(200, 300)
	obsDist = random(500, 1000)

	obsPosX += obsDist
	obsticals[i].position.x = obsPosX
	obsticals[i].position.y = obsHeight
}



window.setInterval(function(){
	timer++
}, 1000)








