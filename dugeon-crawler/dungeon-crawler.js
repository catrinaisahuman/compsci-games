var grid = []
resolution = 20
maxVel = 17

function setup(){
	createCanvas(720, 720)
	walls = new Group()
	player = createSprite(0, 0, 50, 50)

	for(i=0;i<resolution;i++){
		grid[i] = []
		for(z=0;z<resolution;z++){
			grid[i][z] = 0
		}
	}
	grid[5][5] = 1
	grid[7][2] = 1
	grid[0][1] = 1
	grid[0][0] = 1

	for(i=0;i<resolution;i++){
		for(z=0;z<resolution;z++){
			if(grid[i][z] == 1){
				wall = createSprite((width/resolution)*z+width/resolution*0.5, (height/resolution)*i+height/resolution*0.5, width/resolution, height/resolution)
				wall.shapeColor = color(0)
				walls.add(wall)
			}
		}
	}
}

function draw(){
	background(220)
	drawSprites()

	player.velocity.x *= 0.9
	player.velocity.y *= 0.9


	if(keyDown('d') == true){
      player.velocity.x += 1;
    }

    if(keyDown('a')){
       player.velocity.x -= 1;
    }

   	if(keyDown('w') == true){
      player.velocity.y -= 1;
    }

    if(keyDown('s')){
       player.velocity.y += 1;
    }

    if(player.velocity.x > maxVel){
    	player.velocity.x = maxVel
    }

     if(player.velocity.y > maxVel){
    	player.velocity.y = maxVel
    }

	for(i=0;i<walls.length;i++){
		if(player.collide(walls[i])){
			if(player.position.y <= walls[i].position.y - walls[i].height/2 || player.position.y >= walls[i].position.y + walls[i].height/2){
				player.velocity.y = 0
			} 
			if(player.position.x <= walls[i].position.x - walls[i].width/2 || player.position.x >= walls[i].position.x + walls[i].width/2){

				player.velocity.x = 0
			} 
		}

	}
}