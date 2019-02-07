var grid = []
resolution = 20
maxVel = 17
enemyMaxVel = 1

function setup(){
	createCanvas(720, 720)
	walls = new Group()
	enemies = new Group()
	player = createSprite(500, 500, 20, 20)

	nWall = createSprite(width/2, 10, width, 20)
	nWall.shapeColor = color(0)
	sWall = createSprite(width/2, height -10, width, 20)
	sWall.shapeColor = color(0)
	eWall = createSprite(10, height/2, 20, width)
	eWall.shapeColor = color(0)
	wWall = createSprite(width -10, height/2, 20, height)
	wWall.shapeColor = color(0)

	walls.add(nWall)
	walls.add(sWall)
	walls.add(eWall)
	walls.add(wWall)


	for(i=0;i<resolution;i++){
		grid[i] = []
		for(z=0;z<resolution;z++){
			grid[i][z] = 0
		}
	}


	for(i=0;i<resolution;i++){
		for(z=0;z<resolution;z++){
			if(z==10 && i<8){
				grid[i][z] = 1
			}

			if(i==7 && z<11 && z!=7 && z!=8){
				grid[i][z] = 1
			}

			if(z==10 && i>12){
				grid[i][z] = 1
			}
		}
	}

	for(i=0;i<resolution;i++){
		for(z=0;z<resolution;z++){
			if(grid[i][z] == 1){
				wall = createSprite((width/resolution)*z+width/resolution*0.5, (height/resolution)*i+height/resolution*0.5, width/resolution, height/resolution)
				wall.shapeColor = color(0)
				walls.add(wall)
			}
		}
	}

	for(i=0;i<10;i++){
		spawnEnemy(50, 50, 1)
	}

}

function draw(){
	background(220)

	model.playerVelX *= 0.9
	model.playerVelY *= 0.9
	
	player.velocity.x = model.playerVelX
	player.velocity.y = model.playerVelY


	if(keyDown('d') == true){
      model.playerVelX += 1;
    }

    if(keyDown('a')){
       model.playerVelX -= 1;
    }

   	if(keyDown('w') == true){
      model.playerVelY -= 1;
    }

    if(keyDown('s')){
       model.playerVelY += 1;
    }

    if(model.playerVelX > maxVel){
    	model.playerVelX = maxVel
    }

     if(model.playerVelY > maxVel){
    	model.playerVelY = maxVel
    }

    if(model.playerVelX < -maxVel){
    	model.playerVelX = -maxVel
    }

     if(model.playerVelY < -maxVel){
    	model.playerVelY = -maxVel
    }

    for(i=0;i<enemies.length;i++){
   		if(enemies[i].velocity.x > enemyMaxVel){
    		enemies[i].velocity.x = enemyMaxVel
    	}

    	if(enemies[i].velocity.y > enemyMaxVel){
    		enemies[i].velocity.y = enemyMaxVel
    	}

    	if(enemies[i].velocity.x < -enemyMaxVel){
    		enemies[i].velocity.x = -enemyMaxVel
    	}

    	if(enemies[i].velocity.y < -enemyMaxVel){
    		enemies[i].velocity.y = -enemyMaxVel
    	}
    }  

    collision(player)


    for(j=0;j<enemies.length;j++){
    	applyForce(enemies[j], seek(player.position, enemies[j].position, enemies[j].velocity))
    	for(x=0;x<enemies.length;x++){
    		enemies[j].bounce(enemies[x])
    	}
    	collision(enemies[j])
	}

	drawSprites()
}


function collision(sprite){
	for(i=0;i<walls.length;i++){
		if(sprite.collide(walls[i])){
			if(sprite.position.y <= walls[i].position.y - walls[i].height/2 && keyDown('w') == false){
				sprite.velocity.y = 0
			} 
			if(sprite.position.y >= walls[i].position.y + walls[i].height/2 && keyDown('s') == false){
				sprite.velocity.y = 0
			} 
			if(sprite.position.x <= walls[i].position.x - walls[i].width/2 && keyDown('a') == false){
				sprite.velocity.x = 0
			} 

			if(sprite.position.x >= walls[i].position.x + walls[i].width/2 && keyDown('d') == false){
				sprite.velocity.x = 0
			} 
		}

	}
}

function spawnEnemy(posX, posY, type){
	enemy = createSprite(posX, posY, 20, 20)
	enemies.add(enemy)
}

 function seek(target, seekerPos, seekerVel){
  	targetDir = p5.Vector.sub(target, seekerPos);
    steeringForce = p5.Vector.sub(targetDir, seekerVel).normalize();
    return steeringForce;
  }

  function applyForce(sprite, steeringForce){
  	sprite.velocity.x += steeringForce.x
  	sprite.velocity.y += steeringForce.y
  }