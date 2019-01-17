gravity = 0.5
friction = 0.9
maxVel = 17
platDist = 0
posX = 50.00
oldPos = 0

maxHeight = 300
minHeight = 20
platWidth = 70
maxDist = 250
minDist = 150
playerSpeed = 1

function setup(){
	createCanvas(1080, 720);
	platforms = new Group
	platEdgesL = new Group
	platEdgesR = new Group
	player = createSprite(50, 25, 25, 25)

	for(i=0;i<Math.ceil(width/150);i++){
		platColor = color(random(0,255),random(0,255),random(0,255))
		heightA = random(minHeight, maxHeight)
		posX += platDist

		platform = createSprite(posX, height - heightA/2, platWidth, heightA)
		platform.shapeColor = platColor
		platform.setCollider('rectangle', 0, -heightA/2 + 5, platWidth, 10)

		platEdgeL = createSprite(posX - platWidth/2 +1, height - heightA/2 +10, 1, heightA - 10)
		platEdgeR = createSprite(posX + platWidth/2 -1, height - heightA/2 +10, 1, heightA - 10)
		platEdgeL.shapeColor = platColor
		platEdgeR.shapeColor = platColor

		platDist = random(minDist, maxDist)
		platform.immovable = true
		platforms.add(platform)
		platEdgesL.add(platEdgeL)
		platEdgesR.add(platEdgeR)
	}
}

function draw(){
	background(220)
	update()
	if(player.position.x >= camera.position.x){
		camera.position.x = player.position.x;
	}
	player.velocity.y += gravity
	player.bounce(platforms)
	drawSprites()
}


function update(){
	player.velocity.x = player.velocity.x * friction

	if(player.collide(platEdgesL) == true || player.collide(platEdgesR) == true){
		player.velocity.x = 0
		player.velocity.y += 0.01
	}

	if(player.velocity.y > maxVel){
		player.velocity.y = maxVel
	}

	if(keyDown('d')){
		player.velocity.x += playerSpeed;
	}

	if(keyDown('a')){
		player.velocity.x -= playerSpeed;
	}


	for(i=0;i<platforms.length;i++){
		if(platforms[i].position.x < player.position.x - (width/2 + 100)){
			changePlatform(i)
		}
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
}

function changePlatform(i){
	heightA = random(minHeight, maxHeight)
	platDist = random(minDist, maxDist)
	platforms[i].height = heightA 
	platEdgesL[i].height = heightA - 10
	platEdgesR[i].height = heightA - 10

	posX += platDist
	platforms[i].position.x = posX
	platforms[i].position.y = height - heightA/2

	platEdgesL[i].position.x = posX - platWidth/2 +1
	platEdgesL[i].position.y = height - heightA/2 +10

	platEdgesR[i].position.x = posX + platWidth/2 -1
	platEdgesR[i].position.y = height - heightA/2 +10

	platforms[i].setCollider('rectangle', 0, -heightA/2 + 5, platWidth, 10)

}