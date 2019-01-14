gravity = 0.5
friction = 0.9
maxVel = 20
platDist = 0
posX = 50.00
oldPos = 0

maxHeight = 400
minHeight = 10
maxDist = 600
minDist = 250

function setup(){
	createCanvas(800, 600);
	platforms = new Group
	player = createSprite(25, 25, 50, 50)

	for(i=0;i<20;i++){
		height = random(minHeight, maxHeight)
		posX += platDist
		platform = createSprite(posX, 600 - height/2, 100, height)
		platDist = random(minDist, maxDist)
		platform.immovable = true
		platforms.add(platform)
	}

}

function draw(){
	background(220)
	update()

	
	camera.position.x = player.position.x;
	player.velocity.y += gravity
	player.bounce(platforms)
	drawSprites()
}


function update(){
	player.velocity.x = player.velocity.x * friction

	if(player.velocity.y > maxVel){
		player.velocity.y = maxVel
	}

	if(keyDown('d')){
		player.velocity.x += 1;
	}

	if(keyDown('a')){
		player.velocity.x -= 1;
	}


	for(i=0;i<platforms.length;i++){
		if(platforms[i].position.x < player.position.x - 500){
			changePlatform(i)
			console.log(i)
		}
	}

}

function changePlatform(i){
	heightA = random(minHeight, maxHeight)
	platDist = random(minDist, maxDist)
	platforms[i].height = heightA
	posX += platDist
	platforms[i].position.x = posX
	platforms[i].position.y = 600 - heightA/2
}